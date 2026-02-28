import React, { Fragment, useState, useEffect } from "react";
import {Breadcrumbs} from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import { SinglepricingTab } from "../../../Data/tab/SinglePricingTab";
import Swal from "sweetalert2";
import {Btn} from "../../../AbstractElements";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { formatDate } from "../../../Hooks/Dropdowns";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import {
  ta_pricing_pdf,pricing_pdf as pricing_pdf_Api,love_pricing_pdf,ul_pricing_pdf,esso_pricing_pdf,irv_pricing_pdf,cen_pricing_pdf
} from "../../../api";
const SinglePdfIndex = () => {
  const [filters, setFilters] = useState({});
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prev) => !prev);
 let selectedRows = [];
  const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };


  const getApiByTab = (tab) => {
    switch (tab) {
      case "1":
        return pricing_pdf_Api;
      case "2":
        return ta_pricing_pdf;
         case "3":
        return ta_pricing_pdf;
         case "4":
        return esso_pricing_pdf;
         case "5":
        return esso_pricing_pdf;
         case "6":
        return love_pricing_pdf;
         case "7":
        return love_pricing_pdf;
         case "8":
        return ul_pricing_pdf;
         case "9":
        return irv_pricing_pdf;
          case "10":
        return cen_pricing_pdf;
        
    }
  };

 const getTableIdByTab = (tab) => {
  switch (tab) {
    case "1": return "#flyingJ";
    case "2": return "#taPetroCapped";
    case "3": return "#taPetroActual";
    case "4": return "#EssoPdfWihoutTax";
    case "5": return "#essoPdfWithTax";
    case "6": return "#lovePdfCapped";
    case "7": return "#lovePdfActual";
    case "8": return "#ulPdf";
    case "9": return "#irvingPdf";
    case "10": return "#cenovus";
    default: return "#flyingJ";
  }
};

  const GetDataTAble = (api, tableId) => {
    console.log(api)
   if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().clear().destroy();
}
   const columns =[
  { data: "id", title: "ID#" },
  { data: "company_name", title: "Company" },
  { data: "pricing_date", title: "Pricing Date" },
  { data: "supplier", title: "Supplier" },
  { data: "entry_count", title: "Entry Count" },
  { data: "added_by_name", title: "Added By" },
  { data: "added_on", title: "Added On" },
  { data: "mailby", title: "Mail By" },
  { data: "mail_on", title: "Mail On" },
{
  data: null,
  title: `
    Delete 
    <input type="checkbox" id="select-all" style="margin-left:8px;">
  `,
  orderable: false,
  width: "130px",
  render: function (data, type, row) {
    return `
      <input type="checkbox" 
             class="row-checkbox" 
             value="${row.id}">
    `;
  }
},
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {

    return `
      <div class="dropdown">
        <button class="btn btn-sm btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
          <i class="fa fa-cog me-1"></i> Action
        </button>
        <ul class="dropdown-menu">
          <li>
            <a href="${row.download_link || '#'}"
             target="_blank"
               class="dropdown-item view-pdf"
               data-id="${row.id}">
               <i class="fa fa-file-pdf me-2 text-danger"></i>
               View PDF
            </a>
          </li>

          <li>
            <a href="/card-admin/viewInvoice/ViewPdf/${btoa(row.id)}"
             target="_blank"
               class="dropdown-item view-admin-pdf"
               data-id="${row.id}">
               <i class="fa fa-file-pdf me-2 text-primary"></i>
               View Admin PDF
            </a>
          </li>

          <li>
            <a href="#"
               class="dropdown-item email-pricing"
               data-id="${row.id}">
               <i class="fa fa-envelope me-2 text-success"></i>
               Email Pricing PDF
            </a>
          </li>

          <li>
            <a href="#"
               class="dropdown-item test-email-pricing"
               data-id="${row.id}">
               <i class="fa fa-paper-plane me-2 text-warning"></i>
               Test Email Pricing PDF
            </a>
          </li>

          <li><hr class="dropdown-divider"></li>

        </ul>
      </div>
    `;
  }
}
];
    $(tableId).DataTable({
      serverSide: true,
      processing: true,
      paging: true,
      searching: true,
      destroy:true,
      ordering: true,
       scrollX: true,
      scrollCollapse: true,
      fixedColumns: { leftColumns: 1},
      pageLength: 10,
 columns: columns, 
      ajax: async function (data, callback) {
        const params = new URLSearchParams();
        params.append("start", data.start);
        params.append("length", data.length);
        params.append("search", data.search.value || "");
        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => ({
      id:row.id,
      company_name: row.company_name,
      pricing_date: row.pricing_date,
      company_name: row.company_name,
      supplier: row.supplier,
      entry_count: row.entry_count,
      added_by_name: row.added_by_name,
      added_on: row.added_on ,
      added_on: row.added_on ,
      mailby: row.mailby ,
      mail_on: row.mail_on ,
      download_link:row.download_link
    }));
    console.log(tableData)
          callback({
            draw: data.draw,
            recordsTotal: json.recordsTotal,
            recordsFiltered: json.recordsFiltered,
            data: tableData,
          });
        } catch (error) {
          console.error(error);
          callback({
            draw: data.draw,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: [],
          });
        }
      },

  
    });


