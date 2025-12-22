import React, { Fragment,useState,useEffect } from 'react';
import { Breadcrumbs } from '../../AbstractElements';
import { Container, Row, Col,Card,CardBody } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';
import BasicTabCard from '../UiKits/Tabs/BoostrapTabs/BasicTabCard';
import { ManageMacroTab } from '../../Data/tab/ManageMacroTab';
import DataTableComponent from '../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../Data/Table/Defaultdata';
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { macro_trans as APINAME } from "../../api";
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from '../../Hooks/usePagination';
const ManageMacro = () => {
     const [openRowId, setOpenRowId] = useState(null);
       const [tableColumns, setTableColumns] = useState([]);
      const columnsMap = {
      "Card #": "cardNumber",
      "Date": "tran_date",
      "Time": "tran_time",
          "Invoice": "invoice",
  
      "Unit": "Unit",
      "Driver_Name": "country_name",
      "City": "city",
      "State_Prov": "state_prov",
      "Fees": "fees",
      "Item": "item",
      "Unit_Price": "unit_price",
      "Qty": "qty",
      "Amt": "amt",
      "Currency": "currency",
    
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
      <Breadcrumbs parent='Manage Macro' title='Upload US Transaction' />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Upload US Transaction" />
              <CardBody>
                <BasicTabCard tabContent={ManageMacroTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent title="Transaction List" tableColumns={tableColumns} tableData={data}   progressPending={loading}
          pagination
                    loading={loading}
                    fileHeading="Wait for File" file={true}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange} />

      </Container>
    </Fragment>
  );
};

export default ManageMacro;