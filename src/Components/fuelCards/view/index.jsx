import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Container } from "reactstrap";
import axios from "axios";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { fual_card } from "../../../api"; // your fuel card API endpoint
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
const ViewFuelCards = () => {
  const [fuelCards, setFuelCards] = useState([]);
    const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const[Edit,setEdit]=useState(false)
  // Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
const navigate=useNavigate()
  // Build column definitions

const filteredData = fuelCards.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
);

const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  useEffect(() => {
    const columns = [
      { key: "card", label: "Card",width:"200px" },
      { key: "policy", label: "Policy",width:"100px" },
      { key: "unit", label: "Unit",width:"100px" },
      { key: "pin", label: "PIN",width:"80px" },
      { key: "driverName", label: "Driver Name",width:"180px" },
      { key: "companyName", label: "Company Name" ,width:"250px"},
      { key: "supplierName", label: "Supplier Name",width:"150px" },
      { key: "suspicious", label: "Suspicious",width:"180px" },
      { key: "lastLogin", label: "Last Login" ,width:"180px"},
      { key: "loginBefore", label: "Login Before",width:"180px" },
      { key: "status", label: "Status",width:"100px" },
      {
        key: "Action",
         searchable: false,
        label: "Action",
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
                  minWidth: 150,
                  padding: "5px 0",
                }}
              >
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={(e) => handleEdit(e,row)}
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
      },
    ].map((col) => ({
      name: (
        <div>
          <div
            className="d-flex align-items-end justify-content-start"
            style={{ height: "40px" }}
          >
            {col.label}
          </div>

          {/* ✅ show search only if searchable !== false */}
       {col.searchable !== false && (
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
              onChange={(e) =>
              handleFilterChange(col.key, e.target.value)
              }
            />
          )}
        </div>
      ),
      selector: (row) => row[col.key],
      sortable: true,
      width:col.width,
      wrap: true,
      cell: col.cell,
      ignoreRowClick: col.ignoreRowClick,
      allowOverflow: col.allowOverflow,
      button: col.button,
    }));

    setTableColumns(columns);
  }, [openRowId]);

  // Fetch paginated data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;
      const params = { draw, start, length };

      const res = await axios.get(fual_card, { params });
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const mappedData = responseData.map((item) => ({
        id: item.card_id,
        card: item.card_no,
        policy: item.policy,
        unit: item.unit_number,
        pin: item.pin_number,
        driverName: item.driver_name,
        companyName: item.company_name,
        supplierName: item.supplier_name,
        suspicious: item.dated,
        lastLogin: item.dated,
        loginBefore: item.dated,
        status: item.status,
      }));

      setFuelCards(mappedData);
      setTotalRows(res.data.recordsTotal || res.data.total || 0);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching fuel card data", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  // Action handlers
   const handleEdit = async (e, row) => {
    console.log(row)
  try {
        const response = await axios.get(`${fual_card}/${row.id}`);
    
    console.log(response.data)

    setSelectedRow(response.data);
    setEdit(true);

    const encodedId = btoa(row.id); // encode ID

    navigate(`/edit-fuelCards/${encodedId}`, {
      state: { data: response.data }
    });

  } catch (error) {
    console.error("Error fetching full row data", error);
  }
};
  
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
        axios.delete(`${fual_card}/${row.id}`)
          .then(() => {
                  setFuelCards(fuelCards.filter((item) => item.id !== row.id));

            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
          });
      }
    });
  };

  // Close dropdown when clicking outside
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
      <Breadcrumbs parent="Fuel Cards" title="View Fuel Cards" />
      <Container fluid> 
        <DataTableComponent
          title="Fuel Card List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={filteredData}
          downloadHeading="Download"
          download={true}
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

export default ViewFuelCards;
