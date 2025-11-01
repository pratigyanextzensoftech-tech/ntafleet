import { useState } from "react";
import dayjs from "dayjs";
import { FaDownload, FaTrash } from "react-icons/fa";

export default function useSelectableColumns() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const formatDate = (value, withTime = true) => {
    if (!value) return "-";
    const format = withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
  };

  const handleSelectAll = (checked, data) => {
    setSelectAll(checked);
    if (checked) setSelectedRows(data.map((row) => row.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  const createColumns = (map, data = [], options = {}) => {
    const { withCheckbox = false, withActions = false, onDelete, onDownload } = options;
console.log(withActions,"action")
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
            <span className="me-2 fw-bold">Action</span>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked, data)}
            />
          </div>
        ),
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
          />
        ),
        width: "120px",
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      });
    } 
    // ✅ Actions Dropdown (if needed)
    else if (withActions) {
      cols.push({
        name: "Action",
        cell: (row) => (
          <div className="d-flex align-items-center gap-3">
           
              <span
                className="text-primary d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => onDownload(row)}
              >
                <FaDownload className="me-1" /> View Pdf
              </span>
          
           
              <button
                className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                onClick={() => onDelete(row)}
              >
                <FaTrash /> View Admi  Pdf
              </button>
                <button
                className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                onClick={() => onDelete(row)}
              >
                <FaTrash /> Email Pricing Pdf
              </button>
                <button
                className="btn btn-sm btn-danger d-flex align-items-center gap-1"
                onClick={() => onDelete(row)}
              >
                <FaTrash /> Testing Email  Pricing Pdf
              </button>
          
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
            <span
              className="text-primary d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => onDownload(row)}
            >
              <FaDownload className="me-1" /> Download
            </span>
          ),
          width: "150px",
          ignoreRowClick: true,
          allowOverflow: true,
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
