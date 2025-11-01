import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export default function usePaginatedTable({ apiUrl, columnsMap, initialFilters = {} }) {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          draw: page,
          start: (page - 1) * perPage,
          length: perPage,
          ...filtersData,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      const res = response.data;
      const apiData = res.data || [];

      const mapped = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((key) => {
          newRow[key] = row[columnsMap[key]];
        });
        return newRow;
      });

      setData(mapped);
      setTotalRows(res.recordsTotal || res.total || mapped.length);
      setDraw(draw + 1);
    } catch (err) {
      console.error("❌ Error fetching table data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage, filters);
  }, [perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage, filters);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage, filters);
  };

  const handleSearch = (formData) => {
    setFilters(formData);
    setCurrentPage(1);
    fetchData(1, perPage, formData);
  };

  return {
    data,
    totalRows,
    perPage,
    currentPage,
    loading,
    handlePageChange,
    handlePerRowsChange,
    handleSearch,
    fetchData,
    setData,
  };
}
