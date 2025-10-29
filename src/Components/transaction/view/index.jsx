import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { transactions } from "../../../api";
import ViewForm from "./ViewForm";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import qs from "qs"; // npm install qs
const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState({});

  const [totals, setTotals] = useState({
    taxamt: 0,
    amtcad: 0,
    qtyltr: 0,
    qtygln: 0,
    amtusd: 0,
    fee: 0,
    amtreal: 0,
  });

  // ✅ Column mapping between UI and API
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
    Currency: "currency",
  };

  const fetchTotals = async () => {
    try {
      const response = await axios.get(
        `https://api.ntafleetsolutions.com/api/transactions/totals`
      );
      setTotals({
        taxamt: Number(response.data.taxamt || 0),
        amtcad: Number(response.data.amtcad || 0),
        qtyltr: Number(response.data.qtyltr || 0),
        qtygln: Number(response.data.qtygln || 0),
        amtusd: Number(response.data.amtusd || 0),
        fee: Number(response.data.fee || 0),
        amtreal: Number(response.data.amtreal || 0),
      });
    } catch (error) {
      console.error("Error fetching totals:", error);
      setTotals({
        taxamt: 0,
        amtcad: 0,
        qtyltr: 0,
        qtygln: 0,
        amtusd: 0,
        fee: 0,
        amtreal: 0,
      });
    }
  };

  // ✅ Build column definitions for DataTable
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
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
        ...filtersData, // include filters
      };

      const response = await axios.get(transactions, {
        params: {
          draw: page,
          start: (page - 1) * perPage,
          length: perPage,
          ...filters, // this includes supplier_id: [...]
        },
        paramsSerializer: (params) =>
          qs.stringify(params, {
            arrayFormat: "repeat", // ✅ supplier_id=ESSO MOBIL&supplier_id=EXXON
          }),
      });

      const res = response.data;

      console.log("✅ API response:", res);

      const apiData = res.data || [];
      setTotalRows(res.recordsTotal || res.total || apiData.length);
      setDraw(draw + 1);

      // ✅ Map API fields to UI fields
      const tableData = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((col) => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || row.card_no || Math.random();
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
    fetchTotals();
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
    console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchData(1, perPage, formData); // fetch new data immediately
  };

  const stickyColumns = tableColumns.map((col, index) => {
    if (index === 0) {
      return {
        ...col,
        style: {
          position: "sticky",
          left: 0,
          background: "#f9f9f9",
          zIndex: 2,
        },
      };
    }
    if (index === tableColumns.length - 1) {
      return {
        ...col,
        style: {
          position: "sticky",
          right: 0,
          background: "#f9f9f9",
          zIndex: 2,
        },
      };
    }
    return col;
  });

  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title="View Transaction" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <ViewForm
                  btnTitle="Search Data"
                  btnTitle1="Reset"
                  onSearch={handleSearch}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Transactions List"
          totalData={totals}
          tableData={data}
          tableColumns={stickyColumns}
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
