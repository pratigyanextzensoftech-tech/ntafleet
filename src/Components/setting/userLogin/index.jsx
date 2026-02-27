import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap"; 
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';  
import { user_log as APINAME } from '../../../api';
import dayjs from "dayjs"; 
import usePaginatedTable from '../../../Hooks/usePagination';  
const Index = () => {
    const [tableColumns, setTableColumns] = useState([]);
    const [openRowId, setOpenRowId] = useState(null);
    const [filters, setFilters] = useState({});

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
  const columnWidths = {
  "Sr.No": "120px",
  "User Name": "250px",
  "Login_IP": "150px",
  "Address": "400px",
  "Country": "150px",
  "State": "110px",
  "City": "170px",
  "Login_Status": "140px",
  "Login_Time": "180px",
  "Logout_Time": "180px",
  "Dated": "180px",
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
  
   const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  const filteredData = data.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
); 
  
    // ✅ Build column definitions for DataTable
    useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => {
    const colWidth = columnWidths[key]; 
    const colWidthPx = parseInt(colWidth, 10);

    return {
      name: (
        <div style={{ width: "100%",                    
              maxWidth: colWidthPx - 10 + "px", }}>
          <div className="d-flex align-items-end justify-content-start">
            {key}
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",                   
              maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border:"none",
              borderRadius:"5px",
              boxSizing: "border-box"
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        </div>
      ),
         selector: (row) => {
        if (key === "Login_Time" && row[key]) return formatDate(row[key]);
        if (key === "Logout_Time" && row[key]) return formatDate(row[key]);
        if (key === "Dated" && row[key]) return formatDate(row[key], false);
        return row[key];
      },
        sortable: true,
       width:colWidth,
        wrap: true,
      }});
      setTableColumns(cols);
    }, [openRowId]);
  
  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="User Login Log" />
      <Container fluid={true}> 
        <DataTableComponent
          title="User Login Log"
          tableColumns={tableColumns}
          tableData={filteredData}
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
