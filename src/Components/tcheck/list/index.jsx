import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container,Row,Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import List from './List';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { invoice, tcheck } from '../../../api';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import usePaginatedTable from '../../../Hooks/usePagination'; // ✅ Correct import

const Index = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]); // ✅ Un-commented
    const [filters, setFilters] = useState({});

  const columnsMap = {
    "Id":"id",
    "CreateId": "card_no",
    "Company": "company_name",
    "Create Date": "create_date",
    "Express Code": "express_code",
    "Dollar_Amt": "dollar_amt",
    "Fees": "fees",
    "Generation_Type": "generation_type",
    "Payee": "payee",
    "Driver_ID": "driver_id",
    "Tractor#": "tractor",
    "Trip#": "trip",
    "Driver_CDL": "driver_cdl",
    "Trailer#": "trailer",
    "Memo": "memo",
  };

  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
  } = usePaginatedTable({ apiUrl: tcheck, columnsMap });
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
// useEffect(() => {
//        if (data?.length) {
//          const normalized = data.map((item) => ({
//            ...item,
//            id: item["Id"], 
          
//          }));
     
//          setData(normalized);
//        }
//      }, [data]);
  useEffect(() => {
    const cols = Object.keys(columnsMap).filter((key) => key !== "Id").map((key) => ({
      name: (
        <div>
          <div
            className="d-flex align-items-end justify-content-start"
            style={{ height: "40px" }}
          >
            {columnsMap[key]}
          </div>
          {/* ✅ show search only if searchable !== false */}
          {columnsMap[key].searchable !== false && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Search here"
              style={{ borderRadius: "5px" }}
               onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleFilterChange(key, e.target.value)
              }
            />
          )}
        </div>
      ),
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    cols.push({
      name: "Action",
      searchable: false,
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
                minWidth: 140,
                padding: "5px 0",
              }}
            >
              <Link
                to={`/tcheck_list/${btoa(row.id)}`}
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
              >
                <FaEdit /> Edit
              </Link>

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
        axios.delete(`${tcheck}/${row.id}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item.id !== row.id));
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
      <Breadcrumbs parent='Tcheck' title='T Check List ' />
      <Container fluid> 
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                 <List btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="T Check List"
          tableColumns={tableColumns}
          tableData={filteredData}
          loading={loading}
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

export default Index;
