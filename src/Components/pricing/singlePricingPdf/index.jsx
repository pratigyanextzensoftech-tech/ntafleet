import React, { Fragment, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { SinglepricingTableTab } from "../../../Data/tab/SinglePricingTableTab";
import { SinglepricingTab } from "../../../Data/tab/SinglePricingTab";
import useSelectableColumns from "../../../Hooks/useSelectableColumns";
import DataTableComponent from '../../Tables/DataTable/DataTableComponent';
import Swal from "sweetalert2";
import axios from "axios";
import {
  ta_pricing_pdf,pricing_pdf as pricing_pdf_Api,love_pricing_pdf,ul_pricing_pdf,esso_pricing_pdf
} from "../../../api";
import usePaginatedTable from "../../../Hooks/usePagination";
const Index = () => {
  const { createColumns,selectedRows } = useSelectableColumns();
const pricingpdf = {
  id: "id",
  "ID#": "id",
  "Company": "company_name",
  "Pricing Date": "pricing_date",
  "Supplier": "supplier",
  "Entry_Count": "entry_count",
  "Added_By": "idby",
  "Added_On": "added_on",
  "Mailed_By": "mailby",
  "Mailed_On": "mail_on",
}   
const handleDelete = ({ ids = [], deleteApi, refetch }) => {
  if (!ids.length) {
    Swal.fire("Warning", "Please select at least one record.", "warning");
    return;
  }

  const stringId = ids.join(",");

  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this record?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`${deleteApi}/${stringId}`)
        .then(() => {
          Swal.fire("Deleted!", "Record deleted successfully.", "success");
          refetch(); // ✅ refresh correct tab
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to delete record.", "error");
        });
    }
  });
};
   const pricingPdfData= usePaginatedTable({
         apiUrl: pricing_pdf_Api,
         columnsMap: pricingpdf,
       });
       const tapetroPdf = usePaginatedTable({
         apiUrl:ta_pricing_pdf ,
         columnsMap: pricingpdf,
       });
       const tapetroPdfActual = usePaginatedTable({
         apiUrl: ta_pricing_pdf,
         columnsMap: pricingpdf,
       });
         const essoPdfWithoutTax = usePaginatedTable({
         apiUrl: esso_pricing_pdf,
         columnsMap: pricingpdf,
       });
        const essoPdf = usePaginatedTable({
         apiUrl: esso_pricing_pdf,
         columnsMap: pricingpdf,
       });
         const lovePdf = usePaginatedTable({
         apiUrl: love_pricing_pdf,
         columnsMap: pricingpdf,
       });
         const lovePdfActual = usePaginatedTable({
         apiUrl: love_pricing_pdf,
         columnsMap: pricingpdf,
       });
         const ulPdf = usePaginatedTable({
         apiUrl: ul_pricing_pdf,
         columnsMap: pricingpdf,
       });
        
  const tabs = [
    { id: "1", label: "Flying J Pdf", data: pricingPdfData, map: pricingpdf,deleteApi:pricing_pdf_Api },
    { id: "2", label:   (
      <>
       Ta-Petro Pdf  - <strong> [Capped]</strong>
      </>
    ), data:tapetroPdf, map:  pricingpdf,deleteApi:ta_pricing_pdf},
    { id: "3", label:  (
      <>
       Ta-Petro Pdf - <strong> [Actual]</strong>
      </>
    ), data: tapetroPdfActual, map: pricingpdf,deleteApi:ta_pricing_pdf },
   {
     id: "4", label: " Esso Pdf (without Text) ", data: essoPdfWithoutTax, map: pricingpdf,deleteApi: esso_pricing_pdf},
      {
     id: "5", label: " Esso Pdf (with Text)", data: essoPdf, map: pricingpdf,deleteApi:esso_pricing_pdf },
     {
     id: "6", label:(
      <>
       Love Pdf  - <strong> [Capped]</strong>
      </>
    ), data: lovePdf, map: pricingpdf,deleteApi:love_pricing_pdf }, 
     {
     id: "7", label:(
      <>
      Love Pdf  - <strong> [Actual]</strong>
      </>
    ), data: lovePdfActual, map: pricingpdf,deleteApi:love_pricing_pdf },
    {
     id: "8", label: " Ultramar Pdf", data: ulPdf, map: pricingpdf,deleteApi:ul_pricing_pdf },
  ];
   const pricingpdfTab = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    component: (
      <DataTableComponent
        title={tab.label}
        table={true}
        buttonTitle="Delete Pricing"
         handleDelete={() =>
        handleDelete({
          ids: selectedRows,
          deleteApi: tab.deleteApi,   // ✅ dynamic API
          refetch: tab.data.fetchData // ✅ refresh correct tab
        })
      }
    tableColumns={createColumns(tab.map, tab.data,{
    withCheckbox: true,         // ✅ show checkboxes
    withActions: true,          // ✅ show action column
    showDownload: false,         // ✅ conditionally show download
    showDelete: false,          // ❌ hide delete
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
const fetchers = {
  pricingPdfData: pricingPdfData.fetchData,
  tapetroPdf: tapetroPdf.fetchData,
  tapetroPdfActual: tapetroPdfActual.fetchData,
  essoPdfWithoutTax: essoPdfWithoutTax.fetchData,
  essoPdf: essoPdf.fetchData,
  lovePdf: lovePdf.fetchData,
  lovePdfActual: lovePdfActual.fetchData,
  ulPdf: ulPdf.fetchData,
};
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Pricing List" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Pricing PDF" />
              <CardBody>
                <BasicTabCard  tabContent={SinglepricingTab(fetchers)}  />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Pricing List" />
              <CardBody>

                <BasicTabCard tabContent={pricingpdfTab} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
