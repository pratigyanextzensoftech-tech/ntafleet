import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  optionscompany,
  companyLoginAccess,
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
  Container,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import axios from "axios";
import { toast } from "react-toastify";
import { items as APINAME } from "../../../api"; // API endpoint

const AddItems = ({ btnTitle, onDataAdded, Edit, selectedRow, setEdit }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm();
  useEffect(() => {
    if (Edit && selectedRow) {
      console.log(selectedRow);
      reset({
        Name: selectedRow.item_name,
        discount:
          selectedRow.discount == 0
            ? { value: "0", label: "Yes" }
            : { value: "1", label: "No" },

        tax:
          selectedRow.tax == 0
            ? { value: "0", label: "Yes" }
            : { value: "1", label: "No" },
      });
    }
  }, [Edit, selectedRow, reset]);
  const onSubmit = (formData) => {
    // console.log("Form Data:", formData);  // ✅ This will print your inputs
console.log(formData)
    const payload = {
      item_name: formData.Name,
      discount_applied: formData.discount.value,
      tax_applied: formData.tax.value,
      fee: "",
    };

    if (Edit && selectedRow) {
     
      axios
        .put(`${APINAME}/${selectedRow.item_id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
            Name: "",
            discount: "",
            tax: "",
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    } else {
      axios
        .post(APINAME, payload)
        .then((res) => {
          console.log(res);
          toast.success("Add successfully!");
          reset();

          // ✅ Immediately update UI
          if (onDataAdded) onDataAdded(res.data);
          reset();

          // if (onDataAdded) onDataAdded();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };
  const handleReset = () => {
    reset(); // reset all fields back to defaultValues (or empty if none given)
  };

 
  return (
    <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-3">
        <Col  xl="3"  lg="4" md="6" sm="12">
          <FormGroup className=" m-form__group">
            <InputGroup>
              <InputGroupText>Item Name </InputGroupText>
              <input
                style={{ border: "1px solid #ccc" }}
               placeholder="Enter Item "

                className="form-control "
                type="text"
               {...register("Name", {
    required: !Edit ? "Required" : false,   // ⬅️ validation only when !Edit
  })}
              />
            </InputGroup>
            {errors.Name && <span className="text-danger"> Required</span>}
          </FormGroup>
        </Col>
        <Col  xxl="3" lg="4"   md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Discount Applied</InputGroupText>
              <Controller
                name="discount"
                rules={!Edit &&{ required: " Required" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={companyLoginAccess}
                    className="form-control p-0 border-0"
                    placeholder="Select Discount "
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>

            {errors.discount && (
              <span className="text-danger">{errors.discount?.message}</span>
            )}
          </FormGroup>
        </Col>

        <Col  xxl="3" lg="4"   md="6" sm="12">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Tax Applied</InputGroupText>
              <Controller
                name="tax"
                rules={!Edit &&{ required: " Required" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={companyLoginAccess}
                    className="form-control p-0 border-0"
                    placeholder="Select Tax Applied"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>

            {errors.tax && (
              <span className="text-danger">{errors.tax?.message}</span>
            )}
          </FormGroup>
        </Col>

        <Col  xxl="3" lg="12"   md="6" sm="12">
          <div className="text-end">
            <Btn
              attrBtn={{
                color: "primary",
                className: "m-r-15",
                type: "submit",
              }}
            >
              {Edit ? "Update" : btnTitle}
            </Btn>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default AddItems;
