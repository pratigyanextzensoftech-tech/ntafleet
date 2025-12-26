import React, { Fragment, useState, useEffect } from 'react'
import { Breadcrumbs } from '../../../AbstractElements'
import HeaderCard from '../../Common/Component/HeaderCard'
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'
import SalesmanVol from './SalesmanVol'
import { salesman_volume } from '../../../api';
import usePaginatedTable from '../../../Hooks/usePagination';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileExcel, FaEnvelope } from 'react-icons/fa';

const Index = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
    const [filters, setFilters] = useState({});
  
  const columnsMap = {
    "ID #": "id",
    "Salesman": "salesman_id",
    "Start Date": "date_from",
    "End Date": "date_to",
    "Country": "country",
    "Supplier": "supplier_id",
    "Total ltr": "total_ltr",
    "Total Gln": "total_gln",
  };

  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: salesman_volume, columnsMap });

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
  useEffect(() => {
    const cols = Object.keys(columnsMap)
  .filter((key) => key !== "Id")
  .map((key) => {
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
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }});

    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["ID #"] ? null : row["ID #"])}
          >
            Action
          </button>

          {openRowId === row["ID #"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 160,
                padding: "5px 0",
              }}
            >
              <Link
                to={`/download_pdf/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaFilePdf /> Download PDF
              </Link>

              <Link
                to={`/download_excel/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaFileExcel /> Download Excel
              </Link>

              <button
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }}

              >
                <FaEnvelope /> Send Email
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
    });

    setTableColumns(cols);
  }, [openRowId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (row) => {
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
        axios.delete(`${salesman_volume}/${row["ID #"]}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item["ID #"] !== row["ID #"]));
            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
          });
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumbs parent='Reports' title='Salesman Volume Report' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Salesman Report" />
              <CardBody>
                <SalesmanVol btnTitle="Create Volume Report" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Salesman Report List"
          tableColumns={tableColumns}
          tableData={filteredData}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  )
}

export default Index
