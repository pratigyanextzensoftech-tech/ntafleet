import React, { useEffect } from 'react'
import { Form, Row, Col, Card, CardBody, FormGroup, Input, InputGroupText ,InputGroup} from 'reactstrap'
import { Btn } from '../../../AbstractElements';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InputText from '../../Forms/FormControl/formInput/InputText';
import { supplier } from '../../../api';
import { toast } from 'react-toastify';
const SupplierList = ({btntitle,btnTitle1,onDataAdded,Edit,selectedRow,setEdit}) => {

     const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors, isSubmitted, isValid },
        } = useForm({
          defaultValues:{
            supplier:""
          }
        });
     useEffect(() => {
    if (Edit && selectedRow) {
      reset({
        supplier: selectedRow["Supplier Name"], // 👈 key from columnsMap in Index.jsx
      });
    }
  }, [Edit, selectedRow, reset]);
      const onSubmit = (formData) => {
    const payload = {
      supplier_name: formData.supplier,
      st: 0,
    };

    if (Edit && selectedRow) {
      // ✅ Update existing supplier
      axios.put(`${supplier}/${selectedRow.id}`, payload)
        .then((res) => {
          toast.success("Supplier updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
            supplier:""
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
    } else {
      // ✅ Add new supplier
      axios.post(supplier, payload)
        .then((res) => {
          toast.success("Supplier added successfully!");
          if (onDataAdded) onDataAdded();
          reset();
        })
        .catch((err) => {
          toast.error("Add failed!");
          console.error(err);
        });
    }
  };
    return (
        <div>
            <Form noValidate='' onSubmit={handleSubmit(onSubmit)} className="form theme-form">
                <CardBody>
       
<Row>
 
                 <Col sm='9'>
                   <InputText
            name="supplier"
            label="Supplier Name"
            type="text"
            register={register}
            errors={errors}
            rules={{ required: "Required" }}
            
          />
                   
                  </Col>
             

                        <Col sm="3">

                            <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{Edit?"Update":btntitle}</Btn>
                                 <button  type="reset" className='btn btn-secondary'>{btnTitle1}</button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Form>
        </div>
    )
}

export default SupplierList
