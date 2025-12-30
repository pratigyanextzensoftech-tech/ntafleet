import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export default function usePaginatedTable({
  apiUrl,
  columnsMap,
  initialFilters = {},
  tax,
  invoiceType,
  perPageValue
}) {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(perPageValue||10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const fetchData = async (page = 1, per = perPage, filterData = filters) => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl, {
        params: {
          draw: page,
          start: (page - 1) * per,
          length: per,
          ...filterData,
          tax,
          invoiceType,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      const apiData = res.data?.data || [];

      // ✅ Preserve full API row
      const mapped = apiData.map((row) => {
        const newRow = { fulldata: row,source: apiUrl, };
        Object.keys(columnsMap).forEach((key) => {
              if (key === "Invoice#")
             {
                newRow[key] = row.tp==="Rack"?row.invoice_type+`-${row[columnsMap[key]]}`:'NTA'+`-${row[columnsMap[key]]}`; // ✅ change here
              }
              else 
              {
                 newRow[key] = row[columnsMap[key]];
              }
        });
        return newRow;
      });

      setData(mapped);
      setTotalRows(res.data?.recordsTotal || mapped.length);
      console.log("FILTERS SENT 👉", filterData);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage, filters);
  }, [currentPage, perPage, filters, tax, invoiceType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
const handleFormSearch = (formData) => {
  setFilters(formData);     // full payload from form
  setCurrentPage(1);
};

const handleColumnSearch = (field, value) => {
  setFilters((prev) => {
    if (!value) {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    }
    return {
      ...prev,
      [field]: value,
    };
  });
  setCurrentPage(1);
};
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

 



  return {
    data,
    totalRows,
    loading,
    handlePageChange,
    handlePerRowsChange,
 handleFormSearch,
  handleColumnSearch,
    setData,
    
    fetchData,
  };
}
