import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import { retail_price } from "../../../api";
import Upload from "./Upload";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";

const RetailPrice = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // ✅ Define columns like working Company file
  useEffect(() => {
    const columns = [
      { key: "location", label: "Location" },
      { key: "city_town", label: "City" },
      { key: "province", label: "Province" },
      { key: "country", label: "Country" },
      { key: "retail_price", label: "Retail Price" },
      { key: "date", label: "Upload Date" },
    
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

  // ✅ Fetch data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;
      const params = { draw, start, length };

      const res = await axios.get(retail_price, { params });
      const apiData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const formattedData = apiData.map((item, index) => ({
        id: item.id || index + 1,
        location: item.location,
        city_town: item.city_town,
        province: item.province,
        country: item.country,
        retail_price: item.retail_price,
        date: item.date,
      }));

      setData(formattedData);
      setTotalRows(res.data.recordsTotal || res.data.total || apiData.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching retail data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage);
  };

  const handleEdit = (row) => alert(`Edit: ${row.id}`);
  const handleLogin = (row) => alert(`Login: ${row.id}`);
  const handleDelete = (row) => {
    if (window.confirm(`Delete "${row.location}"?`)) {
      setData(data.filter((item) => item.id !== row.id));
      setOpenRowId(null);
    }
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

  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Upload Retail Prices" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Manage Retail Prices" />
              <CardBody>
                <Upload btnTitle="Add Item" />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Retail Price List"
          loading={loading}
          tableColumns={tableColumns}
          tableData={data}
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

export default RetailPrice;
