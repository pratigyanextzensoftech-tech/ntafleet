import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumbs } from '../../../AbstractElements';
import { Container } from 'reactstrap';
import HeaderCard from '../../Common/Component/HeaderCard';
import AddItems from './AddItems';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { items } from '../../../api'; // API endpoint

const Index = () => {
  const [Items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [openRowId, setOpenRowId] = useState(null);

  // Fetch Items API with server-side pagination
  const fetchItems = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit };

      const res = await axios.get(items, { params });
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;

      const formatted = data.map((item, index) => ({
        id: item.id || start + index + 1,
        name: item.item_name,
        discount: item.discount_applied,
        tax: item.tax_applied,
      }));

      setItems(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);
      setDraw(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(currentPage, perPage);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleEdit = (row) => console.log("Edit Item:", row);
  const handleDelete = (row) => {
    if (window.confirm(`Delete Item "${row.name}"?`)) {
      setItems(prev => prev.filter(item => item.id !== row.id));
      // call delete API if needed
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

  // Table columns
  const tableColumns = [
    { name: "Item ID", selector: row => row.id, sortable: true },
    { name: "Item Name", selector: row => row.name, sortable: true },
    { name: "Discount Applied", selector: row => row.discount, sortable: true },
    { name: "Tax Applied", selector: row => row.tax, sortable: true },
    {
      name: "Action",
      cell: row => (
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
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs parent='Items' title='Manage Item' />
      <Container fluid={true}>
        <HeaderCard title="Manage Item" />
        <div style={{ border: "1px solid #ccc", padding: "5px 5px", borderRadius: "3px", marginBottom: "10px" }}>
          <div className='bg-primary p-2 my-3'>
            <HeaderCard title="Add Items" />
          </div>      
          <AddItems btnTitle="Add Item"/>   
        </div>

        <DataTableComponent
          title="Items List"
          tableColumns={tableColumns}
          tableData={Items}
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
