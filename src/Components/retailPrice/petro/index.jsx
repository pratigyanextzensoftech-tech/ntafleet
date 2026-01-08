import React, { Fragment,useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import PetroForm from "./PetroForm";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { petro_retail as APINAME } from "../../../api";
import usePaginatedTable from '../../../Hooks/usePagination';
const Index = () => {
     const [openRowId, setOpenRowId] = useState(null);
      const [tableColumns, setTableColumns] = useState([]);
      const [filters, setFilters] = useState({});
         
        const columnsMap = {
        "Price_Date": "timestamp",
        "Location Name": "Site_Name",
        "City": "Site_City",
        "State": "Site_State",
        "Country": "Site_Country",
        "Price": "Site_Price",
        "Added_Date": "timestamp",
      
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
const formatDateOnly = (value) => {
  if (!value) return "";
  const d = new Date(value);
  // if (isNaN(d)) return value; // safety
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};


         useEffect(() => {
  const cols = Object.keys(columnsMap)
  .filter((key) => key !== "Id")
  .map((key) => {
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
            selector: (row) =>
          key === "Price_Date"
            ? formatDateOnly(row[key])
            : row[key],

        sortable: true,
        wrap: true,
      };
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
      //    useEffect(() => {
      //   if (data?.length) {
      //     const normalized = data.map((item) => ({
      //       ...item,
      //       id: item["City ID"], 
           
      //     }));
      
      //     setData(normalized);
      //   }
      // }, []);
      
  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Petro Retail Price" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <PetroForm btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Petro Retail List "
          tableColumns={tableColumns}
          tableData={filteredData}
          progressPending={loading}
          pagination
           loading={loading}
           downloadCsv="Download CSV"
           ShowdwonloadCsv={true}
           ShowloadData={true}
            loadData="Load Data"
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
