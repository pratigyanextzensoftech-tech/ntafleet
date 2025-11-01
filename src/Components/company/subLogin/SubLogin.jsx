import React, { Fragment,useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import SubLoginForm from "./SubLoginForm";
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { sub_company as APINAME } from "../../../api";
import {
 FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from '../../../Hooks/usePagination';
const SubLOgin = () => {
   const [openRowId, setOpenRowId] = useState(null);
           const [tableColumns, setTableColumns] = useState([]);
          const columnsMap = {
        "Id #": "id",
          "Company": "company_id",
          "Name": "name",
          "Email": "email",
          "OTP Email": "otp_email",
          "Discount_Sheet_Menu": "card_discount",
          "Added_By": "added_by",
          "Added_On": "added_on",
        
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
             const cols = Object.keys(columnsMap).filter((key) => key !== "Id").map((key) => ({
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
                         minWidth: 160,
                         padding: "5px 0",
                       }}
                     >
                    
         
                    
         
                       <button
                         className="dropdown-item d-flex align-items-center text-primary"
                         style={{ padding: "8px 12px", gap: "8px" }}
                       >
                         <FaEdit /> Edit
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
              id: item["Id #"], 
             
            }));
        
            setData(normalized);
          }
        }, [data]);
         const handleEdit=(row)=>{
          console.log(row)
         }
           const handleDelete = (row) => {
            console.log(row)
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
      <Breadcrumbs parent="Company" title="Manage SubLogin" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sub-Login" />
              <CardBody>
                <SubLoginForm btnTtitle="Add Sub Login " />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Sub-Login List  "
           tableColumns={tableColumns} tableData={data}
          progressPending={loading}
          pagination
           loading={loading}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  );
};

export default SubLOgin;
