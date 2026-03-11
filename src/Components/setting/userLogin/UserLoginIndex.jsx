import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { user_log as APINAME,download } from "../../../api";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import $ from "jquery";
import 'datatables.net';
import dayjs from "dayjs"; 

import 'datatables.net-fixedcolumns';
const UserLoginIndex = () => {
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
  { data: "ip", title: "Login_IP" },
  { data: "full_address", title: "Address" },
  { data: "country_name", title: "Country" },
  { data: "state", title: "State"},
  { data: "city", title: "City" },
  { data: "login_status", title: "Login_Status" },
  { data: "s_start", title: "Login_Time" },
  { data: "s_end", title: "Logout_Time" },
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
 
  try {
 const response = await fetch(`${APINAME}?${params.toString()}`);
    const tableRes = await response.json();
    // 🔥 Call both APIs together
     console.log(tableRes);
    const tableData = tableRes.data.map((row) => ({
    "id": row.id,
   "user_name":row.user_name,
   "ip":row.ip,
   "full_address":row.full_address,
    "country_name":row.country_name,
    "state":row.state,
    "city":row.city,
    "login_status":row.login_status,
    "s_start":formatDate(row.s_start),
    "s_end":formatDate(row.s_end),
    "dated":formatDate(row.dated,false),
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

  return (
    <Fragment>
      <Breadcrumbs parent="Setting" title="User Login Log"/>
      <Container fluid={true}>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title="User Login Log"
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
                        <th> Address </th>
                        <th>Country </th>
                        <th>State </th> 
                        <th>City </th> 
                        <th>Login_Status </th> 
                        <th>Login_Time </th> 
                        <th>Logout_Time </th> 
                        <th>Dated </th> 
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

export default UserLoginIndex;