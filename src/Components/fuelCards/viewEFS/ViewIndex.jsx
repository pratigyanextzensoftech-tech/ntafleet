import React, { Fragment, useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import HeaderCard from "../../Common/Component/HeaderCard";
import { efs_fual_card as APINAME } from "../../../api";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import $ from "jquery";
import 'datatables.net';
import 'datatables.net-fixedcolumns';
const PetroIndex = () => {
  useEffect(() => { 
          GetDataTAble();
  }, []);

  function GetDataTAble() {
     const columns = [
  { data: "cardNumber", title: "Card Number#", render: (data) => data, className: "text-start"},
  { data: "policyNumber", title: "Policy Number" },
  { data: "company_name", title: "companyXRef" },
  { data: "unitNumber", title: "unitNumber" },
  { data: "driverId", title: "driverId" },
  { data: "driverName", title: "driverName" },
  { data: "beingOverridden", title: "BeingOverridden" },
  { data: "status", title: "status" },
  { data: "payrollStatus", title: "PayrollStatus" },
  { data: "payrollUse", title: "PayrollUse" },
  { data: "gpsid", title: "gpsid" },
  { data: "zid", title: "Zid" },
  { data: "infosrc", title: "infosrc" },
  { data: "policySubfleet", title: "plicySubFleet" },
  { data: "cardSubfleet", title: "CardSubfleet" },
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
    "cardNumber": row.cardNumber,
   "policyNumber":row.policyNumber,
   "company_name":row.company_name,
   "unitNumber":row.unitNumber,
    "driverId":row.driverId,
    "driverName":row.driverName,
    "beingOverridden":row.beingOverridden,
    "status":row.status,
    "payrollStatus":row.payrollStatus,
    "payrollUse":row.payrollUse,
    "gpsid":row.gpsid,
    "zid":row.zid,
    "infosrc":row.infosrc,
    "policySubfleet":row.policySubfleet,
    "cardSubfleet":row.cardSubfleet,
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
      <Breadcrumbs parent="Fuel Cards" title=" View EFS Fual Cards"/>
      <Container fluid={true}>
         <Row>
          <Col sm="12">
            <Card>
                <HeaderCard
                  title=" View EFS Fual Cards"
                     downloadHeading="Download"
                    download={true}
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
                        <th>Card Number #</th>
                        <th>Policy Number</th>
                        <th>companyXRef</th>
                        <th> unitNumber </th>
                        <th>driverId </th>
                        <th>driverName </th> 
                        <th>BeingOverridden </th> 
                        <th>status </th> 
                        <th>PayrollStatus </th> 
                        <th>PayrollUse </th> 
                        <th>gpsid </th> 
                        <th>Zid </th> 
                        <th>infosrc </th> 
                        <th>plicySubFleet </th> 
                        <th>CardSubfleet </th> 
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

export default PetroIndex;