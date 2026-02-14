import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col ,Card,CardBody} from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { DownloadBulkTab } from "./DownloadBulkTab";
import { DownloadBulkTableTab } from "../../../Data/tab/DownloadBulkTableTab";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import usePaginatedTable from "../../../Hooks/usePagination";
import {bulk_pricing_excel,multidate_pricing_excel} from '../../../api/index'
const Index = () => {
   const [openRowId, setOpenRowId] = useState(null);
      const [tableColumns, setTableColumns] = useState([]);
      const [showTable,setShowTable]=useState(false)
      const [selectedIds, setSelectedIds] = useState([]);
      const [selectedRows, setSelectedRows] = useState([]);
      const[selectedData,setSelectdData]=useState([])
      const [selectAll, setSelectAll] = useState(false);
      const[filters,setFilters]=useState({})
      
   const columnsMap = {
      "ID#": "id",
      "Pricing Date": "pricing_date",
      "Supplier": "supplier",
      "Tax Type": "tax_type",
      "Added_On": "dated",
      Download: "",
     
    };
   const {
        data,
        totalRows,
        loading,
        handlePageChange,
        handlePerRowsChange,
        handleSearch,
        setData,
      } = usePaginatedTable({ apiUrl: bulk_pricing_excel, columnsMap });
    
      const {
        data: esso,
        totalRows: essoTotalRow,
        loading: essoLoading,
        handlePageChange: essoHandlePerChange,
        handlePerRowsChange:essoHandlePerROwChange,
         handleSearch:essoFormSearch,      // ✅ Added
        setData: handleSetData,
      } = usePaginatedTable({ apiUrl: bulk_pricing_excel, columnsMap });
     const {
        data: taPetro,
        totalRows: taPetroTotalRow,
        loading: taPetroLoading,
        handlePageChange: taPetroHandlePerChange,
        handlePerRowsChange: taPetroHandlePerROwChange,
         handleSearch:taSearchearch,
        setData: settaPetroData,
      } = usePaginatedTable({ apiUrl: bulk_pricing_excel, columnsMap });
      const {
        data: lovesBulk,
        totalRows: lovesTotalRow,
        loading: lovesLoading,
        handlePageChange: lovesBulkHandlePageChange,
        handlePerRowsChange: lovesBulkHandlePerRowsChange,
         handleSearch:lovesBulkFormSearch,
        setData: setlovesBulkData,
      } = usePaginatedTable({ apiUrl: bulk_pricing_excel, columnsMap });
       const {
        data: multidate,
        totalRows: multiDateTotalRow,
        loading: multiDateLoading,
        handlePageChange: multiDatekHandlePerChange,
        handlePerRowsChange: multiDateHandlePerROwChange,
        handleSearch:multiDateFormSearch,
        setData: setmultidateData,
      } = usePaginatedTable({ apiUrl: multidate_pricing_excel, columnsMap });

       const applyFilters = (tableData, filters) => {
  return tableData.filter((row) =>
    Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return (
        row[key] &&
        row[key].toString().toLowerCase().includes(filters[key])
      );
    })
  );
};

  const filteredCombineData = applyFilters(data, filters);
