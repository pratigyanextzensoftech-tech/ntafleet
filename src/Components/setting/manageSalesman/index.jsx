import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container,Row,Col,Card,CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { salesman } from "../../../api/index";
import ManageSalesman from "./ManageSalesman";

const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);

  // ✅ Fetch API Data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const params = { draw, start, length: perPage };

      const res = await axios.get(salesman, { params });
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const tableData = responseData.map((item) => ({
        id: item.id,
        email: item.email,
        phone: item.phone || "",
        address: item.address,
        added_by: item.added_by_name,
        added_on: item.created,
        status: item.status, // 0 or 1
      }));

      setData(tableData);
      setTotalRows(res.data.recordsTotal || res.data.total || responseData.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching salesman data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ On mount
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // ✅ Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  // ✅ Handle Edit / Delete
  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Add edit modal logic here
  };

  const handleDelete = (row) => {
    if (window.confirm(`Delete salesman "${row.email}"?`)) {
      setData((prev) => prev.filter((item) => item.id !== row.id));
      // Add delete API call if needed
    }
  };

  // ✅ Handle Status Change
  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    // Optionally call API to update status
    // axios.post(`${salesman}/updateStatus`, { id, status: newStatus })
    //   .then(() => console.log("Status updated"))
    //   .catch((err) => console.error("Error updating status:", err));
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Define columns (including dropdown)
  useEffect(() => {
    const columns = [
      { name: "ID", selector: (row) => row.id, sortable: true, wrap: true },
      { name: "Email", selector: (row) => row.email, sortable: true, wrap: true },
      { name: "Phone", selector: (row) => row.phone, sortable: true, wrap: true },
      { name: "Address", selector: (row) => row.address, sortable: true, wrap: true },
      { name: "Added By", selector: (row) => row.added_by, sortable: true, wrap: true },
      { name: "Added On", selector: (row) => row.added_on, sortable: true, wrap: true },
      {
        name: "Status",
        cell: (row) => (
          <select
            className={`form-select form-select-sm ${row.status === 0 ? "text-success" : "text-danger"
              }`}
            style={{ width: "110px", fontWeight: "500" }}
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, parseInt(e.target.value))}
          >
            <option value={0}>Active</option>
            <option value={1}>Blocked</option>
          </select>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
            >
              Action
            </button>

            {openRowId === row.id && (
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
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleEdit(row)}
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
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        width: "160px",
      },
    ];

    setTableColumns(columns);
  }, [openRowId, data]);

  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Manage Sales Man" />
      <Container fluid={true}>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add Sales Man" />
              <CardBody>
                <ManageSalesman />
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
