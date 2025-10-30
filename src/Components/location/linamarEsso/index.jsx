import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container,Card,Col,Row,CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import LinamarForm from './LinamarForm';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import usePaginatedTable from '../../../Hooks/usePagination';
import qs from 'qs'
import { linamar_esso_loc as APINAME } from '../../../api';
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const Index = () => {
     const [openRowId, setOpenRowId] = useState(null);
     const [tableColumns, setTableColumns] = useState([]);
    const columnsMap = {
    "ID": "id",
    "Esso Location": "esso_location",
    "Flying J Location": "fj_location",
    "Flying J Site ID": "site_id",
    "Flying J Location ID": "loc_id",
  };
   
     const {
       data,
       totalRows,
       loading,
       handlePageChange,
       handlePerRowsChange,
       handleSearch, // ✅ Added
       setData,
     } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
     useEffect(() => {
       const cols = Object.keys(columnsMap).map((key) => ({
         name: key,
         selector: (row) => row[key],
         sortable: true,
         wrap: true,
       }));
   
       cols.push({
         name: "Action",
         cell: (row) => (
           <div className="position-relative dropdown-action">
             <button
               className="btn btn-sm btn-primary px-2"
               onClick={() => setOpenRowId(openRowId === row["ID"] ? null : row["ID"])}
             >
               Action
             </button>
   
             {openRowId === row["ID"]&& (
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
               
                 <button
                   className="dropdown-item d-flex align-items-center text-primary"
                   style={{ padding: "8px 12px", gap: "8px" }}
   
                 >
                   <FaEnvelope /> Edit
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
           axios.delete(`${APINAME}/${row["ID"]}`)
             .then(() => {
               setData((prevData) => prevData.filter((item) => item["ID"] !== row["ID"]));
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
      <Breadcrumbs parent='Location' title='Manage Linamar Esso Location' />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Linamar Esso Location " />
              <CardBody>
                <LinamarForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Linamar Esso Location List"
          tableColumns={tableColumns}
          tableData={data}
          progressPending={loading}
          pagination
          paginationServer
          loading={loading}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />

      </Container>
    </Fragment>
  );
};

export default Index;
