import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Col, Container, Input, Label, Row, FormGroup } from "reactstrap";
import RatioImage from "../../CommonElements/RatioImage";
import { Btn, H2, H6, H3, P, Image } from "../../AbstractElements";
import Captcha from "../Authentication/Captcha";
import { dynamicImage } from "../../Service";
import CountryWithFlag from "../Authentication/CountryWithFlag";
import { Formik, Field, Form, ErrorMessage } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import Loader from "../../CommonElements/Loader/Loader";
import * as Yup from "yup";
import {
  RegistrationFormPropsType,
  RegistrationForminitialValues,
} from "../../Type/Forms/FormsType";
import { useRegisterService } from "../../Service/Authentication/RegisterationService";
import { SendOTP_Service } from "../../Service/Authentication/SendOTPService";
import { useSweetAlert } from "../../Context/SweetAlertContext";
import { encryptData, decryptData } from "../../utils/helper/Crypto";

const RegisterWithBgImageContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("ref");
  const leg = queryParams.get("leg");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [CountryName, setCountryName] = useState<string | null>(null);
  const [placeunderName, setPlaceUnder] = useState("");
  const [placeunderStatus, setplaceunderStatus] = useState(false);
  const [OTPLoader, setOTPLoader] = useState(false);
  const [RefferalStatus, setRefferalStatus] = useState(false);
  const [FormFieldData, setFormFieldData] = useState<any>(null);
  const [showPassWord] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [otp, setOtp] = useState("");
  const { sendOTP, registerMember, validateSponsor, CheckPosition, loading } =
    useRegisterService();
  const { SendOTP, FormatTime, StartTimer } = SendOTP_Service();
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const loaderelement = (
    <>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="sr-only">Loading...</span>
    </>
  );
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(username);
    if (username) {
      SetReferValues();
    }
  }, []);

  //Trigger based on ref query string
  // useEffect(() => {
  //   if (username) {
  //     GetDepsitBanks();
  //   }
  // }, [username]);
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    // console.log(value);
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountryName(selectedCountry); // Update state when the country is selected
  };

  const validationSchema = Yup.object({
    SponsorUserName: Yup.string().required("Sponsor ID is required"),
    sponsorName: Yup.string().optional(),
    FirstName: Yup.string().required("Name is required"),
    MobileNo: Yup.string().required("Mobile Number is required"),
    CountryId: Yup.string().required("Country is required").optional(),
    Position: Yup.string().required("Position is required"),
    EmailId: Yup.string().email("Invalid email").required("Email is required"),
    OTP: Yup.string().required("OTP is required"),
    address: Yup.string().optional(),
  });

  const HandleRegisterSubmit = async (values: RegistrationFormPropsType) => {
    try {
      const {
        SponsorUserName,
        PlaceUnderUserName,
        Position,
        OTP,
        FirstName,
        MobileNo,
        EmailId,
      } = values;
      if (!CountryName) {
        toast.error("Please Select Country");
        return;
      }
      if (!captchaValue) {
        toast.error("Captcha Validation Failed");
        return;
      }
      console.log(values);
      //return;
      const res = await registerMember({
        SponsorUserName: SponsorUserName,
        PlaceUnderUserName: "",
        FirstName: FirstName,
        MobileNo: MobileNo,
        Position: Position,
        CountryId: CountryName,
        EmailId: EmailId,
        OTP: OTP,
        recaptchaResponse: captchaValue,
      });

      //console.log("Response: ", res); // Check API response
      if (res.includes("reCAPTCHA")) {
        showAlert("CAPTCHA validation failed");
      } else {
        if (res[0].StatusCode == "1") {
          ShowSuccessAlert(res[0].Msg);
          // console.log("Registration successful");
          localStorage.setItem(
            "clientId",
            encryptData(res[0].UserId.toString())
          );
          localStorage.setItem("userToken", encryptData(res[0].UserToken));
          localStorage.setItem("User_ID", res[0]?.UID);
          localStorage.setItem("UserName", res[0]?.UserName);
          localStorage.setItem("refURL", res[0]?.ReferralURL);
          localStorage.setItem("MemberName", res[0]?.MemberName);
          localStorage.setItem("memberemail", res[0]?.EmailId);
          localStorage.setItem("RankName", res[0]?.RankName);
          navigate(`${process.env.PUBLIC_URL}/Dashboard`);
        } else {
          console.error("Registration failed: ", res[0].Msg);
          showAlert(res[0].Msg);
        }
      }
    } catch (error) {
      console.error("Error in registration: ", error);
    }
  };

  const handleSendOTP = async (values: RegistrationFormPropsType) => {
    const { MobileNo, FirstName, EmailId } = values;
    const param = {
      MobileNo: MobileNo,
      Name: FirstName,
      EmailId: EmailId,
      ActionMode: "SendOTP",
    };

    const obj = {
      procName: "RegOTP",
      Para: JSON.stringify(param),
    };
    setOTPLoader(true);
    const res = await SendOTP(obj);
    if (res[0].StatusCode == "1") {
      setIsOtpSent(true);
      // setOtpTimer(res[0].SecondsLeft - 1)
      startTimer(res[0].SecondsLeft);
      setOTPLoader(false);
    }
    setOTPLoader(false);
  };

  const handleSponsorChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    values: RegistrationFormPropsType,
    setFieldValue: (field: string, value: any) => void,
    actionType: string
  ) => {
    const value = event.target.value;
    const { SponsorUserName, PlaceUnderUserName } = values;
    const param = {
      UserName: actionType === "Sponsor" ? SponsorUserName : PlaceUnderUserName,
    };
    const obj = {
      procName: "CheckSponsor",
      Para: JSON.stringify(param),
    };
    if (value?.length > 0) {
      const res = await validateSponsor(obj);
      if (res[0].StatusCode == "1") {
        if (actionType === "Sponsor") {
          setRefferalStatus(false);
          setFieldValue("sponsorName", res[0].Name);
        } else {
          setPlaceUnder(res[0].Name);
          setplaceunderStatus(false);
        }
      } else {
        if (res[0].Name === undefined && actionType === "Sponsor") {
          setFieldValue("sponsorName", res[0].Msg);
          setRefferalStatus(true);
        } else {
          setFieldValue("Position", "");
          setplaceunderStatus(true);
        }
        // console.log("working", res[0].Name);
      }
    } else {
      setplaceunderStatus(false);
      setPlaceUnder("");
      setFieldValue("Position", "");
    }
  };

  // setting Refer Values

  const SetReferValues = async () => {
    const param = {
      UserName: username,
    };

    const obj = {
      procName: "CheckSponsor",
      Para: JSON.stringify(param),
    };
    const res = await validateSponsor(obj);
    console.log(res);

    const registerformData = {
      SponsorUserName: username,
      PlaceUnderUserName: "",
      FirstName: "",
      MobileNo: "",
      Position: leg,
      CountryId: "",
      EmailId: "",
      OTP: "",
      recaptchaResponse: "",
      address: "",
      sponsorName: res[0]?.Name,
    };
    setFormFieldData(registerformData);
  };

  const Checknodeposition = async (
    event: React.ChangeEvent<HTMLInputElement>,
    values: any,
    setFieldValue: (field: string, value: any) => void
  ) => {
    // console.log(event?.target.value);
    const Value = event?.target.value;
    const obj = {
      procName: "CheckPlaceUnderAvailibility",
      Para: JSON.stringify({
        PlaceUnderUsername: values.PlaceUnderUserName,
        Position: Value,
      }),
    };
    if (values.PlaceUnderUserName !== "") {
      setFieldValue("Position", Value);
      const Result = await CheckPosition(obj);
      if (Result[0]?.StatusCode === "0") {
        showAlert(Result[0]?.Msg);
      }
    } else {
      showAlert("Please enter placeunder Id");
    }
  };

  const startTimer = (secondsLeft: number) => {
    setOtpTimer(secondsLeft - 1); // Subtract 1 to start the timer at 59 seconds
    const intervalId = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId); // Stop timer when it reaches 0
          setIsOtpSent(false); // Reset OTP sent flag
          return 0; // Ensure it doesn't go below 0
        }
        return prev - 1; // Decrement the timer by 1 second
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      {loading && <Loader />}
      <Row className="m-0">
        <Col xl="12" className="p-0">
          <div
            className="login-card login-dark"
            style={{ backgroundColor: "transparent" }}
          >
            <div>
              <div
                className="login-main w-101"
                style={{
                  padding: "30px",
                  backgroundColor: "rgb(1 1 1 / 46%)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "rgb(29 29 29) 1px 1px 7px 0px",
                  margin: 0,
                }}
              >
                <Formik
                  initialValues={FormFieldData || RegistrationForminitialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    HandleRegisterSubmit(values);
                    setSubmitting(false);
                  }}
                  enableReinitialize
                >
                  {({ isSubmitting, values, setFieldValue, setFieldError }) => (
                    <Form className="theme-form">
                      <div>
                        <div className="logo text-center logo1">
                          <Image
                            className="img-fluid for-light"
                            src={dynamicImage("logo/GoldenLogo.png")}
                            style={{ margin: "auto" }}
                            alt="logo"
                          />
                          <Image
                            className="img-fluid for-dark"
                            src={dynamicImage("logo/GoldenLogo.png")}
                            style={{ margin: "auto" }}
                            alt="darkLogo"
                          />
                          <hr style={{ opacity: "0.5", margin: "0px" }} />
                        </div>
                      </div>
                      <H3 className="text-center">Create Your Account</H3>
                      <P className="text-center">
                        {"Enter your personal details to create account"}
                      </P>
                      <div className="form-group">
                        <Row className="g-2">
                          <Col xs="6">
                            <Label className="col-form-label pt-0">
                              Sponsor ID
                            </Label>
                            <Field
                              type="text"
                              onBlur={(
                                e: React.FocusEvent<HTMLInputElement>
                              ) => {
                                setFieldValue(
                                  "SponsorUserName",
                                  e.target.value
                                );
                                handleSponsorChange(
                                  e,
                                  values,
                                  setFieldValue,
                                  "Sponsor"
                                );
                              }}
                              name="SponsorUserName"
                              value={values.SponsorUserName}
                              placeholder="Enter Sponsor ID"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="SponsorUserName"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col xs="6">
                            <Label className="col-form-label pt-0">
                              Sponsor Name
                            </Label>
                            <Field
                              type="text"
                              name="sponsorName"
                              className="form-control"
                              disabled
                            />
                            {RefferalStatus ? (
                              <p className="text-danger ms-4">Not Available</p>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </div>
                      <div className="form-group">
                        <Row className="g-2">
                          <Col xs="6">
                            <Label className="col-form-label pt-0">Name</Label>
                            <Field
                              type="text"
                              name="FirstName"
                              placeholder="Enter Name"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="FirstName"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col xs="6">
                            <Label className="col-form-label pt-0">
                              Mobile No
                            </Label>
                            <Field
                              type="text"
                              name="MobileNo"
                              placeholder="Enter Mobile No."
                              className="form-control"
                            />
                            <ErrorMessage
                              name="MobileNo"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className="form-group">
                        <Row>
                          {/* <Col md="6" className="form-group g-3">
                                  <Label className="col-form-label pt-0 text-uppercase">PlaceUnder ID</Label>
                                  <Field
                          type="text" onBlur={
                            (e: React.FocusEvent<HTMLInputElement>) => {
                              setFieldValue("PlaceUnderUserName", e.target.value)
                              handleSponsorChange(e, values, setFieldValue, 'PlaceUnder')
                            }}
                          name="PlaceUnderUserName"
                          value={values.PlaceUnderUserName}
                          placeholder="Enter PlaceUnder ID"
                          className="form-control"
                        />
                                  {placeunderStatus ? <p className="text-danger ms-4">Not Available</p> : <span>{placeunderName}</span>}
                                  <ErrorMessage name="PlaceUnderUserName" component="div" className="text-danger" />
                              </Col> */}
                          <Col md="6">
                              <Label className="col-form-label">Country</Label>
                              <CountryWithFlag
                                SetCountryName={handleCountryChange}
                              />
                            <ErrorMessage
                              name="CountryId"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md="6">
                              <Label className="col-form-label">
                                Select Position
                              </Label>
                              <Row>
                                <Col xs="6" className="col-form-label px-1 pt-0">
                                  <label className="redioLeble mb-0 radio-btn mt-0">
                                    <Field
                                      type="radio"
                                      name="Position"
                                      value="1"
                                     
                                    />
                                    <span className="ms-2">Left</span>
                                  </label>
                                </Col>
                                <Col xs="6" className="col-form-label px-1 pt-0">
                                  <label className="redioLeble mb-0 radio-btn mt-0">
                                    <Field
                                      type="radio"
                                      name="Position"
                                      value="2"
                                    />
                                    <span className="ms-2">Right</span>
                                  </label>
                                </Col>
                              </Row>
                            <ErrorMessage
                              name="Position"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>
                      </div>

                      {/* <div className="form-group">
                        <Row className="g-2">
                          <Col xs="6">
                          <div className="form-control" style={{padding:'6px 5px 5px 15px',backgroundColor:'#63396e'}}>
                            <Row>
                              <Col xs="6" className='d-flex '>
                                <Col xs="6">
                                <label className="redioLeble mb-0">
                              <Field type="radio" name="Position" value="1" onChange={(e: any) => Checknodeposition(e, values, setFieldValue,)} />
                              <span>Left</span>
                             </label>
                                </Col>

                                 <Col xs="6">
                              <label className="redioLeble mb-0">
                            <Field type="radio" name="Position" value="2" onChange={(e: any) => Checknodeposition(e, values, setFieldValue,)} />
                            <span style={{ paddingLeft: '10px' }}>Right</span>
                          </label>
                                
                              </Col>
                              </Col>
                             
                            </Row>
                            </div>
                          </Col>
                          <Col md="6" xs="12">
                            <div className="form-group">
                              <Label className="col-form-label">Country</Label>
                              <CountryWithFlag SetCountryName={handleCountryChange} />
                            </div>
                          </Col>
                        </Row>
                      </div> */}

                      <div className="form-group">
                        <Label className="col-form-label">Email Address</Label>
                        <div className="position-relative">
                          <Field
                            type="email"
                            name="EmailId"
                            className="form-control"
                            placeholder="Enter Email Id"
                          />
                        </div>
                        <ErrorMessage
                          name="EmailId"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <Label className="col-form-label">OTP</Label>
                        <div className="form-input position-relative">
                          <Field
                            type={showPassWord ? "text" : "password"}
                            name="OTP"
                            placeholder="Enter OTP"
                            className="form-control"
                          />
                          <Btn
                            color="info"
                            onClick={() => {
                              if (
                                values.EmailId &&
                                values.MobileNo &&
                                values.FirstName
                              )
                                handleSendOTP(values);
                            }}
                            style={{
                              position: "absolute",
                              right: "2px",
                              top: "4px",
                              background:
                                "linear-gradient(180deg, #FFD700, #FFC107, #B8860B)",
                              borderColor: "#d0b163",
                              color: "#000",
                            }}
                          >
                            {isOtpSent ? FormatTime(otpTimer) : `Send OTP`}{" "}
                            {OTPLoader ? loaderelement : ""}
                          </Btn>
                        </div>
                        <ErrorMessage
                          name="OTP"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <Captcha onCaptchaChange={handleCaptchaChange} />
                      <div className="form-group mb-0 checkbox-checked">
                        <Btn
                          block
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(180deg, #FFD700, #FFC107, #B8860B)",
                            borderColor: "#d0b163",
                            color: "#000",
                          }}
                          disabled={isSubmitting}
                          className="w-100 mt-3 btn-primary"
                        >
                          Create Account
                        </Btn>
                      </div>
                      <div className="login-social-title">
                        <H6>Sign Up With</H6>
                      </div>
                      <P
                        className="mt-4 mb-0 text-center"
                        style={{ color: "#d0b163" }}
                      >
                        {"Already have an account?"}
                        <Link
                          className="ms-2"
                          to={`${process.env.PUBLIC_URL}/login`}
                          style={{ color: "#d0b163" }}
                        >
                          Sign In
                        </Link>
                      </P>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterWithBgImageContainer;
