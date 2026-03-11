import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { pmenu as pmenuApi, smenu as smenuApi } from "../../../api/index";
import usePaginatedTable from "../../../Hooks/usePagination";
import axios from "axios";
import Swal from "sweetalert2";
import { menu } from "../../../api";
import $ from "jquery";
import "datatables.net";
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
const useMenuTable = () => {
    const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());
  const [Edit, setEdit] = useState(false);
  const[Row,setRow]=useState([])
  
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
const apiUrl = activeTab === "1" ? pmenuApi : smenuApi;

const menuData = usePaginatedTable({
  apiUrl,
  columnsMap:
    activeTab === "1"
      ? columnSets.primaryMenu
      : columnSets.secondaryMenu,
});
useEffect(() => {
  const tableId =
    activeTab === "1" ? "#primaryMenuTable" : "#secondaryMenuTable";

  const initTable = () => {
    const table = $(tableId);

    if ($.fn.DataTable.isDataTable(tableId)) {
      table.DataTable().clear().destroy();
    }

    table.DataTable({
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      processing: true,
      autoWidth: false,
      destroy: true
    });
  };

  const timer = setTimeout(() => {
    if (menuData?.data?.length) {
      initTable();
    }
  }, 100);

  return () => clearTimeout(timer);

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


  // 🔹 Tabs
  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
       <table id="primaryMenuTable" className="display" style={{ width: "100%" }}>
  <thead>
    <tr >
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
      <tr key={row.Id}>
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
      <table id="secondaryMenuTable" className="display" style={{ width: "100%" }}>
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
      <tr key={row.Id}>
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
}
};

export default useMenuTable;
