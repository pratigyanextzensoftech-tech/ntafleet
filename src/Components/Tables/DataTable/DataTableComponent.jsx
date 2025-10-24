import React, { Fragment, useCallback, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4 } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import Loader from "../../../Layout/Loader";
import { Row, Col, Card, CardBody } from 'reactstrap'; 

const DataTableComponent = ({
  tableData,
  tableColumns,
  title,
  loading,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [data, setData] = useState(tableData);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        color: "#333",
      },
    },
  };

  // ✅ Sync data when parent updates
  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  // ✅ Handle selected rows
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  // ✅ Handle delete (local only)
  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete:\r ${selectedRows.map(
          (r) => r.title || r.companyName
        )}?`
      )
    ) {
      setToggleDelete(!toggleDelete);
      setData(
        data.filter((item) => !selectedRows.some((row) => row.id === item.id))
      );
      setSelectedRows([]);
    }
  };

  // ✅ Calculate total pages
  const totalPages = Math.ceil(paginationTotalRows / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onChangePage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    onChangeRowsPerPage(newPerPage, page);
  };

  return (
    <Fragment>

      <Row>
       <Col sm="12">
         <Card>
           {title && ( 
            <HeaderCard title={title} />         
           )} 
           <CardBody>
           <DataTable
            data={data}
            columns={tableColumns}
            striped
            center
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={paginationTotalRows}
            paginationPerPage={perPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleDelete}
            customStyles={customStyles}
            progressPending={loading}
            progressComponent={<Loader loading={loading} />}
          /> 
           </CardBody>
         </Card>
       </Col>
     </Row> 
    </Fragment>
  );
}; 
export default DataTableComponent;
