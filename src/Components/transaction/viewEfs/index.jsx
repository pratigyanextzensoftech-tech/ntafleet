import React, { Fragment, useState,useEffect,useRef } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import { transactions_efs } from "../../../api";
import axios from "axios";
import qs from "qs"; // npm install qs
import ViewEfs from "./ViewEfs";
import Swal from "sweetalert2";
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
    Qty: "qty",
    Qty: "qty",
    Amt: "amt",
    TaxAmt: "amt",
    Currency: "currency",
  };
  

 

  // ✅ Build column definitions for DataTable
  useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

    // ✅ Add Actions column at the end
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
     
      const response = await axios.get(transactions_efs, {
      params: {
        draw: page,
        start: (page - 1) * perPage,
        length: perPage,
        ...filtersData, // this includes supplier_id: [...]
      },
      paramsSerializer: (params) =>
        qs.stringify(params, {
          arrayFormat: "repeat", // ✅ supplier_id=ESSO MOBIL&supplier_id=EXXON
        }),
    });
       
  
      const res = response.data;

      console.log("✅ API response:", res);

      const apiData = res.data || [];
      setTotalRows(res.recordsTotal || res.total || apiData.length);
      setDraw(draw + 1);

      // ✅ Map API fields to UI fields
      const tableData = apiData.map((row) => {
        const newRow = {};
        Object.keys(columnsMap).forEach((col) => {
          newRow[col] = row[columnsMap[col]];
        });
        newRow.id = row.id || row.card_no || Math.random();
        return newRow;
      });

      setData(tableData);
    } catch (error) {
      console.error("❌ Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchData(currentPage, perPage, filters);
     
  }, [perPage]);
  const handleEdit = async (e, row) => {
    console.log(row)
//   try {
//     const response = await axios.get(`${esso_transactions}/${row.id}`);
// console.log(response.data)
//     setSelectedRow(response.data);
//     setEdit(true);

//     const encodedId = btoa(row.id); // encode ID

//     navigate(`/edit-unknown/${encodedId}`, {
//       state: { data: response.data }
//     });

//   } catch (error) {
//     console.error("Error fetching full row data", error);
//   }
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
        axios.delete(`${transactions_efs}/${row.id}`)
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
  // ✅ Page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, perPage, filters);
  };

  // ✅ Rows per page change
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
    fetchData(page, newPerPage, filters);
  };



  // ✅ Handle search/filter submit from form
  const handleSearch = (formData) => {
    console.log("🔍 Filters received:", formData);
    setFilters(formData); // save filters
    setCurrentPage(1); // reset to first page
    fetchData(1, perPage, formData); // fetch new data immediately
  };

  
  // const stickyColumns = tableColumns.map((col, index) => {
  //   if (index === 0) {
  //     return { ...col, style: { position: "sticky", left: 0, background: "#f9f9f9", zIndex: 2 } };
  //   }
  //   if (index === tableColumns.length - 1) {
  //     return { ...col, style: { position: "sticky", right: 0, background: "#f9f9f9", zIndex: 2 } };
  //   }
  //   return col;
  // });

  return (
    <Fragment>
      <Breadcrumbs parent="Transaction" title=" EFS Transactions List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filters" />
              <CardBody>
                <ViewEfs btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <DataTableComponent
          title="EFS Transactions List " 
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
