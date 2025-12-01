import React, { Fragment, useState, useEffect } from "react";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, P, Image } from "../AbstractElements";
import { EmailAddress, ForgotPassword, Password, RememberPassword, SignIn } from "../Constant";
import NtaIcon from "../assets/images/logo/textLogo.webp";
import man from "../assets/images/dashboard/profile.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Layout/Loader/index"; // import loader
import axios from "axios";
import { login } from "../api"; // ✅ Your login API endpoint

const Signin = ({ selected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const history = useNavigate();

  const [value, setValue] = useState(localStorage.getItem("profileURL") || man);
  const [name, setName] = useState(localStorage.getItem("Name") || "");
  
  useEffect(() => {
    localStorage.setItem("profileURL", man);
    localStorage.setItem("Name", "Emay Walter");
  }, [value, name]);

  const loginAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(login, { email, password }); // POST request
console.log(response);

      // Assuming API returns { success: true, data: { token, name, profileURL } }
      if (response.data.message==="OTP Sent successful") {
        const userData = response.data.admin;

        // Save token or user info in localStorage
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("token", userData.token);
        localStorage.setItem("profileURL", userData.profileURL || man);
        localStorage.setItem("Name", userData.name || "User");
        localStorage.setItem("userId", userData.id || "UserId");

        toast.success(response.data.message);

        setTimeout(() => {
          setLoading(false);
 history("/verify", { state: {  userId: userData.id, name: userData.name,otp:userData.login_otp } });
        }, 500);
      } 
      else {
        toast.error(response.data.message );
        
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading && <Loader loading={loading} />}

      <Container fluid className={`p-0 login-page ${loading ? "loading-active" : ""}`}>
        <Row>
          <Col xs="12">
            <div className="login-card">
              <div className="login-main login-tab">
                <Image attrImage={{ className: "img-fluid my-4", src: NtaIcon, alt: "", width:"200px" }} />

                <Form className="theme-form">
                  <H4>{selected === "simpleLogin" ? "" : "Sign In With Simple Login"}</H4>
                  <P>{"Enter your email & password to login"}</P>

                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>

                  <FormGroup className="position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <div className="position-relative">
                      <Input 
                        type={togglePassword ? "text" : "password"} 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                      />
                      <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? "" : "show"}></span>
                      </div>
                    </div>
                  </FormGroup>

                  <div className="position-relative form-group mb-0">
                    <div className="checkbox">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">{RememberPassword}</Label>
                    </div>
                    <a className="link" href="#javascript">{ForgotPassword}</a>
                    <Btn attrBtn={{ color: "primary", className: "d-block w-100 mt-2", onClick: loginAuth }}>{SignIn}</Btn>
                  </div>
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

export default Signin;
