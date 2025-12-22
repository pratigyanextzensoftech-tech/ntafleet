import { useState,useEffect } from "react";
import dayjs from "dayjs";
import {
  FaDownload,
  FaTrash,
  FaFilePdf,
  FaEnvelope,
  FaEnvelopeOpenText,
} from "react-icons/fa";

import { IoMdDownload } from "react-icons/io";
export default function useSelectableColumns(download_link,USEFOR="") {

  //console.log("report_new_downlod =",report_new_downlod);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
    const [openRowId, setOpenRowId] = useState(null); // ✅ added
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll(".dropdown-action");
      let clickedInside = false;
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) clickedInside = true;
      });
      if (!clickedInside) setOpenRowId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // ✅ Dummy handlers (replace later with real ones)
  const handleViewPdf = (row) => {
    console.log("View PDF clicked for:", row);
  };

  const handleAdminPdf = (row) => {
    console.log("View Admin PDF clicked for:", row);
  };

  const handleEmailPdf = (row) => {
    console.log("Email PDF clicked for:", row);
  };

  const handleTestEmailPdf = (row) => {
    console.log("Test Email PDF clicked for:", row);
  }
  const Download=(data,TYPE)=>
  {
      switch(USEFOR)
      { 
          case("REPORT"):
            window.open(`${download_link}/${data["Report_ID"]}/${TYPE}`, "_self"); 
            break;
          case("OWNER_REPORT"):
            window.open(`${download_link}/${data["id"]}/${TYPE}`, "_self"); 
            break;
          default:
            alert("Default");
            break;
      }
      setOpenRowId(null);
  }

  const formatDate = (value, withTime = false) => {
    if (!value) return "-";
    const format = withTime ? "DD-MM-YYYY HH:mm" : "YYYY-MM-DD";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
  };
  
 const handleSelectAll = (checked, data) => {
  console.log(data)
  setSelectAll(checked);
  if (!checked) {
    setSelectedRows([]);
    return;
  }
  // 1️⃣ Create comma-separated string
  const ids = data?.map(row => row.id);
  setSelectedRows(ids); // store comma string if needed
};

 const handleSelectRow = (data) => {
  console.log(data)
const id=data.id
console.log(id)
  console.log(data.id)
  console.log(selectedRows)
  // 1️⃣ Toggle checkbox first
  const alreadySelected = selectedRows.includes(id);

  // Update selection immediately
  const newSelection = alreadySelected
    ? selectedRows.filter((rowId) => rowId !== id)
    : [...selectedRows, id];
  // const ids=newSelection.join(",")

  setSelectedRows(newSelection);
console.log(newSelection)
  // 2️⃣ Now show confirmation popup
 
};
  
  const createColumns = (map, data = [], options = {},) => {
    const { withCheckbox = false, withActions = false, onDelete, onDownload } = options; 
 
    const cols = Object.keys(map)
      .filter((key) => key !== "id")
      .map((key) => ({
        name: key,
        selector: (row) =>
          key === "Date" ? formatDate(row[key]) : row[key],
        sortable: true,
        wrap: true,
      }));

    // ✅ Checkbox Column
    if (withCheckbox) {
           cols.push({
        name: (
          <div className="d-flex align-items-center">
            <span className="me-2 fw-bold">Delete</span>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked, data?.data || data)}
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
        allowOverflow: true,
        button: true,
      });
    } 
    // ✅ Actions Dropdown (if needed)
   if (withActions) {
  cols.push({
    name: "Action",
    cell: (row) => (
      <div className="position-relative dropdown-action">
        {/* Toggle Button */}
        <button
          className="btn btn-sm btn-primary px-2"
          onClick={(e) => {
            e.stopPropagation();
            setOpenRowId(openRowId === row.id ? null : row.id);
          }}
        >
          Actions
        </button>

        {/* Dropdown Menu */}
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
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => handleViewPdf(row)}
            >
              <FaDownload /> View PDF
            </button>

            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => handleAdminPdf(row)}
            >
              <FaFilePdf /> View Admin PDF
            </button>

            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => handleEmailPdf(row)}
            >
              <FaEnvelope /> Email Pricing PDF
            </button>

            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => handleTestEmailPdf(row)}
            >
              <FaEnvelopeOpenText /> Testing Email Pricing PDF
            </button>
          </div>
        )}
      </div>
    ),
    width: "220px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });
}

    // ✅ Separate columns for Download & Delete
    else {
      if (onDownload) {
        cols.push({
    name: "Download",
    cell: (row) => (
      <div className="position-relative dropdown-action">
        {/* Toggle Button */}
        <button
          className="btn  btn-primary  d-flex align-items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            setOpenRowId(openRowId === row.id ? null : row.id);
          }}
        >
Download    <IoMdDownload />    </button>

        {/* Dropdown Menu */}
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
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => Download(row,'EXCEL')}
            >
              <FaDownload /> Download Excel
            </button>

            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => Download(row,'CSV')}
            >
              <FaFilePdf />Download CSV
            </button>

            <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => Download(row,'PDF')}
            >
              <FaEnvelope /> Download PDF
            </button>

            {/* <button
              className="dropdown-item d-flex align-items-center"
              style={{ padding: "8px 12px", gap: "8px" }}
              onClick={() => handleTestEmailPdf(row)}
            >
              <FaEnvelopeOpenText /> Testing Email Pricing PDF
            </button> */}
          </div>
        )}
      </div>
    ),
    width: "220px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  });
      }

      if (onDelete) {
        cols.push({
          name: "Delete",
          cell: (row) => (
            <button
              className="btn btn-sm btn-danger d-flex align-items-center gap-1"
              onClick={() => onDelete(row)}
            >
              <FaTrash /> Delete
            </button>
          ),
          width: "150px",
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        });
      }
    }

    return cols;
  };

  return {
    selectedRows,
    selectAll,
    handleSelectRow,
    handleSelectAll,
    createColumns,
  };
}
