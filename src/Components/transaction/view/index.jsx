import React, { Fragment, useState, useEffect,useRef } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import axios from "axios";
import { transactions,tranaction_total } from "../../../api";
import ViewForm from "./ViewForm";
import { FaEdit, FaTrashAlt, FaSignInAlt } from "react-icons/fa";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import qs from "qs"; // npm install qs
const ActionDropdown = ({ row, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="position-relative dropdown-action">
      <button
        className="btn btn-sm btn-primary px-2"
        onClick={() => setOpen(prev => !prev)}
      >
        Action
      </button>

      {open && (
        <div
          className="position-absolute bg-white border rounded shadow"
          style={{ zIndex: 1000, right: 0, marginTop: 5, minWidth: 120, padding: "5px 0" }}
        >
          <button
            className="dropdown-item d-flex align-items-center"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={() => onEdit(row)}
          >
            <FaEdit /> Edit
          </button>

          <button
            className="dropdown-item d-flex align-items-center text-danger"
            style={{ padding: "8px 12px", gap: "8px" }}
            onClick={(e) => onDelete(e, row)}
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      )}
    </div>
  );
};
const Index = () => {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [draw, setDraw] = useState(1);
  const [filters, setFilters] = useState({});
      const[Edit,setEdit]=useState(false)
  
const navigate = useNavigate();
const [selectedRow, setSelectedRow] = useState(null);
  const [totals, setTotals] = useState({
    taxamt: 0,
    amtcad: 0,
    qtyltr: 0,
    qtygln: 0,
    amtusd: 0,
    fee: 0,
    amtreal: 0,
  });

  // ✅ Column mapping between UI and API
const columnsMap = {
    CARD: "card_no",
    Company: "company_name",
    Suppliers: "supplier_name",
    Date: "tran_date",
    Time: "tran_time",
    Invoice: "invoice",
    Unit: "unit",
    Driver_Name: "driver_name",
    City: "city",
    State: "state_prov",
    Fees: "fees",
    Item: "item",
    Unit_Price: "unit_price",
    Tax_Unit_Price: "tax_unit_price",
    Qty: "qty",
    Amt: "amt",
    TaxAmt: "tax_amt",
    Currency: "currency",
  };

  const fetchTotals = async (formData) => {
    try {

       const response = await axios.get(tranaction_total, 
        {
        params: {...formData,},paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: "repeat" }),
       });



      // const response = await axios.get( tranaction_total,formData
      // );
      setTotals({
        taxamt: Number(response.data.taxamt || 0),
        amtcad: Number(response.data.amtcad || 0),
        qtyltr: Number(response.data.qtyltr || 0),
        qtygln: Number(response.data.qtygln || 0),
        amtusd: Number(response.data.amtusd || 0),
        fee: Number(response.data.fee || 0),
        amtreal: Number(response.data.amtreal || 0),
      });
    } catch (error) {
      console.error("Error fetching totals:", error);
      setTotals({
        taxamt: 0,
        amtcad: 0,
        qtyltr: 0,
        qtygln: 0,
        amtusd: 0,
        fee: 0,
        amtreal: 0,
      });
    }
  };

  useEffect(() => {
     const cols = Object.keys(columnsMap).map(key => ({
       name: key,
       selector: row => row[key],
       sortable: true,
       wrap: true,
       style: { padding: '8px 12px', fontWeight: 500 },
     }));
 
     // Add Actions column
     cols.push({
       name: "Actions",
       cell: row => (
         <ActionDropdown
           row={row}
           onEdit={(e)=>handleEdit(e,row)}
           onDelete={(e)=>handleDelete(e,row)}
         />
       ),
       ignoreRowClick: true,
       allowOverflow: true,
       button: true,
       width: "160px",
     });
 
     setTableColumns(cols);
   }, []);

  // ✅ Fetch paginated + filtered data
 const fetchData = async (page = 1, perPage = 10, filtersData = filters) => {
 setLoading(true);
    try {
      const response = await axios.get(transactions, {
        params: {
          draw: page,
          start: (page - 1) * perPage,
          length: perPage,
          ...filtersData,
        },
        paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      const res = response.data;
      const apiData = res.data || [];
      setTotalRows(res.recordsTotal || res.total || apiData.length);
      setDraw(draw + 1);

      const tableData = apiData.map(row => {
        const newRow = {};
        Object.keys(columnsMap).forEach(col => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || row.card_no || Math.random();
        return newRow;
      });

      setData(tableData);
      console.log(data,"data")
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage, filters);
    fetchTotals(filters);
  }, [currentPage,perPage]);

  // ✅ Page change
 const handlePageChange = page => {
    setCurrentPage(page);
    fetchData(page, perPage, filters);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage, filters);
  };

  const handleEdit = async (e, row) => {
    console.log(row)
  try {
    const response = await axios.get(`${transactions}/${row.id}`);

    setSelectedRow(response.data);
    setEdit(true);
    const encodedId = btoa(row.id); // encode ID
    navigate(`/edit-unknown/${encodedId}`, {
      state: { data: response.data }
    });

  } catch (error) {
    console.error("Error fetching full row data", error);
  }
};
const handleDelete = (e, row) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${transactions}/${row.id}`)
          .then(res => {
            setData(prev => prev.filter(item => item.id !== row.id));
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(err => {
            Swal.fire("Error!", "Failed to delete record.", "error");
            console.error(err);
          });
      }
    });
  };
  // ✅ Handle search/filter submit from form
  const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchData(1, perPage, formData); // fetch new data immediately
    fetchTotals(formData)
  };

  

  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title="View Transaction" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <ViewForm
                  btnTitle="Search Data"
                  btnTitle1="Reset"
                  onSearch={handleSearch}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="Transactions List"
          totalData={totals}
          tableData={data}
          tableColumns={tableColumns}
          loading={loading}
          downloadHeading="Download"
          download={true}
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
