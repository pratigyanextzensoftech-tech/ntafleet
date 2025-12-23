import React, { Fragment,useState,useEffect } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import {  efs_fual_card1 as APINAME} from '../../../api/index'
import usePaginatedTable from '../../../Hooks/usePagination';
import Swal from 'sweetalert2';
import axios from 'axios';

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
      const cols = Object.keys(columnsMap).map((key) => ({
          name: (
        <div>
          <div
            className="d-flex align-items-end justify-content-start"
            style={{ height: "40px" }}
          >
            {columnsMap[key]}
          </div>

          {/* ✅ show search only if searchable !== false */}
          {columnsMap[key].searchable !== false && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Search here"
              style={{ borderRadius: "5px" }}
               onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) =>
                handleFilterChange(key, e.target.value)
              }
            />
          )}
        </div>
      ),
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
      }));
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