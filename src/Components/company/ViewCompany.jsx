import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { Container } from "reactstrap";
import { company } from "../../api";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { Navigate, useNavigate } from "react-router";
import { use } from "react";

const ViewCompany = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);

  // ✅ Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  const edit=useNavigate();

  // ✅ Build column definitions
  useEffect(() => {
    const columns = [
      { key: "id", label: "Sr.No." },
      { key: "companyName", label: "Company Name" },
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "address", label: "Address" },
      { key: "suspicious", label: "Suspicious Company" },
      { key: "lastLogin", label: "Last Login" },
      { key: "loginBefore", label: "Login Before" },
      { key: "latitude", label: "Latitude" },
      { key: "Status", label: "Status" },
      {
        key: "Action",
        label: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() =>
                setOpenRowId(openRowId === row.id ? null : row.id)
              }
            >
              Action
            </button>

            {openRowId === row.id && (
              <div
                className="position-absolute bg-white border rounded shadow"
                style={{
                  zIndex: 1000,
                  right: 0,
                  marginTop: 5,
                  minWidth: 150,
                  padding: "5px 0",
                }}
              >
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleEdit(row)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleLogin(row)}
                >
                  <FaSignInAlt /> Login
                </button>
                <button
                  className="dropdown-item d-flex align-items-center text-danger"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleDelete(row)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            )}
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ].map((col) => ({
      name: col.label,
      selector: (row) => row[col.key],
      sortable: true,
      wrap: true,
      cell: col.cell,
      ignoreRowClick: col.ignoreRowClick,
      allowOverflow: col.allowOverflow,
      button: col.button,
    }));

    setTableColumns(columns);
  }, [openRowId]);

  // ✅ Fetch paginated data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;

      const params = { draw, start, length };

      const res = await axios.get(company, { params });
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const filteredData = responseData.map((item) => ({
        id: item.company_id,
        companyName: item.company_name,
        firstName: item.first_name,
        lastName: item.last_name,
        address: item.address,
        suspicious: item.susp_comp,
        lastLogin: item.last_login,
        loginBefore: "",
        latitude: item.lat,
        longitude: item.lang,
        Status: item.company_status,
      }));

      setCompanyData(filteredData);
      setTotalRows(res.data.recordsTotal || res.data.total || 0);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching company data", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // ✅ Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  // ✅ Handle rows per page change
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  // ✅ Action handlers
  const handleEdit = (row) => {edit("/edit_company")};
  const handleLogin = (row) => console.log("Login:", row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete "${row.companyName}"?`)) {
      setCompanyData(companyData.filter((item) => item.id !== row.id));
      setOpenRowId(null);
    }
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Company List" />
      <Container fluid> 
        <DataTableComponent
          title="Company List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={companyData}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  );
};

export default ViewCompany;
