import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { pmenu as pmenuApi, smenu as smenuApi } from "../../../api/index";
import usePaginatedTable from "../../../Hooks/usePagination";
import axios from "axios";
import Swal from "sweetalert2";
import { menu } from "../../../api";
import $ from "jquery";
import "datatables.net";
// 🔹 Action Dropdown
const ActionDropdown = ({ row, onEdit, onDelete, apiUrl }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="position-relative dropdown-action">
      <button
        type="button"
        className="btn btn-sm btn-primary show_hide"
        style={{ padding: "2px 4px" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        Action
      </button>

      {open && (
        <ul
          className="dropdown-menu show"
          style={{
            display: "block",
            position: "absolute",
            right: 0,
            marginTop: 4,
            zIndex: 9999,
            minWidth: 120,
          }}
        >
          <li>
            <button
              type="button"
              className="text-success dropdown-item d-flex align-items-center"
              onClick={() => {
                setOpen(false);
                onEdit(row, apiUrl);
              }}
            >
              <FaEdit className="me-2" /> Edit
            </button>
          </li>

          <li>
            <button
              type="button"
              className="text-danger dropdown-item d-flex align-items-center"
              onClick={() => {
                setOpen(false);
                onDelete(row);
              }}
            >
              <FaTrashAlt className="me-2" /> Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
const MenuTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [Edit, setEdit] = useState(false);
  const[Row,setRow]=useState([])
  const [filters, setFilters] = useState({});

  // 🔹 Columns mapping for your custom hook
  const columnSets = {
    primaryMenu: {
      Id: "id",
      "Menu Name": "name",
      "Menu Link": "link",
      "Added By": "added_by",
      "Added On": "dated",
      "Menu Order": "ord",
    },
    secondaryMenu: {
      Id: "id",
      "Menu Name": "name",
      "Primary Menu": "primary_menu",
      "Menu Link": "link",
      "Added By": "added_by",
      "Added On": "dated",
      "Menu Order": "ord",
    },
  };
const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };
const activeTab = getActiveTabFromUrl();

  const apiUrl = getActiveTabFromUrl() === "1" ? pmenuApi : smenuApi;
const menuData = usePaginatedTable({
  apiUrl: activeTab === "1" ? pmenuApi : smenuApi,
  columnsMap:
    activeTab === "1"
      ? columnSets.primaryMenu
      : columnSets.secondaryMenu,
});
useEffect(() => {

  if (!menuData?.data || menuData.data.length === 0) return;

  const tableId =
    activeTab === "1"
      ? "#primaryMenuTable"
      : "#secondaryMenuTable";

  const timer = setTimeout(() => {

    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy(true);
    }

    $(tableId).DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      destroy: true
    });

  }, 100);

  return () => {
    clearTimeout(timer);

    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy(true);
    }
  };

}, [menuData.data, activeTab]);
  // 🔹 DELETE
  const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${menu}/${row["Id"]}`)
          .then(() => {
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
           menuData.fetchData();
          })
          .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
      }
    });
  };

  // 🔹 EDIT
  const handleEdit = async (row) => {
    console.log(row,"row")
    setRow(row)
    try {
      const response = await axios.put(`${menu}/${row.Id}`);
      setSelectedRow(response.data);
      setEdit(true);
    } catch (error) {
      console.error("Error fetching full row data", error);
    }
  };
const handleSearch = (field, value) => {
  setFilters((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  // 🔹 Generate columns
  const getTableColumns = (apiUrl, includePrimary = false) => {
    const cols = [
      {   name: (
          <div>
            <div className="fw-bold text-start">ID</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch("Id", e.target.value)}

            />
          </div>
        ), selector: (row) => row.Id, sortable: true },
      {   name: (
          <div>
            <div className="fw-bold text-start">Menu Name</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
             onChange={(e) => handleSearch("Menu Name", e.target.value)}
            />
          </div>
        ),  selector: (row) => row["Menu Name"], sortable: true },
      {  name: (
          <div>
            <div className="fw-bold text-start">Menu Link</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleSearch("Menu Link", e.target.value)}
            />
          </div>
        ), selector: (row) => row["Menu Link"], sortable: true },
      {  name: (
          <div>
            <div className="fw-bold text-start">Added By</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch("Added By", e.target.value)}

            />
          </div>
        ), selector: (row) => row["Added By"], sortable: true },
      { name: (
          <div>
            <div className="fw-bold text-start">Added On</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch("Added On", e.target.value)}

            />
          </div>
        ),  selector: (row) => row["Added On"], sortable: true },
      { name: (
          <div>
            <div className="fw-bold text-start">Menu Order</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch("Menu Order", e.target.value)}

            />
          </div>
        ),
        selector: (row) => row["Menu Order"],
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <ActionDropdown
            row={row}
            onEdit={handleEdit}
            onDelete={handleDelete}
            apiUrl={apiUrl}
          />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    if (includePrimary) {
      cols.splice(2, 0, {
        name: (
          <div>
            <div className="fw-bold text-start">Primary Menu</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleSearch("Primary Menu", e.target.value)}

            />
          </div>
        ),
        selector: (row) => row["Primary Menu"],
        sortable: true,
      });
    }

    return cols;
  };

  // 🔹 Tabs
  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
       <table id="primaryMenuTable" className="display">
  <thead>
    <tr>
      <th>ID</th>
      <th>Menu Name</th>
      <th>Menu Link</th>
      <th>Added By</th>
      <th>Added On</th>
      <th>Menu Order</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {activeTab === "1" && menuData?.data?.map((row, index) => (
      <tr key={index}>
        <td>{row.Id}</td>
        <td>{row["Menu Name"]}</td>
        <td>{row["Menu Link"]}</td>
        <td>{row["Added By"]}</td>
        <td>{row["Added On"]}</td>
        <td>{row["Menu Order"]}</td>
        <td>
         <ActionDropdown
  row={row}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      ),
    },
    {
      id: "2",
      label: "Secondary Menu",
      component: (
      <table id="secondaryMenuTable" className="display">
  <thead>
    <tr>
      <th>ID</th>
      <th>Menu Name</th>
      <th>Primary Menu</th>
      <th>Menu Link</th>
      <th>Added By</th>
      <th>Added On</th>
      <th>Menu Order</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {activeTab === "2" &&
  menuData.data?.map((row, index) => (
      <tr key={index}>
        <td>{row.Id}</td>
        <td>{row["Menu Name"]}</td>
        <td>{row["Primary Menu"]}</td>
        <td>{row["Menu Link"]}</td>
        <td>{row["Added By"]}</td>
        <td>{row["Added On"]}</td>
        <td>{row["Menu Order"]}</td>
        <td>
       <ActionDropdown
  row={row}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      ),
    },
  ];

return {
  tabs: tabContent,
  selectedRow,
  menuData,
  Edit,
  Row,
  setEdit
};};

export default MenuTable;
