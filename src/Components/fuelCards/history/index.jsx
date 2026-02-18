import React, { Fragment,useEffect,useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { card_update  as APINAME,updateHistory as api } from "../../../api";
import dayjs from "dayjs"; 
import usePaginatedTable from '../../../Hooks/usePagination';  
import Swal from "sweetalert2";
import axios from "axios";
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
        "CARD#": "card_no",
        "Updated": "content",
        "	Suspicious":"susp_comp",
        "Last Login":"last_login",
        "Login Before":"last_login_days",
        "Updated IP":"ip_addr",
        "Updated On":"dated",
        "Updated By":"added_by",   
      };
    const columnWidths = {
    "CARD#": "150px",
    "Updated": "250px",
    "Suspicious": "100px",
    "Last Login": "200px",
    "Login Before": "240px",
    "Updated IP": "200px",
    "Updated On": "230px",
    "Updated By": "230px",
  };
  
      const {
        data,
        totalRows,
        loading,
        handlePageChange,
          fetchData,
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
     const handleStatusChange = (fullRow, newvalue) => {
      console.log(newvalue)
      
    Swal.fire({
      title: "Are you sure?",
      text: "to change the Status?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      const userId=localStorage.getItem("userId")
      if (result.isConfirmed) {
       setData((prev) =>
          prev.map((row) =>
            row.fulldata.id === fullRow.id
              ? {
                  ...row,
                  fulldata: {
                    ...row.fulldata,
                    efs_done:newvalue,
                    efs_done_by: userId,
                  },
                }
              : row
          )
        );
const update_status={ efs_done_by: userId,efs_done:newvalue}
       console.log(update_status)
        axios.put(`${api}/${fullRow.id}`, update_status).catch(() => {
             fetchData();
      }       
    );
  };
})
     }
      // ✅ Build column definitions for DataTable
      useEffect(() => {
        const cols = Object.keys(columnsMap).map((key) => {
     const colWidth = columnWidths[key];
        const colWidthPx = parseInt(colWidth, 10);
  
      return {
        name: (
          <div style={{ width: "100%"}}>
            <div className="d-flex align-items-end justify-content-start">
              {key}
            </div>
            <input
              type="text"
              className="mt-2"
             style={{
                  width: "100%",
                  // maxWidth: colWidthPx - 10 + "px",// small padding
                  height: "28px",
                  border: "none",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => handleFilterChange(key, e.target.value)}
            />
          </div>
        ),
        selector: (row) => {

  // ✅ Render HTML content properly
  if (key === "Updated" && row[key]) {
    return (
      <div
        className="my-custom-style"
        dangerouslySetInnerHTML={{ __html: row[key] }}
      />
    );
  }

  return row[key];
},
          sortable: true,
          wrap: true,
            width: colWidth,
        }});
          cols.push({
      name: (
        <div style={{ width: "100%"}}>
          <div className="d-flex align-items-end justify-content-start">
            Status
          </div>
          <input
            type="text"
            className="mt-2"
            style={{
              width: "100%",
              // maxWidth: colWidthPx - 10 + "px",// small padding
              height: "28px",
              border: "none",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => handleFilterChange("Status", e.target.value)}
          />
        </div>
      ),
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          // id={`mails_${row.fulldata.invoice_id}`}
          value={String(row.fulldata.efs_done)} // ✅ correct source
          onChange={(e) => handleStatusChange(row.fulldata, e.target.value)}
        >
          <option value="1">DONE ON EFS</option>
          <option value="0">PENDING ON EFS</option>
        </select>
      ),
      width: "200px",
    });

        setTableColumns(cols);
      }, [openRowId]);
  return (
    <Fragment>
      <Breadcrumbs parent="Fuel Cards" title="Fual Cards Update History" />
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
