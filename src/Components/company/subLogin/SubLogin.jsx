import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import SubLoginForm from "./SubLoginForm";
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { sub_company as APINAME } from "../../../api";
import {
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from '../../../Hooks/usePagination';

const SubLOgin = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [tableColumns, setTableColumns] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
    const [filters, setFilters] = useState({});

    const[Edit,setEdit]=useState(false)

  const columnsMap = {
    "Id #": "id",
    "Company": "company_name",
    "Name": "name",
    "Email": "email",
    "OTP Email": "otp_email",
    "Discount_Sheet_Menu": "card_discount",
    "Added_By": "added_by",
    "Added_On": "added_on",
  };
const columnWidths = {
  "Id #":"100px",
  "Company":"350px",
  "Create Date": "140px",
  "Name": "220px",
  "Email": "200px",
 "OTP Email": "200px",
 "Discount_Sheet_Menu": "230px",
  "Added_By": "200px",
 "Added_On": "200px",
};
  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch, // ✅ Added
    setData,
    fetchData
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
       width: colWidth,
      wrap: true,
    }});

    cols.push({
      name: "Action",
      searchable: false,
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row[["Id #"]]? null : row["Id #"])}
          >
            Action
          </button>

          {openRowId === row["Id #"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 160,
                padding: "5px 0",
              }}
            >
              <button
                className="dropdown-item d-flex align-items-center text-primary"
                style={{ padding: "8px 12px", gap: "8px" }} 
                onClick={()=>handleEdit(row)}
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
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // useEffect(() => {
  //   if (data?.length) {
  //     const normalized = data.map((item) => ({
  //       ...item,
  //       id: item["Id #"],

  //     }));

  //     setData(normalized);
  //   }
  // }, [data]);
  const handleEdit =async (row)=>{
     try {
    const response = await axios.get(`${APINAME}/${row["Id #"]}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
    
  }
  const handleDelete = (row) => {
    console.log(row)
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
        axios.delete(`${APINAME}/${row[["Id #"]]}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item["Id #"] !== row["Id #"]));
            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
          });
      }
    });
  };
    const refreshTable = () => {
    fetchData();
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Company" title="Manage SubLogin" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sub-Login" />
              <CardBody>
                <SubLoginForm btnTtitle="Add Sub Login" onDataAdded={refreshTable}  Edit={Edit}
  selectedRow={selectedRow}
  setSelectedRow={setSelectedRow}
  setEdit={setEdit}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Sub-Login List  "
          tableColumns={tableColumns} tableData={filteredData}
          progressPending={loading}
          pagination
          loading={loading}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Container>
    </Fragment>
  );
};

export default SubLOgin;
