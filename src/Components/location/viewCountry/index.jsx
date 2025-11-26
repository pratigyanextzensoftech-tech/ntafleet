import React, {Fragment,useEffect,useState} from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import CountryForm from './CountryForm';
import Swal from 'sweetalert2';
//Table
import DataTableComponent from '../../Tables/DataTable/DataTableComponent'; 
import HeaderCard from '../../Common/Component/HeaderCard';
import qs from 'qs'
import axios from 'axios';
import { country as APINAME } from '../../../api';

import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import usePaginatedTable from '../../../Hooks/usePagination';  
//end Table

const Index = () => {
    
    const [tableColumns, setTableColumns] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);
     const [selectedRow, setSelectedRow] = useState(null);
         const[Edit,setEdit]=useState(false)
  
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
      "Country ID": "country_id",
      "Country Name": "country_name",
    };
  
    const {
      data,
      totalRows,
      loading,
      handlePageChange,
      handlePerRowsChange,
      handleSearch, // ✅ Added
      setData,
      fetchData,
    } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
  
  
  
    // ✅ Build column definitions for DataTable
    useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
      }));
  
      // Add Status column
    
  
      // ✅ Add Actions column at the end
      cols.push({
        name: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() => setOpenRowId(openRowId === row["Country ID"] ? null : row["Country ID"])}
            >
              Action
            </button>
  
            {openRowId === row[["Country ID"]] && (
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
               
  
                {/* Edit */}
                <button
                  className="dropdown-item d-flex align-items-center text-success"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleEdit(row)}
                >
                  <FaEye /> Edit
                </button> 
                {/* Delete */}
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
     const refreshTable = () => {
    fetchData(); // fetch latest data
  };
 
    const handleEdit = (row) => {
console.log(row)
    setEdit(true)
    setSelectedRow(row); 
    }; 
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
           axios.delete(`${APINAME}/${row["Country ID"]}`)
             .then(() => {
               setData((prevData) => prevData.filter((item) => item[["Country ID"]] !== row[["Country ID"]]));
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
      <Breadcrumbs parent='Location' title='Manage Country' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Country" />
              <CardBody>
                <CountryForm  onDataAdded={refreshTable} Edit={Edit}
  selectedRow={selectedRow}
  setEdit={setEdit}/>
              </CardBody>
            </Card>
          </Col>
        </Row> 
         <DataTableComponent title="Country List" tableColumns={tableColumns} tableData={data} loading={loading}
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