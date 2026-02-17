import React, { Fragment,useState,useEffect } from "react";
import { Breadcrumbs } from "../../../AbstractElements";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import HeaderCard from "../../Common/Component/HeaderCard";
import { tableColumns, dummytabledata } from "../../../Data/Table/Defaultdata";
import DataTableComponent from "../../Tables/DataTable/DataTableComponent";
import CompanyInfoForm from "./CompanyInfoForm";
import { fual_card, fual_card_update } from "../../../api";
import axios from "axios";
import { useForm } from "react-hook-form";
import $ from "jquery";
import { toast } from "react-toastify";
const CompanyInfo = () => {
    const {
      register,
      control,
      setValue,
      handleSubmit,
      formState: { errors, isSubmitted, isValid },
    } = useForm({
      defaultValues: {
        company: null,
      },
    });
   const [loading, setLoading] = useState(false);
 useEffect(() => {
  $(document).off("click", ".update-btn");   
  $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {}; 
      const rack_ca = document.getElementById(`rack_ca${id}`).value;
      const rack_us = document.getElementById(`rack_us${id}`).value;
      updateData.rack_ca=rack_ca;
      updateData.rack_us=rack_us; 
    axios
      .put(`${fual_card}/${id}`, updateData)
      .then(() => {
        toast.success("Data updated");
      })
      .catch(() => {
        toast.error("Error In Data update");
      });
  }); 
  return () => {   $(document).off("click", ".update-btn"); }; 
  }, []);
    function GetDataTAble(company_id, pricingDate, rackUs, rackCa) {
    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      { data: "rack_ca", title: "Rack_CA" },
      { data: "rack_us", title: "Rack_US" },
      { data: "added_by", title: "Added_By" },
      { data: "added_on", title: "Added_On" }, 
      { data: "Action", title: "Action", orderable: false },
    ];

    $("#example").DataTable({
      serverSide: true,
      destroy: true,
      processing: true,
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 25,
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
        params.append("company_id", company_id ? company_id : "");
        params.append("pricing_date", pricingDate);
        params.append("rack_us", rackUs);
        params.append("rack_ca", rackCa);
        fetch(`${fual_card_update}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            const url = `${fual_card_update}?${params.toString()}`;
            console.log("🔗 API URL:", url);
            const tableData = json.data.map((row) => {
              // const obj = {
              //   company_name: row[0],
              //   pricing_date: row[1],
              //   rack_ca: row[2],
              //   rack_us: row[3],
              //   added_by: row[4],
              //   added_on: row[5], 
              //   Action: row[7],
              // };
                
              // return obj;
            });
            console.log(tableData);

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
  }

  useEffect(() => {
 
      GetDataTAble();
   
  }, []);
    const onSubmit = (data) => {
    setLoading(true);
    // const company_id = data.company?.value ?? "";
    // const pricingDate = data.pricingDate ? formatDate(data.pricingDate) : "";
    // const rackUs = data.rackUs ? data.rackUs : "";
    // const rackCa = data.rackCa ? data.rackCa : "";
    // console.log("Submitting:", {
    //   company_id,
    //   pricingDate,
    //   rackUs,
    //   rackCa,
    // });

    if ($.fn.DataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    } 
    // GetDataTAble(company_id, pricingDate, rackUs, rackCa);
    setLoading(false);
  };
  return (
    <Fragment>
      <Breadcrumbs parent="Company" title="Company Info" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <HeaderCard title="Filter" />
              <CardBody>
                <CompanyInfoForm btnTtitle="Search Data" btnTtitle1="Reset"  onSubmit={handleSubmit(onSubmit)}/>
              </CardBody>
            </Card>
          </Col>
        </Row> 
    
      </Container>
    </Fragment>
  );
};

export default CompanyInfo;
