 import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  NotificationStatus,
} from "../Forms/FormWidget/FormSelect2/OptionDatas";
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
import { Btn } from "../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { notification as APINAME, notification } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import Editor from '../Editor/CkEditor'

// import { items as APINAME } from "../../../api"; // API endpoint
const NotificationForm = ({btnTitle ,onDataAdded,Edit,selectedRow,setEdit}) => {

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
        title: selectedRow.title,
        status:
          selectedRow.status == 0
            ? { value: "0", label: "Active" }
            : { value: "1", label: "InActive" },
        description:selectedRow.notification
     
      });
    }
  }, [Edit, selectedRow, reset]);
  const onSubmit = (formData) => {
    console.log("Form Data:", formData);  // ✅ This will print your inputs
console.log(formData)
    const payload = {
      title: formData.title,
      status: formData.status.value,
      notification: formData.description,
      idby:localStorage.getItem("userId")|| 0
      
    };

    if (Edit && selectedRow) {
     
      axios
        .put(`${APINAME}/${selectedRow.id}`, payload)
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
    <>
    <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
      <Row className="mt-3">
        <Col sm="9">
          <FormGroup className=" m-form__group">
            <InputGroup>
              <InputGroupText>Title </InputGroupText>
              <input
                style={{ border: "1px solid #ccc" }}
                className="form-control "
                type="text"
               {...register("title", {
    required: "Required" ,   // ⬅️ validation only when !Edit
  })}
              />
            </InputGroup>
            {errors.title && <span className="text-danger"> Required</span>}
          </FormGroup>
        </Col>
        <Col sm="3">
          <FormGroup className="m-form__group">
            <InputGroup>
              <InputGroupText>Status</InputGroupText>
              <Controller
                name="status"
                rules={{ required: " Required" }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={NotificationStatus}
                    className="form-control p-0 border-0"
                    placeholder="Select Discount Applied"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </InputGroup>

            {errors.status && (
              <span className="text-danger">{errors.status?.message}</span>
            )}
          </FormGroup>
        </Col>
<Col sm={12}>
<Controller
  name="description"
  control={control}
  defaultValue=""
  rules={{ required: "Description is required" }}
  render={({ field }) => (
    <Editor
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>

{errors.description && (
  <span className="text-danger">{errors.description.message}</span>
)}

</Col>
      

        <Col sm="12 my-3">
          <div className="text-end">
            <Btn
              attrBtn={{
                color: "primary",
                className: "m-r-15",
                type: "submit",
              }}
            >
              {Edit?"Update Notification": btnTitle}
            </Btn>
          </div>
        </Col>
      </Row>
    </Form>
    </>
  );
};



export default NotificationForm
