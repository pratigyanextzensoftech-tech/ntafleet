import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container,Row,Col,Card,CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard"; 
import ManageSalesman from "./ManageSalesman";

import DataTableComponent from '../../Tables/DataTable/DataTableComponent'; 
import qs from 'qs'
import axios from 'axios';
import { salesman as APINAME } from '../../../api';
import {
  FaDownload,
  FaEye, 
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import usePaginatedTable from '../../../Hooks/usePagination';  
import dayjs from "dayjs"; 

const Index = () => {
  const [tableColumns, setTableColumns] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);
      const formatDate = (value, withTime = true) => {
        if (!value) return "-";
        const format = withTime ? "DD-MM-YYYY HH:MM" : "DD-MM-YYYY";
        return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
      };
  
  
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
      "ID #": "id",
      "Name": "name",
      "Email": "email",
      "Phone": "phone",
      "Address": "address",
      "Added_By": "added_by_name",
      "Added_On": "created",
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
  
  
  
    // ✅ Build column definitions for DataTable
    useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => ({
        name: key,
        selector: (row) => {
        if (key === "Login_Time" && row[key]) return formatDate(row[key]);
        if (key === "Logout_Time" && row[key]) return formatDate(row[key]);
        if (key === "Added_On" && row[key]) return formatDate(row[key]);
        return row[key];
      },
        sortable: true,
        wrap: true,
      }));
  
      // Add Status column
      cols.push({
        name: "Status",
        cell: (row) => (
          <select
            className="form-select form-select-sm"
  
            value={
              row.status === "Open"
                ? "Open"
                : row.status === "Entered"
                  ? "Entered"
                  : "Close"
            }
  
            onChange={(e) => handleChange(row.id, "status", e.target.value)}
          >
            <option value="Active">Active</option> 
            <option value="Blocked">Blocked</option>
  
          </select>
        ),
        width: "140px",
      });
  
      // ✅ Add Actions column at the end
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
                  minWidth: 50,
                  padding: "5px 0",
                }}
              >
               
                
                <button
                  className="dropdown-item d-flex align-items-center text-success"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleEdit(row)}
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
  if (data?.length) {
    const normalized = data.map((item) => ({
      ...item,
      id: item["ID #"], 
     
    }));

    setData(normalized);
  }
}, [data]);
    // ✅ Action handlers
    const handleEdit = (row) => console.log(row); 
    const handleDelete = (row) => alert("Delete " + row.id);  
  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Manage Sales Man" />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sales Man" />
              <CardBody>
                <ManageSalesman />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Sales Man List"
          tableColumns={tableColumns}
          tableData={data}
          progressPending={loading}
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
