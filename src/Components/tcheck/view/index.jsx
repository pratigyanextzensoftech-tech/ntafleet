import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import View from './View';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'; 
import qs from 'qs'
import axios from 'axios';
import Swal from 'sweetalert2';
import { tcheck_invoice } from '../../../api';
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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );


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

  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: tcheck_invoice, columnsMap });

 useEffect(() => {
       if (data?.length) {
         const normalized = data.map((item) => ({
           ...item,
           id: item["Invoice #"], 
          
         }));
     
         setData(normalized);
       }
     }, [data]);

  // ✅ Build column definitions for DataTable
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    // Add Status column
    cols.push({
      name: "Status",
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

          onChange={(e) => handleChange(row.id, "status", e.target.value)}
        >
          <option value="Active">Open</option>
          <option value="Blocked">Entered</option>
          <option value="Blocked">Close</option>

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
            onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
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
                minWidth: 180,
                padding: "5px 0",
              }}
            >
              {/* Download */}
              <Link
                to={`/manage_user/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaDownload /> Download
              </Link>

              {/* View */}
              <button
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleView(row)}
              >
                <FaEye /> View
              </button>

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

  // ✅ Action handlers
  const handleEdit = (row) => alert("Edit " + row.id);
  const handleLogin = (row) => alert("Login " + row.id);

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
        axios.delete(`${tcheck_invoice}/${row.id}`)
          .then((res) => {
            setData((prevData) => {
  prevData.forEach((item) => console.log("Existing item id:", item.id)); // ✅ print each item id
  return  prevData.filter((item) => item.id !== row.id);
});
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
  const handleEmail = (row) => alert("Delete " + row.id);
  const handleRegenerateInvoice = (row) => alert("Delete " + row.id);
  const handleView = (row) => alert("Delete " + row.id);





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
        <DataTableComponent title="T Check Invoice List  " tableColumns={tableColumns} tableData={data} loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} />
      </Container>
    </Fragment>
  );
};

export default Index;