import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { user_tracking as APINAME } from "../../../api";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import $ from "jquery";
import 'datatables.net';
import dayjs from "dayjs"; 
import 'datatables.net-fixedcolumns';
const ListIndex = () => {
   const formatDate = (value, withTime = true) => {
    if (!value) return "-";
    const format = withTime ? "DD-MM-YYYY HH:MM" : "DD-MM-YYYY";
    return dayjs(value).isValid() ? dayjs(value).format(format) : "-";
  };
  
  useEffect(() => { 
          GetDataTAble();
  }, []);

  function GetDataTAble() {
     const columns = [
  { data: "id", title: "Sr.No", className: "text-start"},
  { data: "user_name", title: "User Name" },
  { data: "user_ip", title: "Login_IP" },
  { data: "menu_name", title: "Menu" },
  { data: "menu_link", title: "Link" },
  { data: "type", title: "Type"},
  { data: "dated", title: "Dated" },
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
  Object.keys(searchValues).forEach((key) => {
    params.append(key, searchValues[key] || "");
  });
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    const tableData = tableRes.data.map((row) => ({

    "id": row.id,
   "user_name":row.user_name,
   "user_ip":row.user_ip,
   "menu_name":row.menu_name,
    "menu_link":row.menu_link,
    "type":row.type,
    "dated":formatDate(row.dated),
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
let debounceTimer; // define outside the function so it persists
const searchValues = {};
const handleInputChange = (e) => {
  const key = e.target.name; // e.g., 'name', 'link', 'status'
  const value = e.target.value;
  searchValues[key] = value; // store value by name

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    console.log("Fetching table with search values:", searchValues);
    GetDataTAble();
  }, 1000); // 500ms after last keystroke
}
  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="Track Visitors"/>
      <Container fluid={true}>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="Track Visitors"
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
                        <th>Sr.No</th>
                        <th>User Name </th>
                        <th>Login_IP </th>
                        <th> Menu </th>
                        <th>Link </th>
                        <th>Type </th> 
                        <th>Dated </th> 
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

export default ListIndex;