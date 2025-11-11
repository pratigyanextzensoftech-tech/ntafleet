import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { supplier } from '../../../api/index';
import SupplierList from './SupplierList';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container , Row, Col, Card, CardBody  } from 'reactstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState({});
  const [openRowId, setOpenRowId] = useState(null);

  // Column mapping: display name => API field
  const columnsMap = {
    "Supplier ID": "id",
    "Supplier Name": "supplier_name",
  };

  // Fetch supplier data
  const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const params = { draw, start, length: perPage, ...filtersData };

      const response = await axios.get(supplier, { params });
      const apiData = Array.isArray(response.data.data) ? response.data.data : response.data;

      const tableData = apiData.map(row => {
        const newRow = {};
        Object.keys(columnsMap).forEach(col => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || Math.random(); // fallback ID
        return newRow;
      });

      setData(tableData);
      setTotalRows(apiData.length);
      setDraw(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage, filters);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };
const handleDataAdded = () => {
  fetchData(currentPage, perPage, filters);
};
  // Actions
  const handleEdit = (row) => console.log("Edit", row);
   const handleDelete = (e,row) => {
    console.log(row.id)
    console.log(data)
    e.preventDefault()
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
          axios.delete(`${supplier}/${row.id}`)
            .then((res) => {
        setData((prevData) => prevData.filter((item) => item.id !== row.id));

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Table Columns
  useEffect(() => {
    const cols = Object.keys(columnsMap).map(key => ({
      name: key,
      selector: row => row[key],
      sortable: true,
      wrap: true,
      style: { padding: '8px 12px', fontWeight: 500 },
    }));

    cols.push({
      name: "Actions",
      cell: row => (
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
              style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 120, padding: "5px 0" }}
            >
              <button
                className="dropdown-item d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEdit(row)}
              >
                <FaEdit /> Edit
              </button>

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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "160px",
    });

    setTableColumns(cols);
  }, [openRowId]);

  return (
    <>
      <Breadcrumbs parent='Supplier' title='Manage Supplier' />
      <Container fluid={true}>
        {/* <HeaderCard title="Add Supplier" />
        <div style={{ border: "1px solid #ccc", padding: "5px", borderRadius: "3px", marginBottom: "10px" }}>
          <div className="bg-primary p-2 my-3">
            <HeaderCard title="Add Supplier" />
          </div>
          <SupplierList btntitle="Add Supplier" btnTitle1="Reset" />
        </div>*/}
        <Row> 
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Supplier" />
              <CardBody>

                <SupplierList btntitle="Add Supplier" btnTitle1="Reset"  onDataAdded={handleDataAdded}/>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Supplier List"
          tableData={data}
          tableColumns={tableColumns}
          loading={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </>
  );
};

export default Index;
