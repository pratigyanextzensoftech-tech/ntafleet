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
import DatePicker from "react-datepicker";
import { 
  ul_group_owner_ulgroupInput,
  ul_owner_cent,
  essocompany,
} from "../../../api";
import $ from "jquery";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderCard from "../../Common/Component/HeaderCard";
import Loader from "../../../Layout/Loader";
const UlOwnerList = ({ title, btnTitle }) => {
  const [companyId, setCompnyId] = useState("");
  const [startDate, setStatrtDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState();
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (company && company.length > 0) {
      setValue("company", company[0]); // set first option
    }
  }, [company, setValue]);

  useEffect(() => {
 
    axios
      .get(essocompany)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const options = [
          { value: "", label: "All Companies" },
          ...data.map((company) => ({
            value: company.company_id,
            label: company.company_name,
          })),
        ];

        setCompany(options);
      })
      .catch((err) => console.error(err));
  }, []);

  // Step 2: Initialize DataTable
  useEffect(() => {
    $(document).on("click", ".update-btn", function () {
      const id = $(this).data("id");
      const updateData = {};

      axios
        .put(`${ul_owner_cent}/${id}`, updateData)
        .then((response) => {
          toast.success("Data updated");
        })
        .catch((error) => {
          toast.error("Error In Data update");
        });
    });
  }, [dynamicColumns, companyId]);

  useEffect(() => {
 
      GetDataTAble();
   
  }, []);

  function GetDataTAble(company_id, pricingDate, rackUs, rackCa) {
    const columns = [
      { data: "company_id", title: "Sr." },
      { data: "company_name", title: "Company Name" },
      { data: "pricing_date", title: "Pricing Date" },
      { data: "rack_ca", title: "	Rack-ON" },
      { data: "rack_qc", title: "Rack-QC,PQ" },
      { data: "rack_us", title: "Rack-Other" },
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
        params.append("rack_qc", rackCa);
        fetch(`${ul_group_owner_ulgroupInput}?${params.toString()}`)
          .then((res) => res.json())
          .then((json) => {
            const url = `${ul_group_owner_ulgroupInput}?${params.toString()}`;
            console.log("🔗 API URL:", url);
            const tableData = json.data.map((row) => {
              const obj = {
                company_name: row[0],
                pricing_date: row[1],
                rack_ca: row[2],
                rack_qc: row[3],
                rack_us: row[4],
                added_by: row[5],
                added_on: row[6], 
                Action: row[8],
              };
                
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
    const company_id = data.company?.value ?? "";
    const pricingDate = data.pricingDate ? formatDate(data.pricingDate) : "";
    const rackUs = data.rackUs ? data.rackUs : "";
    const rackCa = data.rackCa ? data.rackCa : "";
    console.log("Submitting:", {
      company_id,
      pricingDate,
      rackUs,
      rackCa,
    });

    if ($.fn.DataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    } 
    GetDataTAble(company_id, pricingDate, rackUs, rackCa);
    setLoading(false);
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
                    <Col xl="3" md="6" sm="12">
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
                                placeholder="Select Company"
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 99999,
                                  }),
                                }}
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
                            <Col sm="4" xs="12">
                              <InputGroupText>Pricing Date</InputGroupText>
                            </Col>
                            <Col sm="8" xs="12">
                              <Controller
                                name="pricingDate"
                                control={control}
                                render={({ field }) => (
                                  <DatePicker
                                    id="pricingDate"
                                    className={`form-control `}
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    portalId="root"
                                    popperPlacement="bottom-start"
                                  />
                                )}
                              />
                            </Col>
                          </InputGroup>
                        </FormGroup>
                      </Row>
                    </Col>
                    <Col xl="3" md="6" sm="12">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Rack US </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="text"
                            {...register("rackUs")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col xl="3" md="6" sm="12">
                      <FormGroup className=" m-form__group">
                        <InputGroup>
                          <InputGroupText> Rack CA </InputGroupText>
                          <input
                            style={{ border: "1px solid #ccc" }}
                            className="form-control"
                            type="text"
                            {...register("rackCa")}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>

                    <Col className="ms-auto" xl="3" md="12" sm="12">
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
          <HeaderCard
            title="Rack Cent List"
            download={true}
            downloadHeading="Download"
          />
          <Container fluid>
            <Row>
              <Col sm="12">
                <div className="text-end my-3">
                  <button className="btn btn-primary">Delete Rack Cent</button>
                </div>
                {<Loader loading={loading} />}
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
                        <th>Rack_CA </th>
                        <th>Rack_US </th>
                        <th>Added_By </th>
                        <th>Added_On </th> 
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

export default UlOwnerList;
