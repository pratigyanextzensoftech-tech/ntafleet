import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { Container } from "reactstrap";
import { company } from "../../api";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ViewCompany = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  const edit=useNavigate();
  const filteredData = companyData.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
);

const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  useEffect(() => {
    const columns = [
      { key: "company_id", label: "Sr.No.", width: "100px" },
    { key: "companyName", label: "Company Name", width: "280px" },
    { key: "firstName", label: "First Name", width: "150px" },
    { key: "lastName", label: "Last Name", width: "130px" },
    { key: "address", label: "Address", width: "250px" },
    { key: "suspicious", label: "Suspicious Company", width: "200px" },
    { key: "lastLogin", label: "Last Login", width: "170px" },
    { key: "loginBefore", label: "Login Before", width: "170px" },
    { key: "latitude", label: "Latitude", width: "120px" },
    { key: "Status", label: "Status", width: "120px" },
      {
        key: "Action",
        label: "Action",
         searchable: false,
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() =>
                setOpenRowId(openRowId === row.company_id ? null : row.company_id)
              }
            >
              Action
            </button>
            {openRowId === row.company_id && (
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
              <Link to={`/edit_company/${btoa(row.company_id)}`} className="dropdown-item d-flex align-items-center text-success" style={{ padding: "8px 12px", gap: "8px" }}
>
                  <FaEdit /> Edit
             </Link>
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
     name: (
    <div style={{ width: col.width }}>
      <div className="d-flex align-items-end justify-content-start" style={{height:"40px"}}>{col.label}</div>
       {col.searchable !== false && (
      <input
       type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              height: "28px",
              border:"none",
              borderRadius:"5px",
              boxSizing: "border-box"
            }}
              onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) =>
          handleFilterChange(col.key, e.target.value)
        }
      />
       )}
    </div>
  ),
      selector: (row) => row[col.key],
      sortable: true,
      width:col.width,
      wrap: true,
      cell: col.cell,
      ignoreRowClick: col.ignoreRowClick,
      allowOverflow: col.allowOverflow,
      button: col.button,
    }));

    setTableColumns(columns);
  }, [openRowId,companyData]);

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
        company_id: item.company_id,
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
  const handleEdit = (row) => 
    {edit("/edit_company",{state:row})

    };
  // ✅ Action handlers 
  const handleLogin = (row) => console.log("Login:", row);
   const handleDelete = (row) => {
    console.log(row)
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete user "${row.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // ✅ Call API to delete
      axios.delete(`${company}/${row.company_id}`)
        .then((res) => {
          console.log(res);
          // ✅ Remove from state
          setCompanyData((prevData) => prevData.filter((item) => item.company_id !== row.company_id));

          // ✅ Success alert
          Swal.fire(
            'Deleted!',
            `User "${row.firstName} ${row.lastName}" has been deleted.`,
            'success'
          );
        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
    }
  });
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
          tableData={filteredData}
            downloadHeading="Download"
          download={true}
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
