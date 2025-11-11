import React, { useState, useRef, useEffect } from "react";
import { FaEdit, FaSignInAlt, FaTrashAlt } from "react-icons/fa";
import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import { pmenu as pmenuApi, smenu } from "../../api";
import usePaginatedTable from "../../Hooks/usePagination";

// 🔹 Action Dropdown with your original design
const ActionDropdown = ({ row, onEdit, onLogin }) => {
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
      {/* 🔸 Action Button */}
      <button
        type="button"
        className="btn btn-sm btn-primary show_hide"
        style={{ padding: "2px 4px" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        Action
      </button>

      {/* 🔸 Dropdown Menu */}
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <li>
            <button
              type="button"
              className="text-success dropdown-item d-flex align-items-center"
              onClick={() => {
                setOpen(false);
                onEdit(row);
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
                onLogin(row);
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
  // 🔹 API column mapping for your custom hook
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

  // 🔹 Fetch data via usePaginatedTable custom hook
  const pmenu = usePaginatedTable({
    apiUrl: pmenuApi,
    columnsMap: columnSets.primaryMenu,
  });

  const sMenu = usePaginatedTable({
    apiUrl: smenu,
    columnsMap: columnSets.secondaryMenu,
  });

  // 🔹 Actions
  const handleEdit = (row) => console.log("Edit:", row);
  const handleLogin = (row) => console.log("Login:", row);

  // 🔹 Generate reusable columns with Action
  const getTableColumns = (includePrimary = false) => {
    const baseCols = [
      { name: "ID", selector: (row) => row.Id, sortable: true },
      { name: "Menu Name", selector: (row) => row["Menu Name"], sortable: true },
      { name: "Menu Link", selector: (row) => row["Menu Link"], sortable: true },
      { name: "Added By", selector: (row) => row["Added By"], sortable: true },
      { name: "Added On", selector: (row) => row["Added On"], sortable: true },
      { name: "Menu Order", selector: (row) => row["Menu Order"], sortable: true },
      {
        name: "Action",
        cell: (row) => (
          <ActionDropdown row={row} onEdit={handleEdit} onLogin={handleLogin} />
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    if (includePrimary) {
      baseCols.splice(2, 0, {
        name: "Primary Menu",
        selector: (row) => row["Primary Menu"],
        sortable: true,
      });
    }

    return baseCols;
  };

  // 🔹 Tab content for both tables
  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
        <DataTableComponent
          tableColumns={getTableColumns(false)}
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
          tableColumns={getTableColumns(true)}
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

  return tabContent;
};

export default ManageMenuTable;
