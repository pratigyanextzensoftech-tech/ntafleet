import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { user_tracking } from "../../../api/index";

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
      { key: "ip", label: "IP" },
      { key: "country", label: "Country" },
      { key: "city", label: "City" },
      { key: "menu", label: "Menu" },
      { key: "link", label: "Link" },
      { key: "type", label: "Type" },
      { key: "dated", label: "Dated" },
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

      const res = await axios.get(user_tracking, { params });

      const responseData = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      const tableData = responseData.map((item, index) => ({
        sno: start + index + 1,
        username: item.username || item.user_name || "Ram Gopal",
        ip: item.user_ip || "N/A",
        country: item.country || "",
        city: item.city || " ",
        menu: item.menu_name,
        link: item.menu_link,
        type: item.type,
        dated: item.dated,
      }));

      setData(tableData);
      setTotalRows(res.data.recordsTotal || res.data.total || responseData.length);
      setDraw((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error fetching track visitor data:", error);
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
      <Breadcrumbs parent="Setting" title="Track Visitors" />
      <Container fluid={true}>
        <DataTableComponent
          title="Track Visitors"
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
