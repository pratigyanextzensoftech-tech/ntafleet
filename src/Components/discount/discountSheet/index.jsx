import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import DiscountSheetForm from "./DiscountSheet";
import axios from "axios";
import { discount_sheet } from "../../../api";
import { FaFileAlt, FaClipboardList, FaEnvelope } from "react-icons/fa";

const DiscountSheetPage = () => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);
  const [draw, setDraw] = useState(1);

  // ✅ Fetch Discount Sheet data dynamically
  const fetchDiscountSheets = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit; // calculate start index
      const params = { draw, start, length: limit };

      const res = await axios.get(discount_sheet, { params });
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;

      const formatted = data.map((item, index) => ({
        id: item.id || index + 1,
        company_name: item.company_name,
        start_date: item.start_date,
        end_date: item.end_date,
        discount_percent: item.discount_percent,
        discount_for: item.discount_for,
        litre: item.litres,
        gallons: item.gallons,
        discount_usd: item.discount_usd,
        discount_cad: item.discount_cad,
        added_by: item.added_by,
      }));

      setSheetData(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);

      // Increment draw for next request
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching discount sheet data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountSheets(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // Dropdown action handlers
  const handleDiscountSheet = (row) =>
    alert(`Open Discount Sheet for ID ${row.id}`);
  const handleDiscountDetail = (row) =>
    alert(`View Discount Detail for ID ${row.id}`);
  const handleEmailSheet = (row) =>
    alert(`Email Discount Sheet for ID ${row.id}`);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) setOpenRowId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Table Columns
  const tableColumns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "100px" },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
      width: "200px",
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
      width: "200px",
    },
    {
      name: "Discount_Cent",
      selector: (row) => row.discount_percent,
      sortable: true,
      width: "200px",
    },
    {
      name: "Discount_For",
      selector: (row) => row.discount_for,
      sortable: true,
      width: "200px",
    },
    {
      name: "Litre",
      selector: (row) => row.litre,
      sortable: true,
      width: "150px",
    },
    {
      name: "Gallons",
      selector: (row) => row.gallons,
      sortable: true,
      width: "150px",
    },
    {
      name: "Discount (USD)",
      selector: (row) => row.discount_usd,
      sortable: true,
      width: "200px",
    },
    {
      name: "Discount (CAD)",
      selector: (row) => row.discount_cad,
      sortable: true,
      width: "200px",
    },
    {
      name: "Added By",
      selector: (row) => row.added_by,
      sortable: true,
      width: "150px",
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
                minWidth: 180,
                padding: "5px 0",
              }}
            >
              <button
                className="dropdown-item d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleDiscountSheet(row)}
              >
                <FaFileAlt /> Discount Sheet
              </button>
              <button
                className="dropdown-item d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleDiscountDetail(row)}
              >
                <FaClipboardList /> Discount Sheet Detail
              </button>
              <button
                className="dropdown-item d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEmailSheet(row)}
              >
                <FaEnvelope /> Email Discount Sheet
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

  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="Manage Discount Sheet" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Discount Sheet" />
              <CardBody>
                <DiscountSheetForm btnTitle="Create" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Discount Sheet List"
          tableColumns={tableColumns}
          tableData={sheetData}
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

export default DiscountSheetPage;
