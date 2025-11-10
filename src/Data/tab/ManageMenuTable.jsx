import React, { useState } from "react";
import { FaEdit, FaSignInAlt } from "react-icons/fa";
import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import { pmenu as pmenuApi, smenu } from "../../api";
import usePaginatedTable from "../../Hooks/usePagination";

const ActionDropdown = ({ row, onEdit, onLogin }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="position-relative dropdown-action">
      <button className="btn btn-sm btn-primary px-2" onClick={() => setOpen(!open)}>
        Action
      </button>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow"
          style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 150 }}
        >
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() => onEdit(row)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() => onLogin(row)}
          >
            <FaSignInAlt /> Login
          </button>
        </div>
      )}
    </div>
  );
};

const ManageMenuTable = () => {
  const columnSets = {
    Id: "id",
    "Menu Name": "name",
    "Menu Link": "link",
    "Added By": "idby",
    "Added On": "dated",
    "Menu Order": "ord",
  };

  const pmenu = usePaginatedTable({
    apiUrl: pmenuApi,
    columnsMap: columnSets,
  });

  const sMenu = usePaginatedTable({
    apiUrl: smenu,
    columnsMap: columnSets,
  });

  const handleEdit = (row) => console.log("Edit:", row);
  const handleLogin = (row) => console.log("Login:", row);

  const tableColumns = [
    { name: "ID", selector: (row) => row.Id, sortable: true },
    { name: "Menu Name", selector: (row) => row["Menu Name"], sortable: true },
    { name: "Menu Link", selector: (row) => row["Menu Link"], sortable: true },
    { name: "Added By", selector: (row) => row["Added By"], sortable: true },
    { name: "Added On", selector: (row) => row["Added On"], sortable: true },
    { name: "Menu Order", selector: (row) => row["Menu Order"], sortable: true },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} onEdit={handleEdit} onLogin={handleLogin} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
        <DataTableComponent
          tableColumns={tableColumns}
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
          tableColumns={tableColumns}
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
