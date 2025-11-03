import React, { Fragment, useState,useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { useSupplier } from "../../../Hooks/Dropdowns";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { supplier } from "../../Forms/FormWidget/FormSelect2/OptionDatas";
import HeaderCard from "../../Common/Component/HeaderCard";
import DatePicker from "react-datepicker";
import Papa from "papaparse";
import axios from "axios";
import { ta_pricing,ta_pricing_actual } from "../../../api";
import dayjs from "dayjs";
import { toast } from "react-toastify";
const TaPetro = ({ title, btnTtitle,type }) => {
   const [csvData, setCsvData] = useState([]);
      const [file, setFile] = useState(null);
      const [pricingDate, setPricingDate] = useState(new Date());
      const { data: suppliers, loading } = useSupplier();
    
      const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          supplier: null,
          pricingDate: new Date(),
        },
      });
  
  useEffect(() => {
      if (suppliers.length > 0) {
        setValue("supplier", suppliers[1]); // pick first by default
      }
    }, [suppliers, setValue]);
  
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setFile(file);

  Papa.parse(file, {
    header: false, // first parse raw lines
    skipEmptyLines: true,
    complete: (results) => {
      console.log("📄 Raw parsed rows:", results.data.slice(0, 5));

      // Find the real header row (look for "Type" or "#")
      const headerIndex = results.data.findIndex(
        (row) => row.includes("Type") || row.includes("#")
      );

      if (headerIndex === -1) {
        console.error("❌ Could not find a valid header row in CSV!");
        return;
      }

      const headers = results.data[headerIndex];
      const dataRows = results.data.slice(headerIndex + 1);

      // ✅ Re-parse from correct header row
      const parsed = Papa.parse(Papa.unparse([headers, ...dataRows]), {
        header: true,
        skipEmptyLines: true,
      });

      console.log("✅ Fixed Headers:", headers);
      console.log("✅ First Row:", parsed.data[0]);

      setCsvData(parsed.data);
    },
  });
};

  
  const formatDate = (value) => {
    if (!value) return "-";
    return dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "-";
  };
  
    // 🧰 Key rename logic
    const keyMap = {
      "Type": "loc_type",
      "#": "loc_id",
      "Travel Center": "travel_center",
      "ST": "st",
      "Merchant ID": "merchant_id",
      "(City/State)": "city_state",
      "Rack ID": "rack_id",
      "Dispensed": "product_dispensed",
      "Index": "index",
      "Freight": "freight",
      "Adjustment": "Adjustment",
      "Fuel Price": "fuel_price",
      "Savings": "saving_total",
      "Price": "bulk_def_price",
    };
  
    const renameKeys = (row, keyMap) => {
    const newRow = {};
    for (const key in row) {
      const trimmedKey = key.trim(); // 🧹 remove leading/trailing spaces
      const newKey = keyMap[trimmedKey] || trimmedKey;
      newRow[newKey] = row[key];
    }
    return newRow;
  };
  

      const onSubmit = async (data) => {
    if (!file) {
      alert("Please upload a CSV file first.");
      return;
    }

    // ✅ Transform the CSV data
    const enrichedData = csvData.map((row) => {
      const renamed = renameKeys(row, keyMap);
      return {
        ...renamed,
        supplier: data.supplier?.label,
        pricing_date: formatDate(pricingDate),
        idby: 1,
        dated: Date.now(),
      };
    });
    

    console.log("🧾 Final Data Sent:", enrichedData);
if(type==="taPetroAtual"){
 try {
      const response = await axios.post(ta_pricing_actual, enrichedData);
      console.log("✅ Upload Success:", response.data);
      toast.success(`Upload successful! ${response.data.count || ""}`)
      // alert(`Upload successful! ${response.data.count || ""}`);
    } catch (error) {
      console.error("❌ Upload Error:", error);
            toast.error(`Upload failed: ${error.response?.data?.error || error.message}`)

      // alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
}
   else{
     try {
      const response = await axios.post(ta_pricing, enrichedData);
      console.log("✅ Upload Success:", response.data);
      toast.success(`Upload successful! ${response.data.count || ""}`)
      // alert(`Upload successful! ${response.data.count || ""}`);
    } catch (error) {
      console.error("❌ Upload Error:", error);
            toast.error(`Upload failed: ${error.response?.data?.error || error.message}`)

      // alert(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
   }
  };
 
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
                <Col sm="3">
                  <Row>
                    <Col className="pe-0" sm="3">
                      {" "}
                      <InputGroupText>File</InputGroupText>
                    </Col>
                    <Col className="px-0" sm="9">
                      <Input
                        type="file"
                        className="form-control"
                        style={{ border: "1px solid #ccc" }}
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm="3">
                  <Row>
                    <FormGroup className="m-form__group">
                      <InputGroup>
                        <Col sm="3">
                          <InputGroupText>Pricing Date</InputGroupText>
                        </Col>
                        <Col sm="9">
                           <Controller
                          name="pricingDate"
                          control={control}
                          rules={{ required: "Pricing Date is required" }}
                          render={({ field }) => (
                            <DatePicker
                              className="form-control"
                              selected={pricingDate}
                              onChange={(date) => {
                                setPricingDate(date);
                                field.onChange(date);
                              }}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="Select Pricing Date"
                            />
                          )}
                        />
                        </Col>
                      </InputGroup>

                      {errors.pricingDate && (
                        <span className="text-danger">
                          {errors.pricingDate.message}
                        </span>
                      )}
                    </FormGroup>
                  </Row>
                </Col>
                <Col sm="3">
                  <FormGroup className="m-form__group">
                    <InputGroup>
                      <InputGroupText>Supplier</InputGroupText>
                      <Controller
                        name="supplier"
                        control={control}
                        rules={{ required: "Supplier is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="form-control p-0 border-0"
                            placeholder="Select supplier"
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                            value={field.value}
                          />
                        )}
                      />
                    </InputGroup>

                    {errors.supplier && (
                      <span className="text-danger">
                        {errors.supplier?.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>

                <Col sm="3">
                  <div className="text-end">
                    <Btn
                      attrBtn={{
                        color: "primary",
                        className: "m-r-15",
                        type: "submit",
                      }}
                    >
                      {btnTtitle}
                    </Btn>
                  </div>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TaPetro;
