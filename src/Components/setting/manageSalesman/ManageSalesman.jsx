
import React, { Fragment,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Btn } from "../../../AbstractElements";
import InputText from '../../Forms/FormControl/formInput/InputText';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { salesman as APINAME } from '../../../api';

const ManageSalesman = ({onDataAdded,Edit,selectedRow,setEdit}) => {
  const addedBy=localStorage.getItem("userId")
        const {
            register,
            control,
            reset,
            handleSubmit,
            formState: { errors },
        } = useForm({
          defaultValues:{
            name:"",
            email:"",
            phone:"",
            address:""
          }
        });
         useEffect(() => {
            if (Edit && selectedRow) {
              console.log(selectedRow)
              reset({
                name: selectedRow.name, // 👈 key from columnsMap in Index.jsx
                email: selectedRow.email, // 👈 key from columnsMap in Index.jsx
                phone: selectedRow.phone, // 👈 key from columnsMap in Index.jsx
                address: selectedRow.address, // 👈 key from columnsMap in Index.jsx
              });
            }
          }, [Edit, selectedRow, reset]);
            const onSubmit = (formData) => {
                                console.log("Form Data:", formData);  // ✅ This will print your inputs
        
             const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
                pic:"",
                created:new Date(),
                status:0,
                admin_del:0,
                added_by:addedBy
             }
             if (Edit && selectedRow) {
      // ✅ Update existing supplier
      axios.put(`${APINAME}/${selectedRow.id}`, payload)
        .then((res) => {
          toast.success(" updated successfully!");
          if (onDataAdded) onDataAdded();
          setEdit(false);
          reset({
             name:"",
            email:"",
            phone:"",
            address:""
          });
        })
        .catch((err) => {
          toast.error("Update failed!");
          console.error(err);
        });
      }
      else{
    axios.post(APINAME, payload)
  .then((res) => {
    console.log(res.data);
    toast.success("Added successfully!");
    reset();

    // ✅ Immediately update UI
    if (onDataAdded) onDataAdded(res.data); 
  })
  .catch((err) => {
    console.log(err);
    toast.error(err.message);
  });
      }
    }       
    return (
        <Fragment >
                    <Form noValidate='' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col xxl="4"  md="6" sm="12">
                                  <InputText
            name="name"
            label="Name"
            type="text"
            register={register}
            errors={errors}
            // rules={{ required: "Required" }}
          />
                               
                            </Col>
                            <Col xxl="4"  md="6" sm="12">
                                <InputText
            name="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            // rules={{ required: "Required" }}
          />
                              
                            </Col>
                            <Col xxl="4"  md="6" sm="12">
                                <InputText
            name="phone"
            label="Phone"
            type="number"
            register={register}
            errors={errors}
            // rules={{ required: "Required" }}
          />
                              
                            </Col>
                      
                            <Col xxl="4"  md="6" sm="12">
                                  <InputText
            name="address"
            label="Address"
            type="text"
            register={register}
            errors={errors}
            // rules={{ required: "Required" }}
          />
                            
                            </Col>
                            
                           
                           
                            

                        
                        <Col xxl="8"  md="12" sm="12">
                         <div className='text-end'>
                                <Btn attrBtn={{ color: "primary", className: "m-r-15 ", type: "submit" }} >{Edit?"Update":"Add Sales Man"}</Btn>
                </div>
                        </Col>
                 </Row>
                                  </Form>
                

               
          
{/* </div> */}
        </Fragment>
    );
};

export default ManageSalesman;