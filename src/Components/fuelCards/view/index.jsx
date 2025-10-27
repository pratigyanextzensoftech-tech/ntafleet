import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Container } from "reactstrap";
import axios from "axios";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { fual_card } from "../../../api"; // your fuel card API endpoint

const ViewFuelCards = () => {
  const [fuelCards, setFuelCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);

  // Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // Build column definitions
  useEffect(() => {
    const columns = [
      { key: "card", label: "Card" },
      { key: "policy", label: "Policy" },
      { key: "unit", label: "Unit" },
      { key: "pin", label: "PIN" },
      { key: "driverName", label: "Driver Name" },
      { key: "companyName", label: "Company Name" },
      { key: "supplierName", label: "Supplier Name" },
      { key: "suspicious", label: "Suspicious" },
      { key: "lastLogin", label: "Last Login" },
      { key: "loginBefore", label: "Login Before" },
      { key: "status", label: "Status" },
      {
        key: "Action",
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
      },
    ].map((col) => ({
      name: col.label,
      selector: (row) => row[col.key],
      sortable: true,
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
  const handleEdit = (row) => console.log("Edit:", row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete "${row.card}"?`)) {
      setFuelCards(fuelCards.filter((item) => item.id !== row.id));
      setOpenRowId(null);
    }
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
          tableData={fuelCards}
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
