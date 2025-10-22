import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaSignInAlt } from "react-icons/fa";
import DataTableComponent from "../../Components/Tables/DataTable/DataTableComponent";
import axios from "axios";
import { pmenu as pmenuApi } from "../../api";

// 🔹 Action Dropdown (Edit + Login, closes on outside click)
const ActionDropdown = ({ row, onEdit, onLogin }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggle = () => setOpen(!open);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="position-relative dropdown-action">
      <button className="btn btn-sm btn-primary px-2" onClick={toggle}>
        Action
      </button>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow"
          style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 150, padding: "5px 0" }}
        >
          <button
            className="dropdown-item d-flex align-items-center"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={() => onEdit(row)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="dropdown-item d-flex align-items-center"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={() => onLogin(row)}
          >
            <FaSignInAlt /> Login
          </button>
        </div>
      )}
    </div>
  );
};

// 🔹 Table Columns
const tableColumns = (handleEdit, handleLogin) => [
  { name: "ID", selector: (row) => row.id, sortable: true, width: "80px" },
  { name: "Menu Name", selector: (row) => row.name, sortable: true },
  { name: "Menu Link", selector: (row) => row.link, sortable: true },
  { name: "Added By", selector: (row) => row.idby, sortable: true },
  { name: "Added On", selector: (row) => row.dated, sortable: true },
  { name: "Menu Order", selector: (row) => row.ord, sortable: true, width: "120px" },
  {
    name: "Action",
    cell: (row) => <ActionDropdown row={row} onEdit={handleEdit} onLogin={handleLogin} />,
    center: true,
    width: "150px",
  },
];

const ManageMenuTable = () => {
  const [pmenuData, setPmenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // ✅ Fetch API with server-side pagination
  const fetchMenuData = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit };
      const res = await axios.get(pmenuApi, { params });

      const data = Array.isArray(res.data.data) ? res.data.data : res.data;

      const mappedData = data.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
        link: item.link,
        idby: item.idby,
        dated: item.dated,
        ord: item.ord,
        menu_type: item.menu_type || "primary",
      }));

      setPmenuData(mappedData);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // ✅ Action handlers
  const handleEdit = (row) => console.log("Edit:", row);
  const handleLogin = (row) => console.log("Login:", row);

  const primaryMenu = pmenuData.filter((item) => item.menu_type === "primary");
  const secondaryMenu = pmenuData.filter((item) => item.menu_type === "secondary");

  const tabContent = [
    {
      id: "1",
      label: "Primary Menu",
      component: (
        <DataTableComponent
          tableColumns={tableColumns(handleEdit, handleLogin)}
          tableData={primaryMenu}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      ),
    },
    {
      id: "2",
      label: "Secondary Menu",
      component: (
        <DataTableComponent
          tableColumns={tableColumns(handleEdit, handleLogin)}
          tableData={secondaryMenu}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      ),
    },
  ];

  return tabContent;
};

export default ManageMenuTable;
