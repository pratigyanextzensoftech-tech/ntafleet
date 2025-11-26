import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import { pmenu as pmenuApi, smenu as smenuApi } from "../../api";
import usePaginatedTable from "../../Hooks/usePagination";
import axios from "axios";
import Swal from "sweetalert2";
import { menu } from "../../api";
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

const ManageMenuTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [Edit, setEdit] = useState(false);

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

  // 🔹 Fetch data via custom hook
  const pmenu = usePaginatedTable({
    apiUrl: pmenuApi,
    columnsMap: columnSets.primaryMenu,
  });

  const sMenu = usePaginatedTable({
    apiUrl: smenuApi,
    columnsMap: columnSets.secondaryMenu,
  });

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
            pmenu.fetchData();
            sMenu.fetchData();
          })
          .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
      }
    });
  };

  // 🔹 EDIT
  const handleEdit = async (row) => {
    console.log(row,"row")
    try {
      const response = await axios.put(`${menu}/${row.Id}`);
      setSelectedRow(response.data);
      setEdit(true);
    } catch (error) {
      console.error("Error fetching full row data", error);
    }
  };

  // 🔹 Generate columns
  const getTableColumns = (apiUrl, includePrimary = false) => {
    const cols = [
      { name: "ID", selector: (row) => row.Id, sortable: true },
      { name: "Menu Name", selector: (row) => row["Menu Name"], sortable: true },
      { name: "Menu Link", selector: (row) => row["Menu Link"], sortable: true },
      { name: "Added By", selector: (row) => row["Added By"], sortable: true },
      { name: "Added On", selector: (row) => row["Added On"], sortable: true },
      {
        name: "Menu Order",
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
        name: "Primary Menu",
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
        <DataTableComponent
          tableColumns={getTableColumns(pmenuApi)}
          tableData={pmenu.data}
          loading={pmenu.loading}
          pagination
          paginationServer
          paginationTotalRows={pmenu.totalRows}
          onChangeRowsPerPage={pmenu.handlePerRowsChange}
          onChangePage={pmenu.handlePageChange}
        />
      ),
    },
    {
      id: "2",
      label: "Secondary Menu",
      component: (
        <DataTableComponent
          tableColumns={getTableColumns(smenuApi, true)}
          tableData={sMenu.data}
          loading={sMenu.loading}
          pagination
          paginationServer
          paginationTotalRows={sMenu.totalRows}
          onChangeRowsPerPage={sMenu.handlePerRowsChange}
          onChangePage={sMenu.handlePageChange}
        />
      ),
    },
  ];

return {
  tabs: tabContent,
  selectedRow,
  pmenu,
  sMenu,
  Edit,
  setEdit
};};

export default ManageMenuTable;
