import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Container,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { DiscountType } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import DatePicker from "react-datepicker";
import { useCompany } from "../../../Hooks/Dropdowns";
import {
  ta_group_Tagroup as APINAME,
  ta_group_TagroupInput,
  ta_cent,
} from "../../../api";
import $ from "jquery";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderCard from "../../Common/Component/HeaderCard";
import Loader from "../../../Layout/Loader";

const TaPetroRackCent = ({ title, btnTitle }) => {
  const [companyId, setCompnyId] = useState("");
  const [startDate, setStatrtDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [open, setOpen] = useState(false);
  const { data: company } = useCompany();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  useEffect(() => {
    setLoading(true)
    fetch(APINAME)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicColumns(data.map((item) => Number(item.ibp_adjustment).toFixed(4)));
          setGroupIds(data.map((item) => item.id));
              setLoading(false)

        } 
        else {
          console.error("APINAME response is not an array:", data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Step 2: Initialize DataTable
  useEffect(() => {
    $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {};
      dynamicGroupIds.forEach((groupid) => {
        const inputId = `#c${id}g${groupid}`;
        const value = $(inputId).val();
        updateData[`group_${groupid}`] = value;
      });

      axios.put(`${ta_cent}/${id}`, updateData)
        .then((response) => {
          toast.success("Data updated");
        })
        .catch((error) => {
          toast.error("Error In Data update");
        });
    });
  }, [dynamicColumns, companyId]);

  $(document).ready(function () {
    $("#example").DataTable().clear().destroy();
    GetDataTAble();
  });

  function GetDataTAble() {
    const columns = [
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      ...dynamicColumns.map((col, idx) => ({ data: `col_${idx}`, title: col })),
      { data: "Action", title: "Action", orderable: false },
    ];

    $("#example").DataTable({
      serverSide: true,
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
        params.append("company_id", companyId);
        params.append("from_date", startDate);
        params.append("upto_date", endDate);
        fetch(`${ta_group_TagroupInput}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            const url = `${ta_group_TagroupInput}?${params.toString()}`;
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
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onSubmit = (data) => {
    setLoading(true);
    const basePayload = {
      company_id: data.company.value,
      discount_type: data.discountType.value,
      from: data?.from ? formatDate(data.from) : "",
      to: data?.to ? formatDate(data.to) : "",
    };

    axios
      .post(APINAME, basePayload, {
        params: basePayload,
      })
      .then((res) => {
        
        res.data.success
          ? toast.success(res.data.message)
          : toast.error(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });

    console.log("payload", basePayload); // ✅ This will print your inputs
  };
  return (
    <Fragment>
        <Card>
              <CardBody>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>
            <Form
              className="px-2"
              noValidate=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <Row className="mt-3">
                <Col xl="4" md="6" sm="12">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Company</InputGroupText>
                      <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={company}
                            className="form-control p-0 border-0"
                            placeholder="Select a company"
                          />
                        )}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
             
                <Col xl="3" md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>From</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="from"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                    </FormGroup>
                  </Row>
                </Col>
                <Col xl="3" md="6" sm="12">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col xs="4">
                          <InputGroupText>Upto</InputGroupText>
                        </Col>
                        <Col xs="8">
                          <Controller
                            name="to"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />
                        </Col>
                      </InputGroup>
                    </FormGroup>
                  </Row>
                </Col>

                <Col className="ms-auto" xl="2" md="2" sm="12">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        type: "submit",
                      }}
                    >
                      {btnTitle}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
      </CardBody>
      </Card>
       <Card>
              <CardBody>
                       <HeaderCard title="Rack Cent List" download={true} downloadHeading="Download"/>
      <Container fluid>
        <Row>
          <Col sm="12">
           
                <div className="text-end my-3">
                <button className="btn btn-primary">Delete Rack Cent</button>
                </div>
                { <Loader loading={loading}/>}
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
                        {dynamicColumns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                        ))}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
             
          </Col>
        </Row>
      </Container>
      </CardBody>
    </Card>
    </Fragment>
  );
};

export default TaPetroRackCent;
