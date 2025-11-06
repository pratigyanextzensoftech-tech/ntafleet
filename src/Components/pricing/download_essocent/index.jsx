import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
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
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [Data,setData]=useState([])
    const [open, setOpen] = useState(false);

  const handleDownload = (type) => {
    console.log(`Download type: ${type}`);
    setOpen(false); // close dropdown after click
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

        fetch(`${Esso_cent_Data}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            // Map API data directly, including Action fields
            const tableData = json.data.map((row) => {
              const obj = {
                company_name: row[0],
                pricing_date: row[1],
                Action: row[2], // use the Action field from API
              };
              dynamicColumns.forEach((col, idx) => {
                obj[`col_${idx}`] = row[idx + 3] || "";
              });
              return obj;
            });
setData(tableData)
            callback({
              draw: data.draw,
              recordsTotal: json.totalData,
              recordsFiltered: json.totalFiltered,
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

    const downloadExcel = (TYPE) => {
      const companyId='';
      const startDate=$(startDate).val();
      const endDate=$(endDate).val();
  window.open(
    `${esso_cent_auto}/download_auto_esso_excel?company_id=${companyId}&start_date=${startDate}&end_date=${endDate}`,
    "_blank"
  );
};

    return () => {
      if ($.fn.dataTable.isDataTable("#example"))
        $("#example").DataTable().destroy(true);
    };
  }, [dynamicColumns]);

  
  
  return (
    <Fragment>
      <Breadcrumbs parent="Pricing" title="ESSO Cent Headings Table" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Download ESSO Cent" />
              <CardBody>
                <DownloadEssoCentForm btnTitle="Search"  data={Data} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="ESSO Cent Headings" />
              <ul className="header-dropdown ">
      <li className={`dropdown ${open ? "open" : ""}`}>
        <a
          href="#"
          className="dropdown-toggle"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          Download <i className="fa fa-download"></i>
        </a>
        {open && (
          <ul className="dropdown-menu pull-right show">
            <li>
              <a href="#" >
                <i className="fa fa-file-excel-o text-info"></i> Download Excel
              </a>
            </li>
            <li>
              <a href="#" >
                <i className="fa fa-file-excel-o text-success"></i> Download CSV
              </a>
            </li>
          </ul>
        )}
      </li>
    </ul>
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
