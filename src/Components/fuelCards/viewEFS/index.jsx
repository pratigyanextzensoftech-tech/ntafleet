import React, { Fragment,useState,useEffect } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import {  efs_fual_card1 as APINAME} from '../../../api/index'
import usePaginatedTable from '../../../Hooks/usePagination';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  FaFilePdf,
  FaFileExcel,
  FaEnvelope,
  FaRedoAlt,
  FaTrashAlt,
} from "react-icons/fa";
const Index = () => {
   const [openRowId, setOpenRowId] = useState(null);
    const [tableColumns, setTableColumns] = useState([]);
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
    useEffect(() => {
      const cols = Object.keys(columnsMap).map((key) => ({
        name: key,
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
  
    const handleDelete = (row) => {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${APINAME}/${row["Invoice #"]}`)
            .then(() => {
              setData((prevData) => prevData.filter((item) => item["Invoice #"] !== row["Invoice #"]));
              Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
            })
            .catch(() => {
              Swal.fire('Error!', 'Failed to delete record.', 'error');
            });
        }
      });
    };
  return (
    <Fragment>
      <Breadcrumbs parent='Fuel Cards' title=' View EFS Fual Cards'  />
      <Container fluid={true}> 
       <DataTableComponent title=" View EFS Fual Cards " tableColumns={tableColumns} tableData={data}   downloadHeading="Download"
          download={true}
          pagination/>    
      </Container>
    </Fragment>
  );
};

export default Index;