const filteredessoData = applyFilters(esso, filters);
const filteredtaPetroData = applyFilters(taPetro, filters);
const filteredlovesData = applyFilters(lovesBulk, filters);
const filteredmultidateData = applyFilters(multidate, filters);
const getTableColumns = (tableData,columnmap) => {
  return [
    ...Object.keys(columnmap).map((label) => ({
      name: (
        <div className='w-100'>
          <div className="fw-bold">{label}</div>
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
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) =>
              handleFilterChange(label, e.target.value) // ✅ CLIENT SIDE
            }
          />
        </div>
      ),
   selector: (row) => {
    const key = columnmap[label];
        const value= row.fulldata?.[key] ?? row[key] ?? "";   
          if (key === "from" || key === "to" || key==="from_date" || key==='to_date') {
           return value ? value.split(/[ T]/)[0]: "";
        }
        return value;
   },
      sortable: true,
      wrap: true,
    })),

  ];
};
    const DownloadBulkTable = [
  {
    id: '1',
    label:"Download Bulk Price Sheet",
    component: <DataTableComponent 
   paginationRowsPerPageOptions={[ 200,300]} 
        loading={loading} 
       totalRows= {totalRows}
  tableColumns={getTableColumns(data,columnsMap)}
       setData={setData}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        tableData={filteredCombineData} />,
  },
  {
    id: '2',
    label:"Search ESSO Bulk Price Sheet",
    component: <DataTableComponent 
       loading={essoLoading}
      handlePageChange={essoHandlePerChange}
      setData={handleSetData}
      handlePerRowsChange={essoHandlePerROwChange} totalRows={essoTotalRow}  tableColumns={getTableColumns(filteredessoData,columnsMap)} 
    tableData={filteredessoData} paginationRowsPerPageOptions={[ 200,300]}  />,
  },

  {
    id: '3',
    label: "Search Ta-Petro Bulk Price Sheet ",
    component:<DataTableComponent 
      loading={taPetroLoading} 
      handlePageChange={taPetroHandlePerChange}
      setData={settaPetroData}
      handlePerRowsChange={taPetroHandlePerROwChange}
      totalRows={taPetroTotalRow} 
      tableColumns={getTableColumns(filteredtaPetroData,columnsMap)} 
      tableData={filteredtaPetroData}
      paginationRowsPerPageOptions={[ 200,300]}
      />,
  },
   {
    id: '4',
    label:"Search Loves Bulk Price Sheet",
    component: <DataTableComponent 
 tableColumns={getTableColumns(filteredlovesData,columnsMap)}   setData={setlovesBulkData}
      handlePerRowsChange={lovesBulkHandlePageChange}
      handlePageChange={lovesBulkHandlePerRowsChange}
      loading={lovesLoading} totalRows={lovesTotalRow}  tableData={filteredlovesData} paginationRowsPerPageOptions={[ 200,300]}  />,
  },
   {
    id: '5',
    label:"Download Multi Date Bulk Price Sheet",
    component:<DataTableComponent  
  tableColumns={getTableColumns(filteredmultidateData,columnsMap)}     handlePerRowsChange={multiDateHandlePerROwChange}
     setData={setmultidateData}
     handlePageChange={multiDatekHandlePerChange}
     loading={multiDateLoading} totalRows={multiDateTotalRow} tableData={filteredmultidateData} paginationRowsPerPageOptions={[ 200,300]}  />,
  },
  
];
   const handleSelectAll = (checked, data) => {
  setSelectAll(checked);

  if (!checked) {
    setSelectedIds([]);
    setSelectedRows([]);
    return;
  }

  setSelectedIds(data.map((row) => row["Invoice#"]));
  setSelectedRows(data);
};

const handleSelectRow = (row) => {
  const id = row["Invoice#"];

  const alreadySelected = selectedIds.includes(id);

  if (alreadySelected) {
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    setSelectedRows((prev) =>
      prev.filter((r) => r["Invoice#"] !== id)
    );
  } else {
    setSelectedIds((prev) => [...prev, id]);
    setSelectedRows((prev) => [...prev, row]);
  }
};
 const handleFilterChange = (column, value) => {
  setFilters((prev) => ({
    ...prev,
    [column]: value.toLowerCase(),
  }));
};

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Download Bulk Price Sheet" />
      <Container fluid={true}>

        <Row>
  <Col sm="12">
  <Card>
    <HeaderCard title="Download Bulk Price Sheet" />
    <CardBody>
      	<BasicTabCard tabContent={DownloadBulkTab} />
    </CardBody>
  </Card>
  </Col>
</Row>

<Row>
  <Col sm="12">
  <Card>
    <HeaderCard title="Download Bulk Price Sheet" />
    <CardBody>
      	<BasicTabCard tabContent={DownloadBulkTable} />
    </CardBody>
  </Card>
  </Col>
</Row>
      </Container>
    </Fragment>
  );
};

export default Index;
