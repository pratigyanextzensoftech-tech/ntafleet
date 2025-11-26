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
const [selectedRow, setSelectedRow] = useState(null);
    const[Edit,setEdit]=useState(false)
  // Format date for table display
  const formatDate = (value, withTime = true) => {
    if (!value) return "-";
    const format = withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
  };

  // Column mapping
  const columnsMap = {
    "ID #": "id",
    "Name": "name",
    "Email": "email",
    "Phone": "phone",
    "Address": "address",
    "Added_By": "added_by_name",
    "Added_On": "created",
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


   const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // ✅ Build column definitions
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => {
        if (key === "Added_On" && row[key]) return formatDate(row[key]);
        return row[key];
      },
      sortable: true,
      wrap: true,
    }));

    // Status Column
    cols.push({
      name: "Status",
      cell: (row) => (
        <select
          className="form-select form-select-sm"
          value={row.status || "Active"}
          onChange={(e) => handleChange(row.id, "status", e.target.value)}
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
          tableData={data}
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
