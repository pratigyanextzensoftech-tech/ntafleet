import React, { Fragment,useEffect,useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import ViewCityForm from './ViewCityForm';
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { city as APINAME } from "../../../api";
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from "../../../Hooks/usePagination";
const Index = () => {
    const [openRowId, setOpenRowId] = useState(null);
     const [tableColumns, setTableColumns] = useState([]);
    const columnsMap = {
    "City ID": "city_id",
    "City Name": "city_name",
    "State": "state_name",
        "Abbreviation": "abbreviation",

    "Country": "country_name",
  
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
               onClick={() => setOpenRowId(openRowId === row["City ID"] ? null : row["City ID"])}
             >
               Action
             </button>
   
             {openRowId === row["City ID"]&& (
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
      onClick={() => handleEdit(row)}
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
     useEffect(() => {
    if (data?.length) {
      const normalized = data.map((item) => ({
        ...item,
        id: item["City ID"], 
       
      }));
  
      setData(normalized);
    }
  }, [data]);
   const handleEdit=(row)=>{
    console.log(row)
   }
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
           axios.delete(`${APINAME}/${row.id}`)
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
      <Breadcrumbs parent='Location' title='Manage City' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add City" />
              <CardBody>
                <ViewCityForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent title="City List " tableColumns={tableColumns} tableData={data} />
      </Container>
    </Fragment>
  );
};

export default Index;