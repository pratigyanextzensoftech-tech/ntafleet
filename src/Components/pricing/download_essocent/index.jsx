import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs, H5 } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, CardHeader, Row, Col, Card, CardBody } from "reactstrap";
import DownloadEssoCentForm from "./DownloadEssoCentForm";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { toast } from "react-toastify";
import {
  loc_group_Essogroup as APINAME,
  Esso_cent_Data,
  esso_cent_auto,
} from "../../../api";
import axios from "axios";

const Index = () => {
  const[companyId,setCompnyId]=useState('');
  const[startDate,setStatrtDate]=useState('');
  const[endDate,setEndDate]=useState('');

  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [open, setOpen] = useState(false);
const handleChildChange = (company_id,start_date,end_date) => {
 console.log(company_id)
 setCompnyId(company_id)
 setStatrtDate(start_date)
 setEndDate(end_date)
 if ($.fn.dataTable.isDataTable("#example")) {
    const table = $("#example").DataTable();
    const params = new URLSearchParams({
      start: table.page.info().start,
      length: table.page.len(),
      search: table.search(),
      orderColumn: table.order()[0][0],
      orderDir: table.order()[0][1],
      company_id: company_id,
      from_date: start_date,
      upto_date: end_date,
    });

    const url = `${Esso_cent_Data}?${params.toString()}`;
    console.log("Reloading with:", url);

    table.ajax.url(url).load();
  }
  };

  


  // Step 1: Fetch dynamic column names
  useEffect(() => {
    fetch(APINAME)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicColumns(data.map((item) => item.name));
          setGroupIds(data.map((item) => item.id));
        } else {
          console.error("APINAME response is not an array:", data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Step 2: Initialize DataTable
  useEffect(() => {
    if (dynamicColumns.length === 0) return;

    if ($.fn.dataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    }

    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      // Action column from API
      { data: "Action", title: "Action", orderable: false },
      ...dynamicColumns.map((col, idx) => ({
        data: `col_${idx}`,
        title: col,
      })),
      // Second Action column from API
      { data: "Action", title: "Action", orderable: false },
    ];

    $("#example").DataTable({
      serverSide: true,
      processing: true,
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      columns: columns,
      columnDefs: [
        {
          targets: "_all",
          orderable: false,
        },
        {
          targets: [0, 1], // allow ordering only here
          orderable: true,
        },
      ],

     ajax: function (data, callback) {
  const params = new URLSearchParams();
  params.append("start", data.start);
  params.append("length", data.length);
  params.append("search", data.search.value || "");
  params.append("orderColumn", data.columns[data.order[0].column].data);
  params.append("orderDir", data.order[0].dir);

  // 👇 Include filters
   params.append("company_id", companyId);
   params.append("from_date", startDate);
   params.append("upto_date", endDate);
console.log("companyId",companyId)
  fetch(`${Esso_cent_Data}?${params.toString()}`)
    .then((res) => res.json())
    .then((json) => {

const url = `${Esso_cent_Data}?${params.toString()}`;
console.log("🔗 API URL:", url);
      const tableData = json.data.map((row) => {
        const obj = {
          company_name: row[0],
          pricing_date: row[1],
          Action: row[2],
        };
        dynamicColumns.forEach((col, idx) => {
          obj[`col_${idx}`] = row[idx + 3] || "";
        });
        return obj;
      });
console.log(tableData)
      callback({
        draw: data.draw,
        recordsTotal: json.recordsTotal,
        recordsFiltered: json.recordsFiltered,
        data: tableData,
      });
    })
    .catch((err) => {
      console.error("Error fetching table data:", err);
      callback({
        draw: data.draw,
        recordsTotal: 0,
        recordsFiltered: 0,
        data: [],
      });
    });
},

    });

    $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {};
      dynamicGroupIds.forEach((groupid) => {
        const inputId = `#c${id}g${groupid}`;
        const value = $(inputId).val();
        updateData[`group_${groupid}`] = value;
      });

      axios
        .put(`${esso_cent_auto}/${id}`, updateData)
        .then((response) => {
          toast.success("Data updated");
        })
        .catch((error) => {
          toast.error("Error In Data update");
        });
    });

    return () => {
      if ($.fn.dataTable.isDataTable("#example"))
        $("#example").DataTable().destroy(true);
    };
  }, [dynamicColumns,companyId]); 

  $(document).ready(function () {
    // ✅ Excel Download
    $("#downloadExcel").on("click", function (e) {
        e.preventDefault();
        const company_id = $("#company_id option:selected").val();
        const start_date = $("#start_date").val();
        const end_date = $("#end_date").val(); 
        window.open(`${esso_cent_auto}/auto_esso_excel?company_id=${companyId}&start_date=${startDate}&end_date=${endDate}`, "_self"); 
    });

    // ✅ CSV Download
    $("#downloadCSV").on("click", function (e) {
        e.preventDefault(); 
        const company_id = $("#company_id option:selected").val();
        const start_date = $("#start_date").val();
        const end_date = $("#end_date").val();
        window.open(`${esso_cent_auto}/auto_esso_csv?company_id=${companyId}&start_date=${startDate}&end_date=${endDate}`, "_self"); 
    });

});

  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="ESSO Cent Headings Table" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Cent Filter" />
              <CardBody>
                <DownloadEssoCentForm btnTitle="Search" onChange={handleChildChange}  />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H5>
                  ESSO Cent List
                <ul className="header-dropdown float-end">
      <li className="dropdown position-relative">
        <button
          className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2"
          onClick={() => setOpen(!open)}
          style={{
            fontWeight: 500,
            transition: "all 0.2s ease-in-out",
          }}
        >
          <i className="fa fa-download"></i>
          Download
        </button>

        {open && (
          <ul
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: "110%",
              right: 0,
              padding: "8px 0",
              minWidth: "200px",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            <li>
              <a
                href="#"
                id="downloadExcel"
                className="dropdown-item d-flex align-items-center gap-2"
              >
                <i className="fa fa-file-excel-o text-success fs-5"></i>
                <span>Download Excel</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                id="downloadCSV"
                className="dropdown-item d-flex align-items-center gap-2"
              >
                <i className="fa fa-file-excel-o text-info fs-5"></i>
                <span>Download CSV</span>
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
                </H5>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Pricing Date</th>
                        <th>Action</th>
                        {dynamicColumns.map((col, idx) => (
                          <th key={idx}>
                            {idx} {}
                          </th>
                        ))}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
