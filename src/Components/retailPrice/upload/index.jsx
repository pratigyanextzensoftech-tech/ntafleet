import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import axios from "axios";
import { retail_price } from "../../../api";
import Upload from "./Upload";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState({});

  // ✅ Column mapping between UI and API
  const columnsMap = {
    Location: "location",
    City: "city_town",
    Province: "province",
    Country: "country",
    RetailPrice: "retail_price",
    UploadDate: "date",
  };

  // ✅ Build column definitions for DataTable
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: key, // use string selector for wrapper component
      sortable: true,
      wrap: true,
    }));

    // ✅ Add Actions column at the end
    cols.push({
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <FaEdit
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          />
          <FaSignInAlt
            color="green"
            style={{ cursor: "pointer" }}
            onClick={() => handleLogin(row)}
          />
          <FaTrashAlt
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });

    setTableColumns(cols);
  }, []);

  // ✅ Fetch paginated + filtered data
  const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;

      const params = {
        draw,
        start,
        length,
        ...filtersData,
      };

      const response = await axios.get(retail_price, { params });
      const res = response.data;

      // console.log("✅ API response:", res);

      const apiData = res.data || [];
      setTotalRows(res.recordsTotal || res.total || apiData.length);
      setDraw(draw + 1);

      // Map API fields to UI fields
      const tableData = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((col) => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || Math.random();
        return newRow;
      });

      setData(tableData);
    } catch (error) {
      console.error("❌ Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage, filters);
  }, [perPage]);

  // ✅ Page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage, filters);
  };

  // ✅ Rows per page change
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage, filters);
  };

  // ✅ Action handlers
  const handleEdit = (row) => alert("Edit " + row.id);
  const handleLogin = (row) => alert("Login " + row.id);
  const handleDelete = (row) => alert("Delete " + row.id);

  // ✅ Handle search/filter submit from form
  const handleSearch = (formData) => {
    setFilters(formData);
    setCurrentPage(1);
    fetchData(1, perPage, formData);
  };


  console.log({data});
  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Upload Retail Prices" />
      <Container fluid={true}>
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
          tableData={data}
          columns={tableColumns}
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
