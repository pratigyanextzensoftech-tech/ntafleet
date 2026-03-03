import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import ManageSalesman from "./ManageSalesman";
import Swal from "sweetalert2";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { salesman as APINAME } from "../../../api";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import usePaginatedTable from "../../../Hooks/usePagination";
import dayjs from "dayjs";

const Index = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [filters, setFilters] = useState({});
const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)
  // Format date for table display
  const formatDate = (value, withTime = true) => {
    if (!value) return "-";
    const format = withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
  };
  const columnsMap = {
    "ID #": "id",
    "Name": "name",
    "Email": "email",
    "Phone": "phone",
    "Address": "address",
    "Added_By": "added_by_name",
    "Added_On": "created",
  };
const columnWidths = {
  "ID #": "80px",
  "Name": "200px",
  "Email": "260px",
  "Phone": "140px",
  "Address": "300px",
  "Added_By": "180px",
  "Added_On": "160px",
};

  // Custom pagination hook
  const {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
    setData,
    fetchData,
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
  // ✅ Refresh function
  const refreshTable = () => {
    fetchData();
  };

  // ✅ Handle Outside Click for Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleChange = async (id, field, value) => {
  console.log("Invoice ID:", id);

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to update the Status?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Update",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    // 🔹 SHOW LOADING
    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // 🔹 PUT API CALL
    await axios.put(APINAME, {
      id,
      [field]: value,
    });

    // 🔹 UPDATE STATE AFTER SUCCESS
    setData((prevData) =>
      prevData.map((item) =>
        item.fulldata.id === id
          ? { ...item, [field]: value }
          : item
      )
    );

    Swal.fire("Success", "Updated successfully", "success");
  }
   catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to update data", "error");
  }
};

  // ✅ Build column definitions
  useEffect(() => {
   const cols = Object.keys(columnsMap).map((key) => {
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
      selector: (row) => {
        if (key === "Added_On" && row[key]) return formatDate(row[key]);
        return row[key];
      },
      sortable: true,
      wrap: true,
    }
});

    // Status Column
    cols.push({
        name: (
        <div style={{ width: "100%",                    
               }}>
          <div className="d-flex align-items-end justify-content-start">
           Status
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
            onChange={(e) => handleFilterChange("status", e.target.value)}
          />
        </div>
      ),
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          value={row.status || "Active"}
          onChange={(e) => handleChange(row.fulldata.id, "status", e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      ),
      width: "140px",
    });

    // Actions Column
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["ID #"] ? null : row["ID #"])}
          >
            Action
          </button>

          {openRowId === row["ID #"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 120,
                padding: "5px 0",
              }}
            >
              <button
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEdit(row)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={(e) => handleDelete(e, row)}
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

  // ✅ Normalize data
  // useEffect(() => {
  //   if (data?.length) {
  //     const normalized = data.map((item) => ({
  //       ...item,
  //       id: item["ID #"] || item.id,
  //     }));
  //     setData(normalized);
  //   }
  // }, [data]);

  // ✅ Action Handlers
 const handleEdit = async(row) => {
    try {
    const response = await axios.get(`${APINAME}/${row["ID #"]}`);
    setSelectedRow(response.data);     // ✅ full API object
    setEdit(true);
  } catch (error) {
    console.error("Error fetching full row data", error);
  }
  };
  const handleDelete = (e, row) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this record?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${APINAME}/${row["ID #"]}`)
          .then(() => {
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
            refreshTable(); // ✅ refresh data after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete record.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Manage Sales Man" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sales Man" />
              <CardBody>
                {/* ✅ Call refreshTable on successful add */}
                <ManageSalesman
    onDataAdded={refreshTable}
    Edit={Edit}
    selectedRow={selectedRow}
    setEdit={setEdit}
/>

              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Sales Man List"
          tableColumns={tableColumns}
          tableData={filteredData}
          progressPending={loading}
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
