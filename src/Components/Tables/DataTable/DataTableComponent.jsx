import React, { Fragment, useCallback, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Btn, H6 } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import Loader from "../../../Layout/Loader";
import { Row, Col, Card, CardBody } from "reactstrap";

const DataTableComponent = ({
  tableData,
  totalData,
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
        color: "#e2e5f5ff",
        backgroundColor: "#0a4f88ff", // ✅ light gray background
        borderBottom: "2px solid #ddd", // optional: bottom border
        paddingTop: "5px", // ✅ optional: padding for rows too
        paddingBottom: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#444",
        paddingTop: "5px", // ✅ optional: padding for rows too
        paddingBottom: "5px",
        paddingLeft: "10px",
        paddingRight: "10px",
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
            {title && <HeaderCard title={title} />}
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
              {totalData && (
                <Row>
                  <Col sm="12">
                    <hr />
                    <Row>
                      <Col sm="1">
                        <H6>Total:</H6>
                      </Col>
                      <Col sm="11">
                        <Row>
                          <Col sm="6">
                            <Row>
                              <Col sm="1">
                                <H6>USA:</H6>
                              </Col>
                              <Col
                                sm="11"
                                className="d-flex justify-content-start"
                              >
                                <span style={{ marginRight: "15px" }}>
                                  Fees: {totalData.fee}
                                </span>
                                <span style={{ marginRight: "15px" }}>
                                  Quantity : {totalData.qtygln} ``
                                </span>
                                <span style={{ marginRight: "15px" }}>
                                  Amount: {totalData.amtusd}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="6">
                            <Row>
                              <Col sm="1">
                                <H6>CAD:</H6>
                              </Col>
                              <Col
                                sm="11"
                                className="d-flex justify-content-start"
                              >
                             
                                <span style={{ marginRight: "15px" }}>
                                  Tax Amount: {totalData.taxamt}
                                </span>
                                <span style={{ marginRight: "15px" }}>
                                  Quantity: {totalData.qtyltr} 
                                </span>
                                <span style={{ marginRight: "15px" }}>
                                  Amount: {totalData.amtcad}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default DataTableComponent;
