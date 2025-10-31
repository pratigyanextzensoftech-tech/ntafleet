import React, { Fragment, useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { pricingListTableTab } from "../../../Data/tab/PricingListTableTab";
import { pricingListTab } from "../../../Data/tab/PricingListTab";
import { dummytabledata,tableColumns } from "../../../Data/Table/Defaultdata";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import Swal from 'sweetalert2';
import qs from "qs";
import axios from "axios";
import { FaFilePdf,FaFileExcel } from "react-icons/fa";
import { ta_pricing_actual as APINAME,ta_pricing,esso_pricing,love_pricing,love_pricing_actual,ul_pricing } from "../../../api";
import {
  FaDownload,
  FaEye,
  FaEnvelope,
  FaFileInvoice,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import usePaginatedTable from "../../../Hooks/usePagination";
const Index = () => {
   const [openRowId, setOpenRowId] = useState(null);
      const [tableColumns, setTableColumns] = useState([]);
   const [selectedRows, setSelectedRows] = useState([]);
const [selectAll, setSelectAll] = useState(false);

const handleSelectAll = (checked) => {
  setSelectAll(checked);
  if (checked) {
    setSelectedRows(data.map((item) => item.id)); // ✅ select all rows
  } else {
    setSelectedRows([]); // ✅ deselect all
  }
};

const handleSelectRow = (id) => {
  setSelectedRows((prevSelected) => {
    if (prevSelected.includes(id)) {
      const updated = prevSelected.filter((rowId) => rowId !== id);
      setSelectAll(false);
      return updated;
    } else {
      const updated = [...prevSelected, id];
      if (updated.length === data.length) setSelectAll(true);
      return updated;
    }
  });
}
      const columnsMap = {
        "id":"id",
        "Date": "pricing_date",
        "Supplier": "supplier",
        "Loc Type ": "loc_type",
        "Loc #": "loc_id",
        "Travel Center": "travel_center",
        "ST": "st",
        "Merchant ID": "merchant_id",
        "City/State": "city_state",
        "Rack ID": "rack_id",
        "Dispensed": "product_dispensed",
        "Index": "index",
        "Freight": "freight",
        "IBP Price": "ibp_fuel_price",
        "Retail Price": "retail_price",
        "R.Fuel Price": "retail_fuel_price",
        "Fuel Price": "fuel_price",
        "Savings": "saving_total",
        "Bulk DEF": "bulk_def_price",
       
      };
    
      const {
        data,
        totalRows,
        loading,
        handlePageChange,
        handlePerRowsChange,
        handleSearch, // ✅ Added
        setData,
      } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
    
      const {
        data: taPricing,
        totalRows: taPricingTotalRow,
        loading: taPricingLoading,
        handlePageChange: taPricingHandlePerChange,
        handlePerRowsChange: taPricingHandlePerROwChange,
        handleSearch: taPricingHandleSearch, // ✅ Added
        setData: handleSetData,
      } = usePaginatedTable({ apiUrl: ta_pricing, columnsMap });
    
      const {
        data: flyingJ,
        totalRows: flyingJTotalRow,
        loading: flyingJLoading,
        handlePageChange: flyingJHandlePageChange,
        handlePerRowsChange: flyingJHandlePerRowsChange,
        handleSearch: flyingJHandleSearch,
        setData: setflyingJData,
      } = usePaginatedTable({ apiUrl: esso_pricing, columnsMap });
         const {
        data: essoData,
        totalRows: essoTotalRow,
        loading: essoLoading,
        handlePageChange: essoHandlePageChange,
        handlePerRowsChange: essoHandlePerRowsChange,
        handleSearch: essoHandleSearch,
        setData: setessoData,
      } = usePaginatedTable({ apiUrl: APINAME, columnsMap });
         const {
        data: loveData,
        totalRows: loveTotalRow,
        loading: loveLoading,
        handlePageChange: loveHandlePageChange,
        handlePerRowsChange: loveHandlePerRowsChange,
        handleSearch: loveHandleSearch,
        setData: setloveData,
      } = usePaginatedTable({ apiUrl: love_pricing, columnsMap });
         const {
        data: loveActualData,
        totalRows: loveActualTotalRow,
        loading: loveActualLoading,
        handlePageChange: loveActualHandlePageChange,
        handlePerRowsChange: loveActualHandlePerRowsChange,
        handleSearch: loveActualHandleSearch,
        setData: setloveActualData,
      } = usePaginatedTable({ apiUrl: love_pricing_actual, columnsMap });
         const {
        data: ulramarData,
        totalRows: ulramarDataTotalRow,
        loading: ulramarDataLoading,
        handlePageChange: ulramarDataHandlePageChange,
        handlePerRowsChange: ulramarDataHandlePerRowsChange,
        handleSearch: ulramarDataHandleSearch,
        setData: setulramarDataData,
      } = usePaginatedTable({ apiUrl: ul_pricing, columnsMap });
     useEffect(() => {
      const cols = Object.keys(columnsMap).filter((key) => key !== "id").map((key) => ({
        name: key,
        selector: (row) => row[key],
        sortable: true,
        wrap: true,
      }));
  
     cols.push({
  name: (
    <div className="d-flex align-items-center">
      <span className="me-2 fw-bold">Action</span>
      <input
        type="checkbox"
        checked={selectAll}
        onChange={(e) => handleSelectAll(e.target.checked)}
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
  width: "130px",
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
});

  
      setTableColumns(cols);
    }, [openRowId,selectedRows, selectAll, data]);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".dropdown-action")) {
          setOpenRowId(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 const pricingListTableTab = [
  {
    id: "1",
    label: "Flying J",
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={flyingJ}
        loading={flyingJLoading}
        pagination
        paginationServer
        paginationTotalRows={flyingJTotalRow}
        onChangeRowsPerPage={flyingJHandlePerRowsChange}
        onChangePage={flyingJHandlePageChange}
      />
    ),
  },
  {
    id: "2",
    label: (
      <>
        Ta-Petro - <strong>[Capped]</strong>
      </>
    ),
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={taPricing}
        loading={taPricingLoading}
        pagination
        paginationServer
        paginationTotalRows={taPricingTotalRow}
        onChangeRowsPerPage={taPricingHandlePerROwChange}
        onChangePage={taPricingHandlePerChange}
      />
    ),
  },
  {
    id: "3",
    label: (
      <>
        Ta-Petro - <strong>[Actual]</strong>
      </>
    ),
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={data}
        loading={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    ),
  },
  {
    id: "4",
    label: "Esso",
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={essoData}
        loading={essoLoading}
        pagination
        paginationServer
        paginationTotalRows={essoTotalRow}
        onChangeRowsPerPage={essoHandlePerRowsChange}
        onChangePage={essoHandlePageChange}
      />
    ),
  },
  {
    id: "5",
    label: (
      <>
        Love - <strong>[Capped]</strong>
      </>
    ),
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={loveData}
        loading={loveLoading}
        pagination
        paginationServer
        paginationTotalRows={loveTotalRow}
        onChangeRowsPerPage={loveHandlePerRowsChange}
        onChangePage={loveHandlePageChange}
      />
    ),
  },
  {
    id: "6",
    label: (
      <>
        Love - <strong>[Actual]</strong>
      </>
    ),
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={loveActualData}
        loading={loveActualLoading}
        pagination
        paginationServer
        paginationTotalRows={loveActualTotalRow}
        onChangeRowsPerPage={loveActualHandlePerRowsChange}
        onChangePage={loveActualHandlePageChange}
      />
    ),
  },
  {
    id: "7",
    label: "Ultramar",
    component: (
      <DataTableComponent
        title="Invoices List"
        tableColumns={tableColumns}
        tableData={ulramarData}
        loading={ulramarDataLoading}
        pagination
        paginationServer
        paginationTotalRows={ulramarDataTotalRow}
        onChangeRowsPerPage={ulramarDataHandlePerRowsChange}
        onChangePage={ulramarDataHandlePageChange}
      />
    ),
  },
];

const handleDelete = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${APINAME}/${row.id}`)
          .then(() => {
            setData((prevData) =>
              prevData.filter((item) => item.id !== row.id)
            );
            Swal.fire("Deleted!", "Record deleted successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete record.", "error");
          });
      }
    });
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title=" Flying J Pricing List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List Filter" />
              <CardBody>
                <BasicTabCard tabContent={pricingListTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List" />
              <CardBody>
                <BasicTabCard tabContent={pricingListTableTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Index;
