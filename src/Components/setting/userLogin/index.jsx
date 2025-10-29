import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap"; 
import HeaderCard from "../../Common/Component/HeaderCard";
//Table
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';  
import qs from 'qs'
import axios from 'axios';
import { user_log as APINAME } from '../../../api';
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import dayjs from "dayjs"; 
import usePaginatedTable from '../../../Hooks/usePagination';  
//end Table


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
      "Sr.No": "id",
      "User Name": "user_name",
      "Login_IP":"ip",
      "Address":"full_address",
      "Country":"country_name",
      "State":"state",
      "City":"city",
      "Login_Status":"login_status",
      "Login_Time":"s_start",
      "Logout_Time":"s_end",
      "Dated":"dated"
      
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
        if (key === "Dated" && row[key]) return formatDate(row[key], false);
        return row[key];
      },
        sortable: true,
        wrap: true,
      }));
  
      // Add Status column
    
  
 
  
      setTableColumns(cols);
    }, [openRowId]);
  
    // ✅ Action handlers
    const handleEdit = (row) => alert("Edit " + row.id); 
    const handleDelete = (row) => alert("Delete " + row.id);   
  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="User Login Log" />
      <Container fluid={true}> 
        <DataTableComponent
          title="User Login Log"
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
