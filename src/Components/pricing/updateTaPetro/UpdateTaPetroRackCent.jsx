import React, { Fragment, useState, useEffect } from "react";
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

import {
  tacompany,
  ta_group_Tagroup as APINAME,
  ta_centValue,
} from "../../../api";

const UpdateTaPetroRackCent = ({ title, btnTitle }) => {
  const [resetShow, setResetShow] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState([]);
  const [dynamicGroupIds, setGroupIds] = useState([]);
  const [dynamicCompany, setDynamicCompany] = useState([]);
  const [cellValues, setCellValues] = useState({});

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ================= LOAD COMPANIES (ONCE) ================= */
  useEffect(() => {
    fetch(tacompany)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicCompany(data);
        }
      })
      .catch(console.error);
  }, []);

  /* ================= FORM SUBMIT ================= */
  const onSubmit = async (formData) => {
    setResetShow(true);

    try {
      const res = await fetch(APINAME);
      const groups = await res.json();

      if (!Array.isArray(groups)) return;

      setDynamicColumns(
        groups.map((g) => Number(g.ibp_adjustment).toFixed(4))
      );
      setGroupIds(groups.map((g) => g.id));

      // Fetch cell values
      fetchAllCellValues(groups.map((g) => g.id), formData.pricingDate);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FETCH ALL CELL VALUES ================= */
  const fetchAllCellValues = async (groupIds, pricingDate) => {
    const map = {};

    for (const company of dynamicCompany) {
      for (const groupId of groupIds) {
        try {
          const res = await fetch(
            `${ta_centValue}?company_id=${company.company_id}&group_id=${groupId}&pricing_date=${pricingDate
              .toISOString()
              .slice(0, 10)}`
          );
          const data = await res.json();

          map[`${company.company_id}_${groupId}`] = data?.value
            ? Number(data.value).toFixed(4)
            : "0.0000";
        } catch {
          map[`${company.company_id}_${groupId}`] = "0.0000";
        }
      }
    }

    setCellValues(map);
  };

  const handleReset = () => {
    reset();
    setResetShow(false);
    setDynamicColumns([]);
    setCellValues({});
  };

  /* ================= RENDER ================= */
  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-3">
                <Col lg="5">
                  <FormGroup>
                    <InputGroup>
                      <InputGroupText>Pricing Date</InputGroupText>
                      <Controller
                        name="pricingDate"
                        control={control}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <DatePicker
                            className="form-control"
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="yyyy-MM-dd"
                          />
                        )}
                      />
                    </InputGroup>
                    {errors.pricingDate && (
                      <span className="text-danger">
                        {errors.pricingDate.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col lg="7">
                  <Btn color="primary" type="submit">
                    {btnTitle}
                  </Btn>
                  {resetShow && (
                    <Btn
                      color="secondary"
                      className="mx-2"
                      onClick={handleReset}
                    >
                      Reset
                    </Btn>
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
                {dynamicCompany.map((company) => (
                  <tr key={company.company_id}>
                    <td>{company.company_name}</td>

                    {dynamicGroupIds.map((groupId, idx) => (
                      <td key={idx}>
                        <input
                          type="text"
                          value={
                            cellValues[
                              `${company.company_id}_${groupId}`
                            ] || ""
                          }
                          readOnly
                          style={{
                            width: "60px",
                            fontSize: "11px",
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-end">
            <Btn color="primary">Save Rack Pricing</Btn>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default UpdateTaPetroRackCent;
