import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import BasicTabCard from "../../UiKits/Tabs/BoostrapTabs/BasicTabCard";
import {
   owner_report, 
  report_new,
  report_new_downlod,
  owner_report_downlod
} from "../../../api";
import Swal from "sweetalert2";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import { formatDate } from "../../../Hooks/Dropdowns";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
const ViewReportList = () => {
  const [filters, setFilters] = useState({});
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prev) => !prev);

  const getActiveTabFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "1";
  };


  const getApiByTab = (tab) => {
    switch (tab) {
      case "1":
        return report_new;
      case "2":
        return owner_report;
      default:
        return report_new;
    }
  };

  const getTableIdByTab = (tab) => {
    switch (tab) {
      case "1":
        return "#reportNew";
      case "2":
        return "#OwnerReport";
    
      default:
        return "#reportNew";
    }
  };

  const GetDataTAble = (api, tableId) => {
    console.log(api)
   if ($.fn.DataTable.isDataTable(tableId)) {
  $(tableId).DataTable().clear().destroy();
}
   const columns =[
  { data: "report_id", title: "Report#" },
  { data: "file_name", title: "Report Name" },
  { data: "company_name", title: "Company Name" },
  { data: "trans_count", title: "No of Transaction" },
  { data: "start_date", title: "Start Date(EDT)" },
  { data: "end_date", title: "End Date (EDT)incl." },
  { data: "export_type_label", title: "Type" },
 {
  data: null,
  title: "Download",
  orderable: false,
  width: "180px",
  render: function (data, type, row) {

    return `
      <div class="dropdown">
        <button class="btn btn-xs btn-success dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
          <i class="fa fa-download"></i> Download
        </button>

        <ul class="dropdown-menu">

          <li>
            <a href="#"
               class="dropdown-item download-option text-success"
               data-id="${row.id}"
               data-report="${row.report_id}"
               data-type="EXCEL"
               data-table="${tableId}">
               <i class="fa-solid fa-file-excel me-2"></i> Download EXCEL
            </a>
          </li>

          <li>
            <a href="#"
               class="dropdown-item download-option text-info"
               data-id="${row.id}"
               data-report="${row.report_id}"
               data-type="CSV"
               data-table="${tableId}">
               <i class="fa-solid fa-file-csv me-2"></i> Download CSV
            </a>
          </li>

          <li>
            <a href="#"
               class="dropdown-item download-option text-primary"
               data-id="${row.id}"
               data-report="${row.report_id}"
               data-type="PDF"
               data-table="${tableId}">
               <i class="fa-solid fa-file-pdf me-2"></i> Download PDF
            </a>
          </li>

        </ul>
      </div>
    `;
  }
},
{
  data: null,
  title: "Action",
  orderable: false,
  render: function (data, type, row) {

    return `
      <button class="btn btn-sm btn-danger delete-btn"
              data-id="${row.report_id}"
              data-api="${api}"
              data-table="${tableId}">
        <i class="fa fa-trash me-1"></i> Delete
      </button>
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
          Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
        try {
          const response = await fetch(`${api}?${params.toString()}`);
          const json = await response.json();
     const tableData = json.data.map((row) => ({
      id:row.id,
      report_id: row.report_id,
      file_name: row.file_name,
      company_name: row.company_name,
      trans_count: row.trans_count,
      start_date: row.start_date,
      end_date: row.end_date,
      export_type_label: row.export_type_label ,
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
  .off("click", ".download-option")
  .on("click", ".download-option", function (e) {

    e.preventDefault();

    const id = $(this).data("id");
    const reportId = $(this).data("report");
    const type = $(this).data("type");

    const tab = getActiveTabFromUrl();

    switch (tab) {

      case "1": // Report List
        window.open(`${report_new_downlod}/${reportId}/${type}`, "_self");
        break;

      case "2": // Owner Report
        window.open(`${owner_report_downlod}/${id}/${type}`, "_self");
        break;

      default:
        alert("Invalid Download Type");
    }

});




;

$(document)
  .off("click", ".delete-btn")
  .on("click", ".delete-btn", function (e) {

    e.preventDefault();

    const id = $(this).data("id");
    const deleteApi = $(this).data("api");
    const tableId = $(this).data("table");

    const table = $(tableId).DataTable();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {

      if (result.isConfirmed) {

        axios.delete(`${deleteApi}/${id}`)
          .then(() => {

            Swal.fire("Deleted!", "Record deleted successfully.", "success");

            table.ajax.reload(null, false); // reload correct table

          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete record.", "error");
            console.error(err);
          });

      }

    });

});
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
let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
  const tab = getActiveTabFromUrl();
    const api = getApiByTab(tab);
    const tableId = getTableIdByTab(tab);
  

  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);

    GetDataTAble( api,
        tableId);
  }, 1000); // 500ms after last keystroke
};

  const View_Invoice_Table = [
    {
      id: "1",
      label: "Report List",
         
     component: (
  <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Report List"
        />

        <CardBody>
          <table
            id="reportNew"
            className="table table-bordered w-100"
>
      <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input8" id="8" onChange={handleInputChange} className="input-search"/></th>
                    </tr>
                  </table>
        </CardBody>
      </Card>
    </Col>
  </Row>
),
    },
    {
      id: "2",
      label: " Owner Operator Report list",
      component: (
         <Row>
    <Col sm="12">
      <Card>
        <HeaderCard
          title="Owner Operator Report list"
        
        />

        <CardBody>
        <table id="OwnerReport" className="table table-bordered w-100" >
           <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input8" id="8" onChange={handleInputChange} className="input-search"/></th>
                    </tr>
                  </table>
        </CardBody>
         </Card>
    </Col>
  </Row>
      ),
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs parent="Reports" title="view Reports"/>

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

export default ViewReportList;