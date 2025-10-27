import React, { Fragment,useEffect,useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import List from './List';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import { dummytabledata, tableColumns } from '../../../Data/Table/Defaultdata';
import { tcheck } from '../../../api';
import { FaSignInAlt ,FaTrashAlt,FaEdit} from 'react-icons/fa';
import qs from "qs"; // npm install qs

import axios from 'axios';
const Index = () => {
   const [data, setData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [draw, setDraw] = useState(1);
    const [filters, setFilters] = useState({});
  
    
   
  
    // ✅ Column mapping between UI and API
    const columnsMap = {
      "CreateId": "card_no",
      "Company": "company_name",
      "Create Date": "create_date",
      "Express Code": "express_code",
      "Dollar_Amt": "dollar_amt",
      "Fees": "fees",
      "Generation_Type": "generation_type",
      "Payee": "payee",
      "Driver_ID": "driver_id",
      "Tractor#": "trip",
      "Trip#": "fees",
      "Driver_CDL": "driver_cdl",
      "Trailer#": "trailer",
      "Memo": "memo",
     
    };
    
  
   
  
  
    // ✅ Build column definitions for DataTable
    useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
      }));
  
      // ✅ Add Actions column at the end
      cols.push({
        name: "Actions",
        cell: (row) => (
          <div className="d-flex gap-2">
            <FaEdit
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(row)}
            />
            <FaSignInAlt
              color="green"
              style={{ cursor: "pointer" }}
              onClick={() => handleLogin(row)}
            />
            <FaTrashAlt
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(row)}
            />
          </div>
        ),
      });
  
      setTableColumns(cols);
    }, []);
  
    // ✅ Fetch paginated + filtered data
    const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
      setLoading(true);
      try {
        const start = (page - 1) * perPage;
        const length = perPage;
  
        const params = {
          draw,
          start,
          length,
          ...filtersData, // include filters
        };
  
        const response = await axios.get(tcheck, {
        params: {
          draw: page,
          start: (page - 1) * perPage,
          length: perPage,
          ...filters, // this includes supplier_id: [...]
        },
        paramsSerializer: (params) =>
          qs.stringify(params, {
            arrayFormat: "repeat", // ✅ supplier_id=ESSO MOBIL&supplier_id=EXXON
          }),
      });
         
    
        const res = response.data;
  
        console.log("✅ API response:", res);
  
        const apiData = res.data || [];
        setTotalRows(res.recordsTotal || res.total || apiData.length);
        setDraw(draw + 1);
  
        // ✅ Map API fields to UI fields
        const tableData = apiData.map((row) => {
          const newRow = {};
          Object.keys(columnsMap).forEach((col) => {
            newRow[col] = row[columnsMap[col]];
          });
          newRow.id = row.id || row.card_no || Math.random();
          return newRow;
        });
  
        setData(tableData);
      } catch (error) {
        console.error("❌ Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  
    // ✅ Initial load
    useEffect(() => {
      fetchData(currentPage, perPage, filters);
    }, [perPage]);
  
    // ✅ Page change
    const handlePageChange = (page) => {
      setCurrentPage(page);
      fetchData(page, perPage, filters);
    };
  
    // ✅ Rows per page change
    const handlePerRowsChange = (newPerPage, page) => {
      setPerPage(newPerPage);
      setCurrentPage(page);
      fetchData(page, newPerPage, filters);
    };
  
    // ✅ Action handlers
    const handleEdit = (row) => alert("Edit " + row.id);
    const handleLogin = (row) => alert("Login " + row.id);
    const handleDelete = (row) => alert("Delete " + row.id);
  
    // ✅ Handle search/filter submit from form
    const handleSearch = (formData) => {
      console.log("🔍 Filters received:", formData);
      setFilters(formData); // save filters
      setCurrentPage(1); // reset to first page
      fetchData(1, perPage, formData); // fetch new data immediately
    };
  
    
    const stickyColumns = tableColumns.map((col, index) => {
      if (index === 0) {
        return { ...col, style: { position: "sticky", left: 0, background: "#f9f9f9", zIndex: 2 } };
      }
      if (index === tableColumns.length - 1) {
        return { ...col, style: { position: "sticky", right: 0, background: "#f9f9f9", zIndex: 2 } };
      }
      return col;
    });
  
  return (
    <Fragment>
      <Breadcrumbs parent='Tcheck' title='T Check List '  />
      <Container fluid={true}>
                   <HeaderCard title="T Check List " />
                                        <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

                    <div className='bg-primary p-2 mb-4'>
                            <HeaderCard title="Filters " />
                    </div>      
                 <List btnTitle="search Data" btnTitle1="Reset"/>   
                    </div>
                    <DataTableComponent title="T Check List" tableColumns={tableColumns} tableData={data}/>
      </Container>
    </Fragment>
  );
};

export default Index;