$(document)
  .off("change", "#select-all")
  .on("change", "#select-all", function () {

    const checked = $(this).is(":checked");

    $(".row-checkbox").prop("checked", checked);

    if (checked) {
      selectedRows = $(".row-checkbox").map(function () {
        return $(this).val();
      }).get();
    } else {
      selectedRows = [];
    }

    console.log("Selected:", selectedRows);
  });
  $(document)
  .off("change", ".row-checkbox")
  .on("change", ".row-checkbox", function () {

    const id = $(this).val();

    if ($(this).is(":checked")) {
      if (!selectedRows.includes(id)) {
        selectedRows.push(id);
      }
    } else {
      selectedRows = selectedRows.filter(item => item !== id);
      $("#select-all").prop("checked", false);
    }

    // Auto check select-all if all selected
    if ($(".row-checkbox:checked").length === $(".row-checkbox").length) {
      $("#select-all").prop("checked", true);
    }

    console.log("Selected:", selectedRows);
  });
  $('#example').on('draw.dt', function () {

  $(".row-checkbox").each(function () {
    if (selectedRows.includes($(this).val())) {
      $(this).prop("checked", true);
    }
  });
  })


  };

useEffect(() => {
 const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab); 
  
  setTimeout(() => {
    GetDataTAble(api, tableId);
  }, 200);

  return () => {
  if ($.fn.DataTable.isDataTable(tableId)) {
    $(tableId).DataTable().clear().destroy();
  }
};
}, [window.location.search]);

function handleDeleteSelected() {

  const tab = getActiveTabFromUrl();
  const api = getApiByTab(tab);
  const tableId = getTableIdByTab(tab);

  if (!api) {
    Swal.fire("Error!", "API not found for this tab.", "error");
    return;
  }

  if (selectedRows.length === 0) {
    Swal.fire("Warning!", "Please select at least one record.", "warning");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${selectedRows.length} selected records?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete them!"
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(api + "/delete-multiple", {
        data: { ids: selectedRows }
      })
      .then(() => {

        Swal.fire("Deleted!", "Records deleted successfully.", "success");

        selectedRows = [];
        $("#select-all").prop("checked", false);

        if ($.fn.DataTable.isDataTable(tableId)) {
          $(tableId).DataTable().ajax.reload(null, false);
        }

      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error!", "Failed to delete records.", "error");
      });

    }

  });

}

  const View_Invoice_Table = [
    {
      id: "1",
      label: "Flying J Pdf",
         
     component: (
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Flying J Pdf"
        />
        <CardBody>
              <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
          <table
            id="flyingJ"
            className="table table-bordered w-100"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
),
    },
    {
      id: "2",
      label: "Ta-Petro Pdf - [Capped]",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Ta-Petro Pdf - [Capped]"
        
        />

        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                  {/* <Btn attrBtn={{ color: "secondary", className: "ms-2" }}>Download Money Code</Btn> */}
                </div>
        <table id="taPetroCapped" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "3",
      label: "Ta-Petro Pdf - [Actual]",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Ta-Petro Pdf - [Actual]"
        
        />

        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="taPetroActual" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "4",
      label: "Esso Pdf (without Text) ",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Esso Pdf (without Text) "
        
        />

        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="EssoPdfWihoutTax" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "5",
      label: "Esso Pdf (with Text)",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Esso Pdf (with Text)"
        
        />

        <CardBody>
             <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="essoPdfWithTax" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "6",
      label: "Love Pdf - [Capped]",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Love Pdf - [Capped]"
        
        />

        <CardBody>
            <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="lovePdfCapped" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "7",
      label: "Love Pdf - [Actual]",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Love Pdf - [Actual]"
        
        />

        <CardBody>
            <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="lovePdfActual" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "8",
      label: "Ul Pricing Pdf",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Ul Pricing Pdf"
        
        />

        <CardBody>
            <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="ulPdf" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "9",
      label: "Irving Pdf",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Irving Pdf"
        
        />

        <CardBody>
            <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="irvingPdf" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
    {
      id: "10",
      label: "Cenovus Pdf",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Cenovus Pdf"
        
        />

        <CardBody>
            <div className='text-end mb-3'>
                  <Btn attrBtn={{ color: "danger", onClick: handleDeleteSelected }}>Delete Pricing</Btn>
                </div>
        <table id="cenovus" className="table table-bordered w-100" />
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="Pricing List" />
  <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Create Pricing PDF" />
              <CardBody>
                <BasicTabCard  tabContent={SinglepricingTab()}  />
              </CardBody>
            </Card>
          </Col>
        </Row>
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <BasicTabCard tabContent={View_Invoice_Table} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SinglePdfIndex;