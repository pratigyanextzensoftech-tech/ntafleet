import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import View from './View';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import { tcheck_invoice } from '../../../api';
import { downloadPdf } from '../../../Hooks/Dropdowns';
import {
  FaDownload,
  FaEye, 
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import usePaginatedTable from '../../../Hooks/usePagination';  

const Index = () => {

  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [filters, setFilters] = useState({});

   

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


const handleChange = async (id, field, value) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to update the status?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Update",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    // ✅ CALL PUT API
    await axios.put(`${tcheck_invoice}/${id}`, {
      [field]: value,
    });

    // ✅ UPDATE TABLE DATA AFTER SUCCESS
    setData((prevData) =>
      prevData.map((item) =>
        item["Invoice #"] === id
          ? { ...item, [field]: value }
          : item
      )
    );

    Swal.fire("Updated!", "Status updated successfully.", "success");
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to update status", "error");
  }
};

  // ✅ Column mapping between UI and API
  const columnsMap = {
    "Invoice #": "invoice_id",
    "Company": "company_name",
    "From Date": "from_date",
    "To Date": "to_date",
    "	Due Date": "due_date",
    "	Total Due": "total",
  };
const columnWidths = {
  "Invoice #": "120px",
  "Company": "450px",
  "From Date": "250px",   // increased
  "To Date": "250px",     // increased
  "Due Date": "60px",    // small
  "Total Due": "60px",   // small
};


  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: tcheck_invoice, columnsMap });
  
  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  const filteredData = data.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
); 
 

  // ✅ Build column definitions for DataTable
  useEffect(() => {
   const cols = Object.keys(columnsMap)
  .filter((key) => key !== "Id")
  .map((key) => {
    const colWidth = columnWidths[key]; 
    const colWidthPx = parseInt(colWidth, 10);

    return {
      name: (
        <div style={{ width: "100%" }}>
          <div className="d-flex align-items-end justify-content-start">
            {key}
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border:"none",
              borderRadius:"5px",
              boxSizing: "border-box"
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        </div>
      ),
      selector: (row) => {
       
        if(key==='From Date' || key==='To Date'){
          return row[key].split("T")[0]
        }
        return  row[key]
      },
      sortable: true,
      wrap: true,
      width: colWidth, // ✅ THIS sets the actual table column width
    };
  });

    // Add Status column
    cols.push({
       name: (
    <div style={{ width: "100%" }}>
      <div className="d-flex align-items-end justify-content-start">
        Status
      </div>
      <input
        type="text"
        className="mt-2"
        style={{
          width: "100%",
          border:"none",
          maxWidth: "120px",  // adjust width as needed
          height: "28px",
          boxSizing: "border-box",
          borderRadius: "5px"
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => handleFilterChange("Status", e.target.value)}
      />
    </div>
  ),
      cell: (row) => (
        <select
          className="form-select form-select-sm"

          value={
            row.status === "Open"
              ? "Open"
              : row.status === "Entered"
                ? "Entered"
                : "Close"
          }

          onChange={(e) => handleChange(row["Invoice #"], "status", e.target.value)}
        >
            <option value="Open">Open</option>
          <option value="Entered">Entered</option>
          <option value="Close">Close</option>

        </select>
      ),
      width: "140px",
    });

    // ✅ Add Actions column at the end
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["Invoice #"] ? null : row["Invoice #"])}
          >
            Action
          </button>

          {openRowId === row["Invoice #"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 180,
                padding: "5px 0",
              }}
            >
              {/* Download */}
            
  <a
  href="#"
  onClick={()=>downloadPdf(row.fulldata.download_link)}
  rel="noopener noreferrer"
  className="dropdown-item d-flex align-items-center text-primary"
  style={{ padding: "8px 12px", gap: "8px" }}
>
  <FaDownload /> Download
</a>
              {/* View */}
            
               <Link
                              to={`/viewInvoice/ViewPdf/${btoa(row.fulldata["Invoice #"])}`}
                              state={{ downloadLinkUrl: row.fulldata.download_link }}
                              className="dropdown-item d-flex align-items-center text-success"
                              style={{ padding: "8px 12px", gap: "8px" }}
                            >
                              <FaEye /> View 
                            </Link>

              {/* Email */}
              <button
                className="dropdown-item d-flex align-items-center text-info"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEmail(row)}
              >
                <FaEnvelope /> Email
              </button>

              {/* Re-generate Invoice */}
              <button
                className="dropdown-item d-flex align-items-center text-warning"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleRegenerateInvoice(row)}
              >
                <FaFileInvoice /> Re-generate Invoice
              </button>

              {/* Delete */}
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={(e) => handleDelete(e,row)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          )}

        </div>
      ),
    });

    setTableColumns(cols);
  }, [openRowId]);

  

 const handleDelete = (e,row) => {
  e.preventDefault()
            console.log(row)
            console.log(data)
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
      
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${tcheck_invoice}/${row["Invoice #"]}`)
          .then((res) => {
    setData((prevData) =>
            prevData.filter((item) => item["Invoice #"] !== row["Invoice #"])
          );
            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
              console.log(res.data)

          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
            console.log(error)
          });
      }
    });
  };  
  const handleEmail = (row) => alert("Delete " + row["Invoice #"]);
  const handleRegenerateInvoice = (row) => alert("Delete " + row["Invoice #"]);
  const handleView = (row) => alert("Delete " + row["Invoice #"]);

  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='T-Check Invoices List ' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <View btnTitle="search Data" onSearch={handleSearch} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent title="T Check Invoice List" tableColumns={tableColumns} tableData={filteredData} loading={loading}
          pagination
          paginationServer
             downloadHeading="Download"
          download={true}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} />
      </Container>
    </Fragment>
  );
};

export default Index;