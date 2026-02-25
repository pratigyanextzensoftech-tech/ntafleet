import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import { FaEdit, FaTrashAlt, FaSignInAlt,FaFileExcel,FaFileCsv } from "react-icons/fa";
import axios from "axios";
import { Container } from "reactstrap";
import { company } from "../../api";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { download } from "../../api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import $ from 'jquery'
const ViewCompany = () => {
  const [companyData, setCompanyData] = useState([]);
   const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const toggle = () => setDropdownOpen((prev) => !prev);

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
      { key: "company_id", label: "Sr.No." },
    { key: "companyName", label: "Company Name"},
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name"},
    { key: "address", label: "Address" },
    { key: "suspicious", label: "Suspicious Company"},
    { key: "lastLogin", label: "Last Login" },
    { key: "loginbefore", label: "Login Before" },
    { key: "latitude", label: "Latitude" },
    { key: "Status", label: "Status" },
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
        loginbefore:item.loginbefore,
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

      function handleDownload(type) {
  const ids = []; 
  let esso_ftp='';
  $('.chk input[type="checkbox"]:checked').each(function () {  ids.push($(this).val()); if($(this).val()==='100'){esso_ftp="Yes";} });
  
  if (ids.length === 0) {  alert('Please select at least one item');  return;}
   const IDSUP = ids.join(',');  
  const from = $('#from').val();
  const to = $('#to').val();
  const state_prov = $('input[name="state_prov"]').val();
  const unit = $('input[name="unit"]').val();
  const card_no = $('input[name="card_no"]').val();
  const company = $('input[name="company"]').val();
  const currency = $('input[name="currency"]').val();  
  const items = $('input[name="items"]').val();  
  const status = $('input[name="status"]').val();  
  const invoice_type = $('input[name="invoice_type"]').val(); 
  
  console.log(from,to,state_prov,unit,card_no,company,currency,items,status,invoice_type)
   window.open(`${download}?type=TRANSACTION&format=${type}&supplier_id=${IDSUP}&from=${from}&to=${to}&state_prov=${state_prov}&unit=${unit}&card_no=${card_no}&company_id=${company}&currency=${currency}&item=${items}&invoiced=${status}&invoice_type=${invoice_type}&esso_ftp=${esso_ftp}`, "_self");
  
  } 
  return (
    <Fragment>
      <Breadcrumbs parent="Invoice" title="Company List" />
      <Container fluid> 
        <DataTableComponent
          title="Company List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={filteredData}
          download={true}
          pagination
            renderDropdown={() => (
           <>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
             <DropdownToggle
               tag="span"
               className="px-2 text-white"
               style={{ cursor: "pointer" }}
             >
               <i className="fa fa-download me-1"></i> Download
             </DropdownToggle>
       
             <DropdownMenu   style={{ minWidth: 160 }}>
               
               <DropdownItem className="text-primary"   onClick={() => handleDownload("Excel")}>
                 <FaFileExcel/> Download Excel
               </DropdownItem>
       
               <DropdownItem className="text-danger"   onClick={() => handleDownload("CSV")}>
                 <FaFileCsv/> Download CSV
               </DropdownItem>
             </DropdownMenu>
           </Dropdown>
       
           </>
         )}
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
