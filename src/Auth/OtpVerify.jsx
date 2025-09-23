import React, { Fragment, useState, useEffect, useContext } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P } from "../AbstractElements";
import { Otp,Verify_otp } from "../Constant";
import {Image} from "../AbstractElements";
import NtaIcon from "../assets/images/logo/textLogo.webp";
import { useNavigate } from "react-router-dom";
import man from "../assets/images/dashboard/profile.png";
import CustomizerContext from "../_helper/Customizer";
import OtherWay from "./OtherWay";
import { ToastContainer, toast } from "react-toastify";

const OtpVerify = ({ selected }) => {
  const [otp, setOtp] = useState("");
  const history = useNavigate();
  // const { layoutURL } = useContext(CustomizerContext);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(localStorage.getItem("Name"));

  useEffect(() => {
    localStorage.setItem("profileURL", man);
    localStorage.setItem("Name", "Emay Walter");
  }, [value, name]);

  const otpVerify = async (e) => {
    e.preventDefault();
    setValue(man);
    setOtp("123456");
    if (otp === "123456" ) {
    //   localStorage.setItem("login", JSON.stringify(true));
      history(`${process.env.PUBLIC_URL}/dashboard/default`);
      toast.success("Successfully verify otp!..");
    } else {
      toast.error("wrong otp!..");
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="p-0 login-page">
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                          <Image attrImage={{ className: "img-fluid  my-4 ", src: `${NtaIcon}`, alt: "", width:"200px" }} />
                <Form className="theme-form">
                  <H4>{selected === "simpleLogin" ? "" : "Please Enter Otp Send on Email"}</H4>
                  <P>{"otp send at given Email"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{Otp}</Label>
                    <Input className="form-control" type="text" onChange={(e) => setOtp(e.target.value)} value={otp} />
                  </FormGroup>     
                  <OtherWay />
                      <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: (e) => otpVerify(e) }}>{Verify_otp}</Btn>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default OtpVerify;
