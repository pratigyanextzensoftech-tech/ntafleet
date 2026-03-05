import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import StateForm from "./StateForm";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { state as APINAME } from "../../../api";
import { FaEye,FaTrashAlt} from "react-icons/fa";
import usePaginatedTable from "../../../Hooks/usePagination";
import Swal from "sweetalert2";
//end Table
const Index = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
 const [selectedRow, setSelectedRow] = useState(null);
  const[Edit,setEdit]=useState(false)
   const [filters, setFilters] = useState({});
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  const columnsMap = {
    "State ID": "state_id",
    "State Name": "province_name",
    Abbreviation: "province_abbreviation",
    Country: "country_name",
    "Tax Cent": "tax_cent",
    GST: "gst",
    HST: "hst",
    QST: "qst",
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
  
  // ✅ Build column definitions for DataTable
  useEffect(() => {
         const cols = Object.keys(columnsMap).map((key) => {

    return {
      name: (
        <div style={{ width: "100%",                    
            }}>
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
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
   } });

    // Add Status column

    // ✅ Add Actions column at the end
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["State ID"] ? null : row["State ID"])}
          >
            Action
          </button>

          {openRowId === row["State ID"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 180,
                padding: "5px 0",
              }}
            >
              {/* Download */}

              {/* Edit */}
              <button
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEdit(row)}
              >
                <FaEye /> Edit
              </button>
              {/* Delete */}
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

  // ✅ Action handlers

    const handleEdit = (row) => {
console.log(row)
    setEdit(true)
    setSelectedRow(row); 
    }; 
const handleDelete = (row) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete state "${row["State ID"]}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${APINAME}/${row["State ID"]}`)
        .then(() => {
          setData((prevData) =>
            prevData.filter((item) => item["State ID"] !== row["State ID"])
          );
          Swal.fire('Deleted!', 'State record deleted successfully.', 'success');
        })
        .catch(() => {
          Swal.fire('Error!', 'Failed to delete state record.', 'error');
        });
    }
  });
};
    const refreshTable = () => {
    fetchData(); // fetch latest data
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Location" title="Manage State" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add State" />
              <CardBody>
                <StateForm onDataAdded={refreshTable}  Edit={Edit}
  selectedRow={selectedRow}
  setEdit={setEdit}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="State List"
          tableColumns={tableColumns}
          tableData={filteredData}
          loading={loading}
          pagination
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
