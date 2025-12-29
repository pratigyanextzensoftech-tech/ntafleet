import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap"; 
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';  

import { user_tracking as APINAME } from '../../../api';
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
      "Login_IP":"user_ip", 
     // "Country":"country_name", 
    //  "City":"city",
      "Menu":"menu_name",
      "Link":"menu_link",
      "Type":"type",
      "Dated":"dated"
      
    };
  const columnWidths = {
  "Sr.No": "130px",
  "User Name": "260px",
  "Login_IP": "360px",
  "Menu": "290px",
  "Link": "290px",
  "Type": "190px",
  "Dated": "290px",
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
        if (key === "Dated" && row[key]) return formatDate(row[key]);
        return row[key];
      },
        sortable: true,
         width:colWidth,
        wrap: true,
    
  
      // Add Status column
    
  
    }})
  
      setTableColumns(cols);
    }, [openRowId]);
  
    // ✅ Action handlers
    const handleEdit = (row) => alert("Edit " + row.id); 
    const handleDelete = (row) => alert("Delete " + row.id);   
  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Track Visitors" />
      <Container fluid={true}> 
        <DataTableComponent
          title="Track Visitors"
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
