import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../../Hooks/Dropdowns";
import { esso_cent_upload,esso_group_essogroup } from "../../../api";
const UploadEssoGroupRackForm = ({ title, btnTitle }) => {
  // React Hook Form (only for date)
  const { control } = useForm();

  // Local state
  const [csvFile, setCsvFile] = useState(null);
  const [csvRows, setCsvRows] = useState([]);
  const [pricingDate, setPricingDate] = useState(null);
  const [groupMap, setGroupMap] = useState({});
  const [loadingGroups, setLoadingGroups] = useState(false);

  // 🔹 FETCH GROUP MASTER
  useEffect(() => {
    setLoadingGroups(true);

    axios
      .get(esso_group_essogroup)
      .then((res) => {
        const map = {};
        res.data.forEach((g) => {
          map[g.name.trim().toLowerCase()] = g.id;
        });
        setGroupMap(map);
      })
      .catch(() => {
        toast.error("Failed to load group master");
      })
      .finally(() => {
        setLoadingGroups(false);
      });
  }, []);

  // 🔹 PREVIEW CSV + RENAME KEYS
  const previewCSV = () => {
    if (!pricingDate) {
      toast.error("Please select pricing date");
      return;
    }

    if (!csvFile) {
      toast.error("Please select a CSV file");
      return;
    }

    if (!Object.keys(groupMap).length) {
      toast.error("Group master not loaded yet");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (!result.data.length) {
          toast.error("CSV is empty");
          return;
        }

        const normalizeKey = (key) =>key.replace(/\(.*?\)/g, "").trim().toLowerCase();

        const transformedRows = result.data.map((row) => 
        {
          const newRow = {}; 
          const keys = Object.keys(row);  
          newRow.company_name = row[keys[0]]; 
          newRow.company_id = row[keys[1]]; 
          keys.slice(1).forEach((key) => 
          {
            const cleanKey = normalizeKey(key); 
            if (groupMap[cleanKey]) 
            {
              newRow[`group_${groupMap[cleanKey]}`] =row[key] === "" ? null : Number(row[key]);
            }
          });
 
              newRow['pricing_date']= String(formatDate(pricingDate) || "").trim();
              newRow['idby']= Number(localStorage.getItem("userId"));
              newRow['dated']= String(formatDate(Date.now()));

          return newRow;
        });

        

         try {
      const response =   axios.post(esso_cent_upload, transformedRows); 
      toast.success(`Upload successful!`)
     
       setPricingDate("");
     
    } catch (error) 
    {
      
      
          toast.success(`Upload successful!`)
            
    }

      },
      error: () => toast.error("Failed to read CSV"),
    });
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <fieldset>
            <legend>{title}</legend>

            <Form className="px-2">
              <Row className="mt-3">
                {/* PRICING DATE */}
                <Col xl="4" md="6" sm="12">
                  <FormGroup>
                    <InputGroup>
                      <Col xs="4">
                        <InputGroupText>Pricing Date</InputGroupText>
                      </Col>
                      <Col xs="8">
                        <Controller
                          name="pricingDate"
                          control={control}
                          render={() => (
                            <DatePicker
                              className="form-control"
                              selected={pricingDate}
                              onChange={setPricingDate}
                              dateFormat="yyyy-MM-dd"
                            />
                          )}
                        />
                      </Col>
                    </InputGroup>
                  </FormGroup>
                </Col>

                {/* CSV FILE */}
                <Col xl="4" md="6" sm="12">
                  <FormGroup>
                    <InputGroup>
                      <Col xs="3">
                        <InputGroupText>CSV File</InputGroupText>
                      </Col>
                      <Col xs="9">
                        <Input
                          type="file"
                          accept=".csv"
                          onChange={(e) =>
                            setCsvFile(e.target.files[0] || null)
                          }
                        />
                      </Col>
                    </InputGroup>
                  </FormGroup>
                </Col>

                {/* PREVIEW */}
                <Col xl="4" className="text-end">
                  <Btn
                    attrBtn={{
                      color: "primary",
                      type: "button",
                      onClick: previewCSV,
                      disabled: loadingGroups,
                    }}
                  >
                    Upload
                  </Btn>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UploadEssoGroupRackForm;
