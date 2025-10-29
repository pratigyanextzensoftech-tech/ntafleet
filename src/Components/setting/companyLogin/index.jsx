import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { company_log } from "../../../api"; // your API endpoint

const Index = () => {
  const [loginData, setLoginData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState([]);
  const [openRowId, setOpenRowId] = useState(null);

  // Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // Build table columns
  useEffect(() => {
    const columns = [
      { key: "srNo", label: "Sr No." },
      { key: "companyName", label: "Company Name" },
      { key: "userName", label: "User Name" },
      { key: "loginIp", label: "Login IP" },
      { key: "address", label: "Address" },
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "city", label: "City" },
      { key: "loginStatus", label: "Login Status" },
      { key: "loginTime", label: "Login Time" },
      { key: "logoutTime", label: "Logout Time" },
      { key: "date", label: "Date" },
    ].map((col) => ({
      name: col.label,
      selector: (row) => row[col.key],
      sortable: true,
      wrap: true,
    }));

    setTableColumns(columns);
  }, []);

  // Fetch paginated data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;
      const params = { draw, start, length };

      const res = await axios.get(company_log, { params });
      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const mappedData = responseData.map((item, index) => ({
        srNo: item.id,
        companyName: item.company_name,
        userName: item.user_name,
        loginIp: item.ip,
        address: item.full_address,
        country: item.country_name,
        state: item.state,
        city: item.city,
        loginStatus: item.login_status,
        loginTime: item.s_start,
        logoutTime: item.s_end,
        date: item.dated, // formatted date from backend
      }));

      setLoginData(mappedData);
      setTotalRows(res.data.recordsTotal || res.data.total || 0);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching login log data", error);
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

  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Company Login Log" />
      <Container fluid>
        <DataTableComponent
          title="Company Login Log"
          loading={loading}
          tableColumns={tableColumns}
          tableData={loginData}
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
