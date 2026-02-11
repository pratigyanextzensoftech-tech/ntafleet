import React, { Fragment,useState,useEffect } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import {  efs_fual_card1 as APINAME} from '../../../api/index'
import usePaginatedTable from '../../../Hooks/usePagination';

const Index = () => {
   const [openRowId, setOpenRowId] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
    const [filters, setFilters] = useState({});
    
    const columnsMap = {
      "Card Number #": "cardNumber",
      "Policy Number ": "policyNumber",
      "companyXRef": "company_name",
      "unitNumber": "unitNumber",
      "driverId": "driverId",
      "driverName": "driverName",
      "beingOverridden": "beingOverridden",
      "status": "status",
      "PayrollStatus": "payrollStatus",
      "PayrollUse": "payrollUse",
      "gpsid": "gpsid",
      "Zid": "zid",
      "infosrc": "infosrc",
      "plicySubFleet": "policySubfleet",
      "CardSubfleet": "cardSubfleet",
    };
  const columnWidths = {
  "Card Number #": "210px",
  "Policy Number ": "150px",
  "companyXRef": "140px",
  "unitNumber": "110px",
  "driverId": "100px",
  "driverName": "120px",
  "beingOverridden": "160px",
  "status": "100px",
  "PayrollStatus": "150px",
  "PayrollUse": "110px",
  "gpsid": "100px",
  "Zid": "50px",
  "infosrc": "70px",
  "plicySubFleet": "120px",
  "CardSubfleet": "120px",
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
    useEffect(() => {
      const cols = Object.keys(columnsMap)
  .filter((key) => key !== "Id")
  .map((key) => {
    const colWidth = columnWidths[key]; 
    const colWidthPx = parseInt(colWidth, 10);

    return {
      name: (
        <div style={{ width: "100%" }}>
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
        selector: (row) => row[key],
        sortable: true,
        width:colWidth,
        wrap: true,
      }});
  console.log(data)
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
  
    
  return (
    <Fragment>
      <Breadcrumbs parent='Fuel Cards' title=' View EFS Fual Cards'  />
      <Container fluid={true}> 
       
       <DataTableComponent title=" View EFS Fual Cards " tableColumns={tableColumns} tableData={filteredData}   downloadHeading="Download"
          download={true}
          pagination/>    
      </Container>
    </Fragment>
  );
};

export default Index;