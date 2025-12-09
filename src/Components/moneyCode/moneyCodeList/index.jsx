// ... other imports
import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from '../../../AbstractElements';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Container, Row, Card, Col, CardBody } from 'reactstrap';
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import MoneyCodeListForm from './MoneyCodeListForm';
import { Btn } from '../../../AbstractElements';
import axios from 'axios';
import { money_code } from '../../../api';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const Index = () => {
  const [moneyCodes, setMoneyCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [draw, setDraw] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters,setFilters]=useState({})
  const [selectAll, setSelectAll] = useState(false);
  const [openRowId, setOpenRowId] = useState(null);

  // Fetch API data
  const fetchMoneyCodes = async (page = 1, limit = 10,filtersData = filters) => {
    setLoading(true);
    try {
      const start = (page - 1) * limit;
      const params = { draw, start, length: limit,...filtersData };

      const res = await axios.get(money_code, { params });
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;

      const formatted = data.map((item, index) => ({
        id: item.id || index + 1,
        ref_no: item.Ref,
        company: item.company_name,
        name: item.Name,
        voided: item.Voided,
        issued_to: item.IssuedTo,
        issued_date: item.IssuedDate,
        original_amt: item.OriginalAmt,
        bill_date: item.BillDate,
        check_num: item.CheckNum,
        date_used: item.DateUsed,
        currency: item.Currency,
        status: item.status,
        notes: item.Notes,
      }));

      setMoneyCodes(formatted);
      setTotalRows(res.data.recordsTotal || res.data.total || data.length);
      setDraw(prev => prev + 1);
      setSelectedRows([]);
      setSelectAll(false);
      setOpenRowId(null); // close any open dropdown after fetching
    } catch (error) {
      console.error("Error fetching money codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoneyCodes(currentPage, perPage,filters);
  }, [currentPage, perPage]);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleEdit = (row) => console.log("Edit:", row);
 const handleDelete = (e,row) => {
  e.preventDefault()
            
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${money_code}/${row.id}`)
          .then((res) => {
            setMoneyCodes((prevData) => {
  prevData.forEach((item) => console.log("Existing item id:", item.id)); // ✅ print each item id
  return  prevData.filter((item) => item.id !== row.id);
});
            Swal.fire('Deleted!', 'Record deleted successfully.', 'success');
              console.log(res.data)

          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to delete record.', 'error');
            console.log(error)
          });
      }
    });
  }; 

  // Select all rows
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedRows(checked ? moneyCodes.map(row => row.id) : []);
  };

  // Select single row
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedRows, id];
      setSelectedRows(newSelected);
      if (newSelected.length === moneyCodes.length) setSelectAll(true);
    }
  };
const handleSearch=(formData)=>{
   console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchMoneyCodes(1, perPage, formData); // fetch new data immediately
}
  // Delete selected rows
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) return alert("No rows selected!");
    if (window.confirm(`Delete ${selectedRows.length} selected rows?`)) {
      setMoneyCodes(moneyCodes.filter(row => !selectedRows.includes(row.id)));
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  // ✅ Close dropdown when clicking outside
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

  // Table columns
  const tableColumns = [
    { name: "Ref#", selector: row => row.ref_no, sortable: true, width: "120px" },
    { name: "Company", selector: row => row.company, sortable: true, width: "150px" },
    { name: "Name", selector: row => row.name, sortable: true, width: "150px" },
    { name: "Voided", selector: row => row.voided, sortable: true, width: "100px" },
    { name: "Issued To", selector: row => row.issued_to, sortable: true, width: "150px" },
    { name: "Issued Date", selector: row => row.issued_date, sortable: true, width: "150px" },
    { name: "Original Amt", selector: row => row.original_amt, sortable: true, width: "150px" },
    { name: "Bill Date", selector: row => row.bill_date, sortable: true, width: "150px" },
    { name: "Check Num", selector: row => row.check_num, sortable: true, width: "150px" },
    { name: "Date Used", selector: row => row.date_used, sortable: true, width: "150px" },
    { name: "Currency", selector: row => row.currency, sortable: true, width: "100px" },
    { name: "Status", selector: row => row.status, sortable: true, width: "120px" },
    { name: "Notes", selector: row => row.notes, sortable: true, width: "200px" },
    {
      name: (
        <div>
          Delete
          <span className="px-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </span>
        </div>
      ),
      cell: row => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={() => handleSelectRow(row.id)}
        />
      ),
      width: "130px",
    },
    {
      key: "Action",
      label: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(row.id)} // always open clicked row
          >
            Action
          </button>

          {openRowId === row.id && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 150,
                padding: "5px 0",
              }}
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
                onClick={(e) => handleDelete(e,row)}
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
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Money Code" title="MoneyCode List" />
      <Container fluid={true}> 
          <Row>
            <Col sm="12">
              <Card>
                <HeaderCard title="Filter" />
                <CardBody>
                  <MoneyCodeListForm btntitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="MoneyCode List" />
              <CardBody>
                <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Selected</Btn>
                  <Btn attrBtn={{ color: "secondary", className: "ms-2" }}>Download Money Code</Btn>
                </div>
                <DataTableComponent
                  tableColumns={tableColumns}
                  tableData={moneyCodes}
                  loading={loading}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </Fragment>
  )
}

export default Index;
