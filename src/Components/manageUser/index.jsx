import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../AbstractElements";
import HeaderCard from "../Common/Component/HeaderCard";
import DataTableComponent from "../Tables/DataTable/DataTableComponent";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { FaEdit, FaTrashAlt, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { administrator } from "../../api/index";
import FormComponent from "./Form";
import Swal from "sweetalert2";
const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // ✅ Fetch user list API
  const fetchUsers = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit };

      const res = await axios.get(administrator, { params });
      const apiData = Array.isArray(res.data.data)
        ? res.data.data
        : res.data;

      const formatted = apiData.map((item, index) => ({
        id: item.id ,
        name: item.name ,
        email: item.email ,
        phone: item.phone ,
        company: item.company ,
        added_by: item.added_by_name ,
        company_login: item.company_login ,
        status: item.status ,
         password: item.password 
      }));

      setData(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || apiData.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, perPage);
  }, [perPage]);

  // ✅ Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchUsers(page, newPerPage);
  };

  // ✅ Edit / Delete / Send Details
  const handleEdit = (row) => {
    console.log(row)
    setEditUser(row)
    axios.put(administrator,row.id)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err)
    });
  };
  const handleDelete = (row) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you really want to delete user "${row.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // ✅ Call API to delete
      axios.delete(`${administrator}/${row.id}`)
        .then((res) => {
          console.log(res);
          // ✅ Remove from state
          setData((prevData) => prevData.filter((item) => item.id !== row.id));

          // ✅ Success alert
          Swal.fire(
            'Deleted!',
            `User "${row.name}" has been deleted.`,
            'success'
          );
        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Error!', 'Failed to delete user.', 'error');
        });
    }
  });
};

  const handleSendDetails = (row) => alert(`📤 Send details for: ${row.email}`);

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

  // ✅ Dropdown updaters (company_login, status)
  const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );

    // Optional: call API to update
    // axios.post(`${administrator}/update`, { id, [field]: value });
  };

  // ✅ Build columns
  useEffect(() => {
    const columns = [
      { name: "ID", selector: (row) => row.id, sortable: true },
      { name: "Name", selector: (row) => row.name, sortable: true, wrap: true },
      { name: "Email", selector: (row) => row.email, sortable: true, wrap: true },
      { name: "Phone", selector: (row) => row.phone, sortable: true, wrap: true },
      { name: "Company", selector: (row) => row.company, sortable: true, wrap: true },
      { name: "Added By", selector: (row) => row.added_by, sortable: true, wrap: true },

      {
        name: "Company Login",
        cell: (row) => (
          <select
            className="form-select form-select-sm"
            value={row.company_login === "Yes" ? "Yes" : "No"}
            onChange={(e) => handleChange(row.id, "company_login", e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        ),
        width: "140px",
      },
      {
        name: "Status",
        cell: (row) => (
          <select
            className="form-select form-select-sm"
            value={row.status == "0" ? "Active" : "Blocked"}
            onChange={(e) => handleChange(row.id, "status", e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        ),
        width: "140px",
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action">
            <button
              className="btn btn-sm btn-primary px-2"
              onClick={() =>
                setOpenRowId(openRowId === row.id ? null : row.id)
              }
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
                  minWidth: 140,
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
                <button
                  className="dropdown-item d-flex align-items-center text-info"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleSendDetails(row)}
                >
                  <FaPaperPlane /> Send Details
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
  }, [openRowId,data]);

  return (
    <Fragment>
      <Breadcrumbs parent="Manage User" title="Manage User" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add User" />
              <CardBody>
                <FormComponent  onUserAdded={(newUser) => setData((prev) => [newUser, ...prev])} editUser={editUser}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="User List"
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
