import React, { useState,useEffect } from "react";
import {
  Row,
  Col,
  Form,
 
} from "reactstrap";
import { esso_rack } from "../../../api";
import { Btn } from "../../../AbstractElements";
import { useForm } from "react-hook-form";
import InputText from "../../Forms/FormControl/formInput/InputText";
import { toast } from "react-toastify";
import axios from "axios";
const DownloadEssoCentForm = ({ btnTitle,handleAdd,Edit,selectedRow,setEdit,onDataAdded }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted, isValid},
  } = useForm({
    defaultValues:{
      name:"",
      value:"",
      ord:"",
      rack:""
    }
  });
useEffect(() => {
    if (Edit && selectedRow) {
        console.log(selectedRow)
      reset({
        name: selectedRow.name,
        ord: selectedRow.ord, 
        value: selectedRow.val , // prefill dropdown
        rack: selectedRow.rack , // prefill dropdown
      });
    }
  }, [Edit, selectedRow, reset]);
const onSubmit = async (formData) => {
  console.log(formData)
  const payload={
    name:formData.name,
    val:formData.value,
    rack:formData.ord,
    ord:formData.rack
  }
    if (Edit && selectedRow) {
          axios.put(`${esso_rack}/${selectedRow.id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
   name:"",
      value:"",
      ord:"",
      rack:""
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    }
    else{
   try {
     
        const res = await axios.post(esso_rack, payload);
        console.log("✅ User Added:", res.data);
        toast.success("User added successfully!");
  
       
      }
  
    
    catch (error) {
      console.error("❌ Error submitting form:", error);
      toast.error("Something went wrong!");
    }
    handleAdd(formData)

  }
};
  return (
    <fieldset className="inputField">
      <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col xxl="3"  xl="4"  md="6" sm="12">
            <InputText
              name="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              rules={!Edit &&{ required: "Name is required" }}
            />
          </Col>
          <Col xxl="3"  xl="4"  md="6" sm="12">
            <InputText
              name="value"
              label="Value"
              type="text"
              register={register}
              errors={errors}
              rules={!Edit && { required: "Required" }}
            />
          </Col>
          <Col xxl="3"  xl="4"  md="6" sm="12">
            <InputText
              name="ord"
              label="Ord"
              type="text"
              register={register}
              errors={errors}
              rules={!Edit &&{ required: "Required" }}
            />
          </Col>
          <Col xxl="3"  xl="4"  md="6" sm="12">
            <InputText
              name="rack"
              label="Rack"
              type="text"
              register={register}
              errors={errors}
              rules={!Edit &&{ required: "Required" }}
            />
          </Col>
          <Col className="ms-auto" xxl="3"  xl="4"  md="6" sm="12">
            <div className="text-end">
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "m-r-15",
                  type: "submit",
                }}
              >
                {Edit?"Update":btnTitle}
              </Btn>
            </div>
          </Col>
        </Row>
      </Form>
    </fieldset>
  );
};

export default DownloadEssoCentForm;
