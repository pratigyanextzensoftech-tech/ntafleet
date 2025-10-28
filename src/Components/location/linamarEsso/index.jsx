import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import LinamarForm from './LinamarForm';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaSignInAlt } from 'react-icons/fa';
import { linamar_esso_loc } from '../../../api/index';

const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState({});
  const [openRowId, setOpenRowId] = useState(null);

  const columnsMap = {
  "ID": "id",
  "Esso Location": "esso_location",
  "Flying J Location": "fj_location",
  "Flying J Site ID": "site_id",
  "Flying J Location ID": "loc_id",
};

  const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
    setLoading(true);
    try {
      const start = (page - 1) * perPage;
      const params = { draw, start, length: perPage, ...filtersData };
      const response = await axios.get(linamar_esso_loc, { params });
      const res = response.data;
      const apiData = res.data || [];

      const tableData = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((col) => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || Math.random();
        return newRow;
      });

      setData(tableData);
      setTotalRows(res.recordsTotal || res.total || tableData.length);
      setDraw(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching Linamar data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage, perPage, filters);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleEdit = (row) => console.log("Edit", row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete Location "${row.EssoLocation}"?`)) {
      setData(prev => prev.filter(item => item.id !== row.id));
      // call API delete if needed
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-action")) {
        setOpenRowId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Table Columns
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    // Actions column with dropdown
    cols.push({
      name: "Actions",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row.id ? null : row.id)}
          >
            Action
          </button>

          {openRowId === row.id && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 120, padding: "5px 0" }}
            >
              <button
                className="dropdown-item d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleEdit(row)}
              >
                <FaEdit /> Edit
              </button>
             
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={() => handleDelete(row)}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "160px",
    });

    setTableColumns(cols);
  }, [openRowId]);

  return (
    <Fragment>
      <Breadcrumbs parent='Location' title='Manage Linamar Esso Location' />
      <Container fluid={true}>
        <HeaderCard title="Manage Linamar Esso Location" />
        <LinamarForm />
        <div className='my-3'>
          <DataTableComponent
            title="Linamar Esso Location List"
            tableColumns={tableColumns}
            tableData={data}
            progressPending={loading}
            pagination
            paginationServer
            loading={loading}
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Index;
