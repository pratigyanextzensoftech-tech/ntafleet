import React, { useState } from "react";
import Select from "react-select";
import {
  groupBy,
  optionscountry,
  displayFeatureCheckBox,
  chooseSupplierCheckBox,
  optionscompany,
  invoiceType,
  orderBy,
  fuelType,
  currency,
  InvoiceCategory,
  InvoiceShow,
  exportType,
  VolUnit,
} from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import InputText from "../../Forms/FormControl/formInput/InputText";
const DownloadEssoCentForm = ({ btnTitle }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showMessage, setShowMessage] = useState(true);

  const {
    register,

    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
    if (isValid) {
      setShowMessage(false); // hide only when form is completely valid
    }
  };

  return (
    <fieldset className="inputField">
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col sm="3">
            <InputText
              name="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Name is required" }}
            />
          </Col>

          <Col sm="2">
            <InputText
              name="value"
              label="Value"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>

          <Col sm="2">
            <InputText
              name="ord"
              label="Ord"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>
         
          <Col sm="2">
            <InputText
              name="rack"
              label="Rack"
              type="text"
              register={register}
              errors={errors}
              rules={{ required: "Required" }}
            />
          </Col>
          <Col sm="2">
            <div className="text-end">
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "m-r-15",
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
  );
};

export default DownloadEssoCentForm;
