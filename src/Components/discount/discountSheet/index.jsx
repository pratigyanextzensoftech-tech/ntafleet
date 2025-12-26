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
  const [filters, setFilters] = useState({});
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);
  const [draw, setDraw] = useState(1);
   const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};
  const filteredData = sheetData.filter((row) =>
  Object.keys(filters).every((key) => {
    if (!filters[key]) return true;
    return (
      row[key] &&
      row[key].toString().toLowerCase().includes(filters[key])
    );
  })
);
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

const HeaderWithFilter = (label, key) => (
  <div style={{ width: "100%" }}>
    <div className="d-flex align-items-end">
      {label}
    </div>
    <input
      type="text"
      className="mt-1"
      style={{
        width: "100%",
        height: "28px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "2px 6px",
        fontSize: "12px",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onChange={(e) => handleFilterChange(key, e.target.value)}
    />
  </div>
);

  // Table Columns
  const tableColumns = [
    { name:HeaderWithFilter( "ID","id"), selector: (row) => row.id, sortable: true, width: "100px" },
    {
      name:HeaderWithFilter("Company Name","company_name") ,
      selector: (row) => row.company_name,
      sortable: true,
      width: "250px",
    },
    {
      name:HeaderWithFilter("Start Date","start_date") ,
      selector: (row) => row.start_date,
      sortable: true,
      width: "170px",
    },
    {
      name:HeaderWithFilter("End Date","end_date")  ,
      selector: (row) => row.end_date,
      sortable: true,
      width: "170px",
    },
    {
      name:HeaderWithFilter( "Discount_Cent","discount_percent"),
      selector: (row) => row.discount_percent,
      sortable: true,
      width: "150px",
    },
    {
      name:HeaderWithFilter( "Discount_For","discount_for"),
      selector: (row) => row.discount_for,
      sortable: true,
      width: "150px",
    },
    {
      name:HeaderWithFilter("Litre","litre") ,
      selector: (row) => row.litre,
      sortable: true,
      width: "110px",
    },
    {
      name:HeaderWithFilter("Gallons","gallons") ,
      selector: (row) => row.gallons,
      sortable: true,
      width: "110px",
    },
    {
      name:HeaderWithFilter("Discount (USD)","discount_usd") ,
      selector: (row) => row.discount_usd,
      sortable: true,
      width: "150px",
    },
    {
      name:HeaderWithFilter("Discount (CAD)","discount_cad") ,
      selector: (row) => row.discount_cad,
      sortable: true,
      width: "150px",
    },
    {
      name:HeaderWithFilter("Added By","added_by") ,
      selector: (row) => row.added_by,
      sortable: true,
      width: "130px",
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
const refreshTable=()=>{
  fetchDiscountSheets()
}
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="Manage Discount Sheet" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Discount Sheet" />
              <CardBody>
                <DiscountSheetForm btnTitle="Create" onDataAdded={refreshTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DataTableComponent
          title="Discount Sheet List"
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

export default DiscountSheetPage;
