import React, { Fragment,useEffect,useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import { dummytabledata, tableColumns } from "../../../Data/Table/Defaultdata";
import ZeroDiscount from "./ZeroDiscount";
import {zero_discount} from '../../../api/index'
import usePaginatedTable from "../../../Hooks/usePagination";
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';
const Index = () => {
   const [tableColumns, setTableColumns] = useState([]);
  
    const columnsMap = {
      "Id #": "id",
      "	Location #": "loc_id",
      "	State": "state",
      "	City": "city",
      "	Supplier": "supplier_id",
      "	Added_On": "dated",
      "Added_By": "idby",
    };
     const {
        data,
        totalRows,
        loading,
        handlePageChange,
        handlePerRowsChange,
        handleSearch, // ✅ Added
        setData,
        fetchData
      } = usePaginatedTable({ apiUrl: zero_discount, columnsMap });
       const [openRowId, setOpenRowId] = useState(null);
      
      
        useEffect(() => {
          const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-action")) {
              setOpenRowId(null);
            }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);
        const handleChange = (id, field, value) => {
          setData((prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, [field]: value } : item
            )
          );
      
      
        };
         useEffect(() => {
    const cols = Object.keys(columnsMap).map((key) => ({
      name: key,
      selector: (row) => row[key],
      sortable: true,
      wrap: true,
    }));

   

    // ✅ Add Actions column at the end
    cols.push({
      name: "Action",
      cell: (row) => (
        <div className="position-relative dropdown-action">
          <button
            className="btn btn-sm btn-primary px-2"
            onClick={() => setOpenRowId(openRowId === row["Id #"] ? null : row[ "Id #"])}
          >
            Action
          </button>

          {openRowId === row[ "Id #"] && (
            <div
              className="position-absolute bg-white border rounded shadow"
              style={{
                zIndex: 1000,
                right: 0,
                marginTop: 5,
                minWidth: 180,
                padding: "5px 0",
              }}
            >
                      
  <button
                className="dropdown-item d-flex align-items-center text-success"
                style={{ padding: "8px 12px", gap: "8px" }}
                onClick={(e) => handleDelete(e,row)}
              >
                <FaEdit /> Edit
              </button>
              {/* Delete */}
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
    });

    setTableColumns(cols);
  }, [openRowId]);

  // ✅ Action handlers
  const handleEdit = (row) => alert("Edit " + row.id);

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
        axios.delete(`${zero_discount}/${row[ "Id #"]}`)
          .then((res) => {
            setData((prevData) => {
  prevData.forEach((item) => console.log("Existing item id:", item.id)); // ✅ print each item id
  return  prevData.filter((item) => item[ "Id #"] !== row[ "Id #"]);
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
  const refreshTable=()=>{
    fetchData()
  }
  return (
    <Fragment>
      <Breadcrumbs parent="Discount" title="TA-Petro Zero Discount Location" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Add TA-Petro Zero Discount Location" />
              <CardBody>
                <ZeroDiscount btnTitle="Save Location" onDataAdded={refreshTable}/>
              </CardBody>
            </Card>
          </Col>
        </Row> 
        <DataTableComponent
          title="TA-Petro Location List  "
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
      </Container>
    </Fragment>
  );
};

export default Index;
