import React, { Fragment, useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import DownloadEssoCentForm from "./DownloadEssoCentForm";
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { esso_cent as APINAME } from "../../../api";
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
    "Company Name": "company_name",
    "Pricing Date": "pricing_date",
    "Alberta": "state_name",
        "ManiToba": "abbreviation",
    "NOVA SCOTIA ": "country_name",
    "ONTARIO ": "country_name",
    "QUEBEC ": "country_name",
    "SASKATCHEWAN ": "country_name",
    "VANCOUVER RACK ": "country_name",
    "NANAIMO ": "country_name",
    "PRINCE GEROGE RACK ": "country_name",
    "KAMLOOPS RACK ": "country_name",
    "BAINSVILLE  ": "country_name",
    "BELMONT  ": "country_name",
    "CARDINAL  ": "country_name",
    "COCHRANE  ": "country_name",
    "CORNWALL  ": "country_name",
    "DRYDEN  ": "country_name",
    "DUNVEGAN  ": "country_name",
    "FORT FRANCES  ": "country_name",
    "HAWKESBURY  ": "country_name",
  
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
      <Breadcrumbs parent="Pricing" title="Download ESSO Cent" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Download ESSO Cent" />
              <CardBody>
                <DownloadEssoCentForm btnTitle="Search" />
              </CardBody>
            </Card>
          </Col> 
        </Row> 
        <DataTableComponent
          title="ESSO Cent List  "
          tableColumns={tableColumns}
          tableData={data}
          progressPending={loading}
          pagination
                    loading={loading}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}/>
      
      </Container>
    </Fragment>
  );
};

export default Index;
