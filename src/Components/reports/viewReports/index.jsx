import React, { Fragment } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import useSelectableColumns from "../../../Hooks/useSelectableColumns";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import {
  owner_report, 
  report_new,
  report_new_downlod,
  owner_report_downlod
} from "../../../api";
import Swal from "sweetalert2";
import usePaginatedTable from "../../../Hooks/usePagination";
import axios from "axios";
const Index = () => {

  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  const { createColumns } = useSelectableColumns(tab==='1'?report_new_downlod:owner_report_downlod,"REPORT");
  // ✅ Define individual column mappings per API
  const columnSets = {
    ownerReportlist: {
      id: "report_id",
      "Report#": "report_id",
       Report_Name: "file_name",
      "Company Name": "company_name",
      "No Of Transaction": "trans_count",
      "Start date (EDT)": "start_date",
      "End date (EDT) incl.": "end_date",
      Type: "export_type_label",
    },
    reportList: {
      id: "report_id",
      Report_ID: "report_id",
      Report_Name: "file_name",
      "Company Name": "company_name",
      "No Of Transaction": "trans_count",
      "Start date (EDT)": "start_date",
      "End date (EDT) incl.": "end_date",
      Country: "filter_by_country",
      Type: "export_type_label",
    },
  };

  const ownerReportlist = usePaginatedTable({
    apiUrl: owner_report,
    columnsMap: columnSets.ownerReportlist,
    downloadApi: owner_report_downlod,
  });

  const reportList = usePaginatedTable({
    apiUrl: report_new,
    columnsMap: columnSets.reportList,
    downloadApi: report_new_downlod,
  });

  const tabs = [
    {
      id: "1",
      label: "Report List",
      data: reportList,
      map: columnSets.reportList,
      deleteApi: report_new,
    },
    {
      id: "2",
      label: "Owner Operator Report List",
      data: ownerReportlist,
      map: columnSets.ownerReportlist,
      deleteApi: owner_report,
    },
  ];

  // ✅ Define tab content dynamically
  const ReportTableTab = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    component: (
      <DataTableComponent
        title={tab.label}
        tableColumns={createColumns(tab.map, tab.data.data, {
          withCheckbox: false,
          withActions: false, // ✅ show action column
          showDownload: true, // ✅ conditionally show download
          showDelete: true,
          onDownload: (row) => console.log("Download:", row),
          onDelete: (row) => {
            Swal.fire({
              title: "Are you sure?",
              text: "Do you really want to delete?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "Cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                axios
                  .delete(`${tab.deleteApi}/${row.id}`)
                  .then((res) => {
                    // Remove deleted row from table
                    tab.data.setData((prev) =>
                      prev.filter((item) => item.id !== row.id)
                    );

                    Swal.fire(
                      "Deleted!",
                      "Record deleted successfully.",
                      "success"
                    );

                    // refresh table if server uses pagination
                    tab.data.fetchData();
                  })
                  .catch((err) => {
                    Swal.fire("Error!", "Failed to delete record.", "error");
                    console.error(err);
                  });
              }
            });
          },
        })}
        tableData={tab.data.data}
        loading={tab.data.loading}
        pagination
        paginationServer
        paginationTotalRows={tab.data.totalRows}
        onChangeRowsPerPage={tab.data.handlePerRowsChange}
        onChangePage={tab.data.handlePageChange}
      />
    ),
  }));

  return (
    <Fragment>
      <Breadcrumbs parent="Reports" title="view Reports" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Report List" />
              <CardBody>
                <BasicTabCard
                  title="Reports list"
                  tabContent={ReportTableTab}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
