import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { Transaction } from "../../../api";
import ViewForm from "./ViewForm";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [draw, setDraw] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);

  // ✅ Define columns to show in the table
  const columnsMap = {
    CARD: "card_no",
    Company: "company_name",
    Suppliers: "supplier_name",
    Date: "tran_date",
    Time: "tran_time",
    Invoice: "invoice",
    Unit: "unit",
    Driver_Name: "driver_name",
    City: "city",
    State: "state_prov",
    Fees: "fees",
    Item: "item",
    Unit_Price: "unit_price",
    Tax_Unit_Price: "tax_unit_price",
    Qty: "qty",
    Amt: "amt",
    TaxAmt: "tax_amt",
    Currency: "currency"
  };

  // ✅ Fetch paginated data from API
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;

      const response = await axios.get(
        `${Transaction}?draw=${draw}&start=${start}&length=${length}`
      );

      const res = response.data;
      const apiData = res.data || [];
      setTotalRows(res.recordsTotal || res.total || 0);
      setDraw(draw + 1);

      // Map API data to only selected columns
      const tableData = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((col) => {
          newRow[col] = row[columnsMap[col]];
        });
        // Keep row ID for actions
        newRow.id = row.id || row.card_no || Math.random();
        return newRow;
      });
      setData(tableData);

      // Generate DataTable columns
      const dtColumns = Object.keys(columnsMap).map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
        wrap: true
      }));

      // Add Action column
      dtColumns.push({
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
                style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 150, padding: "5px 0" }}
              >
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleEdit(row)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="dropdown-item d-flex align-items-center"
                  style={{ padding: "8px 12px", gap: "8px" }}
                  onClick={() => handleLogin(row)}
                >
                  <FaSignInAlt /> Login
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
        button: true
      });

      setTableColumns(dtColumns);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  // ✅ Handle rows-per-page change
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  // ✅ Dummy action handlers
  const handleEdit = (row) => alert("Edit " + row.id);
  const handleLogin = (row) => alert("Login " + row.id);
  const handleDelete = (row) => alert("Delete " + row.id);

  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title="View Transaction" />
      <Container fluid={true}>
        <HeaderCard title="Transactions List" />

        <div
          style={{
            border: "1px solid #ccc",
            padding: "5px 10px",
            borderRadius: "3px",
            marginBottom: "10px"
          }}
        >
          <div className="bg-primary p-2 my-3">
            <HeaderCard title="Filters" />
          </div>

          <ViewForm btnTitle="Search Data" btnTitle1="Reset" />
        </div>

        <DataTableComponent
          title="Transactions List"
          tableData={data}
          tableColumns={tableColumns}
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
