import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  FaDownload,
  FaTrash,
  FaEye,
  FaFilePdf,
  FaEnvelope,
  FaEnvelopeOpenText,
   FaTrashAlt,
  FaFileExcel,
  FaFileCsv,
} from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export default function useSelectableColumns(download_link, USEFOR = "",checkboxTitle) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  
  const [openRowId, setOpenRowId] = useState(null);

  /* =======================
     Outside Click Close
  ======================== */
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".dropdown-action");
      let clickedInside = false;
      dropdowns.forEach((d) => {
        if (d.contains(event.target)) clickedInside = true;
      });
      if (!clickedInside) setOpenRowId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =======================
     Helpers
  ======================== */
  const formatDate = (value, withTime = false) => {
    if (!value) return "";
    const format = withTime ? "DD-MM-YYYY HH:mm" : "YYYY-MM-DD";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "";
  };

  /* =======================
     Filtering Logic
  ======================== */
  const getFilteredData = (data = []) => {
    if (!Object.keys(filters).length) return data;

    return data.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const cellValue =
          key === "Date" ? formatDate(row[key]) : row[key];
        return String(cellValue ?? "")
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  };

  /* =======================
     Checkbox Logic
  ======================== */
  const handleSelectAll = (checked, data) => {
    setSelectAll(checked);
    if (!checked) {
      setSelectedRows([]);
      return;
    }
    console.log(data)
    const ids = data.map((row) => row.id);
    setSelectedRows(ids);
  };

  const handleSelectRow = (row) => {
    const id = row.id;
    const exists = selectedRows.includes(id);

    const updated = exists
      ? selectedRows.filter((x) => x !== id)
      : [...selectedRows, id];

    setSelectedRows(updated);
  };

  /* =======================
     Download Handler
  ======================== */
  function Download  (row, TYPE)  {
        console.log(row);
        
    switch (USEFOR) {
      case "REPORT":
        
        window.open(`${download_link}/${row.Report_ID}/${TYPE}`, "_self");
        break;
      case "OWNER_REPORT":
        window.open(`${download_link}/${row.id}/${TYPE}`, "_self");
        break;
      default:
        alert("Invalid Download Type");
    }
    setOpenRowId(null);
  };

  /* =======================
     Create Columns
  ======================== */
  const createColumns = (map, data = [], options = {}) => {
    const { withCheckbox = false, withActions = false, onDelete, onDownload } =
      options;

    const cols = Object.keys(map)
      .filter((key) => key !== "id")
      .map((key) => ({
        name: (
          <div>
            <div className="fw-bold">{key}</div>
            <input
              type="text"
              value={filters[key] || ""}
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
            />
          </div>
        ),
       selector: (row) => {
  const value = row[key];

  if (key === "Date" && value) {
    return formatDate(value);
  }
  if (key === "Pricing Date" && value) {
    return value.split("T")[0];
  }

  return value ?? "";
}

         ,
        sortable: true,
        wrap: true,
      }));

    /* =======================
       Checkbox Column
    ======================== */
    if (withCheckbox) {
      cols.push({
        name: (
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">{checkboxTitle?checkboxTitle:"Action"}</span>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) =>
                handleSelectAll(e.target.checked, getFilteredData(data))
              }
            />
          </div>
        ),
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row)}
          />
        ),
        width: "120px",
        ignoreRowClick: true,
        button: true,
      });
    }

    /* =======================
       Actions Column
    ======================== */
    if (withActions) {
      cols.push({
        name: "Action",
        cell: (row) => (
          <div className="position-relative dropdown-action ">
            <button
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                setOpenRowId(openRowId === row.id ? null : row.id);
              }}
            >
              Actions
            </button>

            {openRowId === row.id && (
              <div   className="position-absolute bg-white border rounded shadow mb-3"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 140,
                padding: "12px 12px",
              }}>        
                  <Link
                              // to={`/viewInvoice/ViewPdf/${btoa(row.id)}`}
                              to={row.fulldata.download_link }
                               target="_blank"
                              // state={{ downloadLinkUrl: row.fulldata.download_link }}
                              className="dropdown-item d-flex  text-success mb-2"
                            >
                              <FaEye /> View Pdf 
                            </Link>
                              <Link
                              to={`/viewInvoice/ViewPdf/${btoa(row.id)}`}
                              state={{ downloadLinkUrl: row.fulldata.download_link }}
                              className="dropdown-item d-flex  text-info mb-2"
                            >
                              <FaFilePdf /> View  Admin PDF
                            </Link>
               
                <button className="dropdown-item d-flex align-items-center text-danger mb-2">
                  <FaEnvelope /> Email Pricing PDF
                </button>
                <button className="dropdown-item d-flex align-items-center text-primary mb-2">
                  <FaEnvelopeOpenText /> Test Email Pricing PDF
                </button>
              </div>
            )}
          </div>
        ),
        width: "220px",
        ignoreRowClick: true,
        button: true,
      });
    }

    /* =======================
       Download Column
    ======================== */
    if (onDownload) {
      cols.push({
            name: (
          <div className="position-relative dropdown-action">
            <div className="fw-bold text-start">Download</div>
            <input
              type="text"
              className="mt-2"
              style={{
                width: "100%",
                height: "28px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  "Download": e.target.value,
                }))
              }
            />
          </div>
        ),
        cell: (row) => (
 <div className="position-relative dropdown-action ">
  <button
    className="btn btn-sm btn-primary"
    onClick={(e) => {
      e.stopPropagation();
      setOpenRowId(openRowId === row.id ? null : row.id);
    }}
  >
    <FaDownload /> Download
  </button>

  {openRowId === row.id && (
    <div
      className="position-absolute border rounded shadow bg-white"
      style={{
        top: "100%",
        right: 0,
        marginTop: "6px",
        minWidth: 160,
        zIndex: 1000,
        padding: "8px 0",
      }}
    >
      <button
        className="dropdown-item d-flex text-success p-2" onClick={() => Download(row, "EXCEL")}
      >
        <FaFileExcel /> Download EXCEL
      </button>

      <button className="dropdown-item d-flex text-info p-2" onClick={() => Download(row, "CSV")}
      >
        <FaFileCsv /> Download CSV
      </button>

     
      <button 
       className="dropdown-item d-flex text-primary p-2" onClick={() => Download(row, "PDF")}>

        <FaFilePdf /> Download PDF
      </button>
    </div>
  )}
</div>




          // <button
          //   className="btn btn-primary d-flex align-items-center gap-1"
          //   onClick={() => Download(row, "EXCEL")}
          // >
          //   Download <IoMdDownload />
          // </button>
        ),
        width: "180px",
        ignoreRowClick: true,
        button: true,
      });
    }

    /* =======================
       Delete Column
    ======================== */
    if (onDelete) {
      cols.push({
        name: "Delete",
        cell: (row) => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
            <FaTrash /> Delete
          </button>
        ),
        width: "150px",
        ignoreRowClick: true,
        button: true,
      });
    }

    return cols;
  };

  return {
    selectedRows,
    selectAll,
    filters,
    setFilters,
    createColumns,
    getFilteredData,
  };
}
