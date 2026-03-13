import React, { Fragment, useState, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { petro_retail as APINAME,download } from "../../../api";
import PetroForm from "./PetroForm";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
import {formatDate} from '../../../Hooks/Dropdowns'
const PetroIndex = () => {
 const from = document.querySelector('[name="from"]')?.value;
const to = document.querySelector('[name="to"]')?.value;
const formatDateOnly = (value) => {
  if (!value) return "";
  const d = new Date(value);
  // if (isNaN(d)) return value; // safety
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};
  useEffect(() => { 
          GetDataTAble(from,to);
  }, []);

  function GetDataTAble(from,to) {
     const columns = [
  { data: "timestamp", title: "Price Date", render: (data) => formatDate(data), className: "text-start"},
  { data: "Site_Name", title: "Location Name" },
  { data: "Site_City", title: "City" },
  { data: "Site_State", title: "State" },
  { data: "Site_Country", title: "Country" },
  { data: "Site_Price", title: "Price", render: (data) => data, className: "text-start" },
  { data: "timestamp", title: "Added Date" },
];

    $("#example").DataTable({
      serverSide: true,
      destroy: true,
      processing: true,
      paging: true,
      searching: true,
      ordering: true,
     scrollX: true,
         scrollCollapse: true,
          fixedColumns: { leftColumns: 1},
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

    ajax: async function (data, callback) {
  const params = new URLSearchParams();
  params.append("start", data.start);
  params.append("length", data.length);
  params.append("search", data.search.value || "");
  params.append("orderColumn", data.columns[data.order[0].column].data);
  params.append("orderDir", data.order[0].dir);
  params.append("from", from?from :"");
  params.append("to", to?to:"");
    Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
 
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    const tableData = tableRes.data.map((row) => ({
    "timestamp": row.timestamp,
   "Site_Name":row.Site_Name,
   "Site_City":row.Site_City,
   "Site_State":row.Site_State,
    "Site_Country":row.Site_Country,
    "Site_Price":row.Site_Price,
    "added_date":row.timestamp,
    }));
    console.log(tableData);
    
    callback({
      draw: data.draw,
      recordsTotal: tableRes.recordsTotal,
      recordsFiltered: tableRes.recordsFiltered,
      data: tableData,
    });
  }
  catch (error) {

    console.error("Error:", error);
    callback({
      draw: data.draw,
      recordsTotal: 0,
      recordsFiltered: 0,
      data: [],
    });
  }
},
    });
  }

 const handleSearch = (formData) => {
 const from =  formData.from ||"";
 const to =  formData.to ||"";
 console.log(formData);
 

    GetDataTAble(from,to); // fetch new data immediately
  };
   let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);
    GetDataTAble(from,to);
  }, 1000); // 500ms after last keystroke
}
  return (
    <Fragment>
      <Breadcrumbs parent="Retail Prices" title="Petro Retail Price" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                       <PetroForm btnTitle="Search Data" btnTitle1="Reset" onSearch={handleSearch}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="Petro Retail List"
                  downloadCsv="Download CSV"
                   ShowdwonloadCsv={true}
                  ShowloadData={true}
                  loadData="Load Data"
                />
             
              <CardBody>
          <div style={{"width":"100%", "overflow":"auto"}} >
                  <table
                    id="example"
                    className="display table table-striped table-bordered nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Price Date</th>
                        <th>Location Name </th>
                        <th>City </th>
                        <th> State </th>
                        <th>Country </th>
                        <th>Price </th> 
                        <th>Added Date </th> 
                      </tr>
                    </thead>
                      <tr>
                    <th><input type="text" name="input1" id="1" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input2" id="2" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input3" id="3" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input4" id="4" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input5" id="5" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input6" id="6" onChange={handleInputChange} className="input-search"/></th>
                    <th><input type="text" name="input7" id="7" onChange={handleInputChange} className="input-search"/></th>
                  
                  </tr>
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

export default PetroIndex;