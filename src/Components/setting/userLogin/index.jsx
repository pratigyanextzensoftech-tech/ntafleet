import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap";
import axios from "axios";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { user_log } from "../../../api/index";

const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination states
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);

  // ✅ Define table columns
  useEffect(() => {
    const columns = [
      { key: "sno", label: "S.No" },
      { key: "username", label: "Username" },
      { key: "login_ip", label: "Login IP" },
      { key: "address", label: "Address" },
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "city", label: "City" },
      { key: "login_status", label: "Login Status" },
      { key: "login_time", label: "Login Time" },
      { key: "logout_time", label: "Logout Time" },
      { key: "date", label: "Date" },
    ].map((col) => ({
      name: col.label,
      selector: (row) => row[col.key],
      sortable: true,
      wrap: true,
    }));

    setTableColumns(columns);
  }, []);

  // ✅ Fetch paginated API data
  const fetchData = async (page = 1, perPage = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const length = perPage;

      const params = { draw, start, length };
      const res = await axios.get(user_log, { params });

      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const tableData = responseData.map((item, index) => ({
        sno: item.id,
        username: item.username || item.user_name || "Ram Gopal",
        login_ip: item.ip || "N/A",
        address: item.full_address || "N/A",
        country: item.country || "N/A",
        state: item.state || "N/A",
        city: item.city || "N/A",
        login_status: item.login_status || "N/A",
        login_time: item.s_start || "N/A",
        logout_time: item.s_end ,
        date: item.dated,
      }));

      setData(tableData);
      setTotalRows(res.data.recordsTotal || res.data.total || responseData.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching user log data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [perPage]);

  // ✅ Pagination handlers
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
      <Breadcrumbs parent="Setting" title="User Login Log" />
      <Container fluid={true}>
        <HeaderCard title="User Login Log" />
        <DataTableComponent
          title="User Login Log"
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
