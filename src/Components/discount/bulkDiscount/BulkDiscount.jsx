import React from "react";
import Select from "react-select";
import { optionscountry } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import { Row, Col, Form } from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm } from "react-hook-form";
import DatePickerInput from "../../Forms/FormControl/formInput/DatePickerInput";
import DropDown from "../../Forms/FormControl/formInput/DropDown";
import HeaderCard from "../../Common/Component/HeaderCard";
import useCompany from "../../../Hooks/useCompany";
import { useSupplier } from "../../../Hooks/Dropdowns";
import { useCountry } from "../../../Hooks/Dropdowns";

const BulkDiscount = ({ title, btnTitle }) => {
  const { data:supplier } = useSupplier();
  const {data:country}=useCountry()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const onSubmit = (data) => {
    console.log("Form Data:", data); // ✅ This will print your inputs
    // alert("Form submitted successfully!");
  };

  return (
    <>
        <Form noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col xl="3"  md="6" sm="12">
            <DatePickerInput
              name="startDate"
              control={control} // ✅ make sure this is passed
              label="Start Date"
              placeholder="Select start date" // ✅ fixed spelling
              errors={errors}
              required="start Date is required"
               portalId="root"
              popperPlacement="bottom-start"

            />
          </Col>
          <Col xl="3"  md="6" sm="12">
            <DatePickerInput
              name="endDate"
              control={control} // ✅ make sure this is passed
              label="End Date"
              placeholder="Select end date" // ✅ fixed spelling
              errors={errors}
              required="End Date is required"
               portalId="root"
              popperPlacement="bottom-start"
            />
          </Col>

          <Col xl="3"  md="6" sm="12">
            <DropDown
              name="country"
              label="Country"
              errors={errors}
              control={control}
              rules={{ required: "Country is required" }}
              placeholder="Select Country"
              // loading={companyLoading}
              options={country}
               menuPortalTarget={document.body}
                                 styles={{

                menuPortal: base => ({

                  ...base,

                  zIndex: 99999

                })

              }}

            />
          </Col>

          <Col xl="3"  md="6" sm="12">
            <DropDown
              name="supplier"
              label="Supplier"
              errors={errors}
              control={control}
              rules={{ required: "supplier is required" }}
              placeholder="Select supplier"

              // loading={companyLoading}
              options={supplier}
               menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                 styles={{

                menuPortal: base => ({

                  ...base,

                  zIndex: 99999

                })

              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xl="12"  md="12" sm="12">
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
    </>
  );
};

export default BulkDiscount;
