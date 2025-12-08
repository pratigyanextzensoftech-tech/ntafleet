import React, { Fragment,useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import PetroForm from "./PetroForm";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { petro_retail as APINAME } from "../../../api";
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from '../../../Hooks/usePagination';
const Index = () => {
     const [openRowId, setOpenRowId] = useState(null);
         const [tableColumns, setTableColumns] = useState([]);
        const columnsMap = {
        "Price_Date": "cardNumber",
        "Location Name": "Site_Name",
        "City": "Site_City",
        "State": "Site_State",
        "Country": "Site_Country",
        "Price": "Site_Price",
        "Added_Date": "city",
      
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
      
  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Petro Retail Price" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <PetroForm btnTitle="Search Data" btnTitle1="Reset" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Petro Retail List "
        tableColumns={tableColumns}
         tableData={data}
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

export default Index;
