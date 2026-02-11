import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { formatDate } from "../../../Hooks/Dropdowns";
import Loader from "../../../Layout/Loader";
import { toast } from "react-toastify";
import {
  tacompany,
  ta_get_rowvalue,
  ta_group_Tagroup as APINAME,
  ta_saverowvalue,
} from "../../../api";
const UpdateFgRack = ({ title, btnTitle }) => {
  const [resetShow, setResetShow] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [dynamicCompany, setDynamicCompany] = useState([]);
  const [loading, setloading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ================= LOAD COMPANIES (ONCE) ================= */

  async function SaveData() {
    setloading(true);
    const pricingDate = document.getElementById("pricingDate").value;
    const idby = localStorage.getItem("userId");
    const dated = formatDate(Date.now()); 
    const gres = await fetch(APINAME);
    const groups = await gres.json();
    if (!Array.isArray(groups)) return;

    const res = await fetch(tacompany);
    const company = await res.json();
    if (!Array.isArray(company)) return;

    company.map((c, cid) => {
      let payload = { company_id: c.company_id || 0 };
      payload["company_name"] = c.company_name;
      payload["pricing_date"] = pricingDate;
      groups.map((g, gid) => {
        const inputName = `group_${g.id}`;
        const inputId = `c${c.company_id}g${g.id}`;
        const rawVal = document.getElementById(inputId)?.value;
        payload[inputName] = rawVal || 0.0;
      });
      payload["idby"] = idby;
      payload["dated"] = dated;
      console.log(c.company_name + " : ", payload);

      axios
        .post(ta_saverowvalue, payload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    toast.success("Rack Cent Updated Succesfully");
    setloading(false);
  }

  /* ================= FORM SUBMIT ================= */
  const onSubmit = async (formData) => {
    setloading(true);
    setResetShow(true);

    try {
      const res = await fetch(APINAME);
      const groups = await res.json();
      if (!Array.isArray(groups)) return;
      setDynamicColumns(groups.map((g) => Number(g.ibp_adjustment).toFixed(4)));
      setGroupIds(groups.map((g) => g.id));
      // 2️⃣ Guard: pricingDate must exist
      if (!formData?.pricingDate) {
        console.warn("pricingDate missing");
        return;
      }

      // 3️⃣ Fetch TA row values (FIXED URL)
      const rowRes = await fetch(
        `${ta_get_rowvalue}?pricing_date=${formatDate(formData.pricingDate)}`,
      );
      const rowData = await rowRes.json();
      if (!Array.isArray(rowData)) return;
      setDynamicCompany(rowData);
      setloading(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  const handleReset = () => {
    reset();
    setResetShow(false);
    setDynamicColumns([]);
  };

  /* ================= RENDER ================= */
  return (
    <Fragment>
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
                <Col lg="4" sm="12">
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
                            rules={{ required: "Please Fill out this field" }}
                            render={({ field }) => (
                              <DatePicker
                                id="pricingDate"
                                className={`form-control `}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />
                          {errors.pricingDate && (
                            <span className="text-danger">
                              {errors.pricingDate.message}
                            </span>
                          )}
                        </Col>
                      </InputGroup>
                    </FormGroup>
                  </Row>
                </Col>

                <Col className="ms-auto" lg="4" sm="12">
                  {!resetShow ? (
                    <Btn
                      attrBtn={{
                        color: "primary",
                        type: "submit",
                      }}
                    >
                      {btnTitle}
                    </Btn>
                  ) : (
                    ""
                  )}
                  {resetShow && (
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  )}
                </Col>
                <Col className="ms-auto" lg="4" sm="12">
                  {resetShow ? (
                    <div className="text-end">
                      <button
                        className="btn btn-primary  mx-2"
                        color="primary"
                        type="button"
                        onClick={() => SaveData()}
                      >
                        Save Rack Pricing
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      {resetShow && (
        <>
          <Loader loading={loading} />
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width="300">Company Name</th>
                  {dynamicColumns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {dynamicCompany.map((company) => {
                  return (
                    <tr key={company.company_id}>
                      <td>{company.company_name}</td>
                      {dynamicGroupIds.map((groupId) => {
                        const groupKey = `group_${groupId}`;
                        return (
                          <td
                            key={`${company.company_id}_${groupKey}`}
                            dangerouslySetInnerHTML={{
                              __html: company[groupKey],
                            }}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-end">
            <button
              className="btn btn-primary  mx-2"
              color="primary"
              type="button"
              onClick={() => SaveData()}
            >
              Save Rack Pricing
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default UpdateFgRack;
