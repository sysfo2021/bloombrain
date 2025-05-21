import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { P, H4, Btn, H5 } from "../../AbstractElements";
import { WalletTransfer, Placement } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import HistoryTable from "../../CommonElements/SearchTable/SearchTable";
import { useSweetAlert } from "../../Context/SweetAlertContext";
import Loader from "../../CommonElements/Loader/Loader";
import { decryptData } from "../../utils/helper/Crypto";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  PlaceMemberPPropType,
  PlaceMemberForminitialValues,
} from "../../Type/Forms/P2PTransfer/P2P";
import { SendOTP_Service } from "../../Service/Authentication/SendOTPService";
import { useTransferFundService } from "../../Service/TransferFundToDepositWallet/TransferFundToDepositWallet";
const Placemember = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const refclientid = queryParams.get("mid");
  useEffect(() => {
    GetClientDetail(refclientid as string);
  }, []); // Empty dependency array to ensure this runs only once on mount

  const { getWalletBalance, doTransfer, loading, validateSponsor } =
    useTransferFundService();
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const [ClientID, setClientID] = useState(
    decryptData(localStorage.getItem("clientId") as string)
  );
  const [walletType, setWalletType] = useState("");
  const { SendOTP, FormatTime } = SendOTP_Service();
  const [OTPtimer, setOTPtimer] = useState("TransferForm");
  const [disablebtn, setdisablebtn] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [clientName, setclientName] = useState<string>("");
  const [clientEmail, setclientEmail] = useState<string>("");
  const [clientUserId, setclientUserId] = useState<string>("");
  const [username, setUsername] = useState("");
  // Validation schema
  const TransferSchema = Yup.object().shape({
    Position: Yup.string().required("Select Position"),
    Username: Yup.string().required("Enter To Username"),
  });

  const GetClientDetail = async (clientid: string) => {
    if (clientid) {
      const param = {
        ClientId: clientid,
        ActionMode: "GetClientDetail",
      };
      const obj = {
        procName: "MemberPlacement",
        Para: JSON.stringify(param),
      };
      const res = await getWalletBalance(obj);
      setclientName(res[0].Name);
      setclientEmail(res[0].EmailId);
      setclientUserId(res[0].UserId);
    }
  };

  const handleSponsorChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    values: PlaceMemberPPropType,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const { Username } = values;
    const param = {
      UserName: Username,
    };

    const obj = {
      procName: "CheckSponsor",
      Para: JSON.stringify(param),
    };
    const res = await validateSponsor(obj);
    if (res[0].StatusCode == "1") {
      setUsername(res[0].Name);
    } else {
      setUsername("Not Available");
    }
  };
  const handleTransfer = async (values: PlaceMemberPPropType) => {
    const confirmed = await ShowConfirmAlert(
      "Placement",
      "Are you sure want to place this member ?"
    );
    if (confirmed) {
      // Proceed with the action
      const param = {
        ClientId: refclientid,
        PlacedBy: ClientID,
        ParentUsername: values.Username,
        Position: values.Position,
        ActionMode: "DoPlacement",
      };
      const obj = {
        procName: "MemberPlacement",
        Para: JSON.stringify(param),
      };
      const res = await doTransfer(obj);
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0].Msg);
      } else {
        showAlert(res[0].Msg);
      }
    } else {
      console.log("do nothing.");
    }
  };
  return (
    <>
      <Breadcrumbs
        mainTitle={Placement}
        parent={"Team Overview"}
        ChildName={Placement}
      />
      <Container fluid>
        {loading && <Loader />}
        <Row>
          <Col xl="4">
            <Card className="rounded-4">
              <CardBody>
                <div className="placement-wrapper text-center">
                  <p className="placement-label mb-3">
                    You are placing the following member
                  </p>

                  <div className="user-profile-card text-center p-4 rounded shadow">
                    <div className="user-img-wrapper mb-3">
                      <div className="icon-circle mb-2 mx-auto">
                        <i className="icon-user f-60 text-white" />
                      </div>
                    </div>
                    <h5 className="mb-1 text-white fw-bold">
                      {clientName}{" "}
                      <span className="text-info">[{clientUserId}]</span>
                    </h5>
                    <hr className="custom-divider" />
                    <p className="text-light fs-6">{clientEmail}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Col xl="12" style={{ display: "flex" }}>
              <div>⚠️</div>
              <div style={{ paddingLeft: "10px" }}>
                Placement is irreversible. Please place member carefully.
                <br />
                {/* <p style={{color:'#E6B855'}}> Note: When you choose KYC Wallet it will transfer fund to  Member's KYC Wallet.</p> */}
              </div>
            </Col>
          </Col>
          <Col xl="8">
            <Card>
              <CardBody>
                <div className="gap-3 pills-blogger">
                  <Formik
                    initialValues={PlaceMemberForminitialValues}
                    validationSchema={TransferSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      handleTransfer(values);
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label>Enter Parent Username</Label>
                              <Field
                                type="text"
                                name="Username"
                                onBlur={(
                                  e: React.FocusEvent<HTMLInputElement>
                                ) => {
                                  setFieldValue("Username", e.target.value);
                                  handleSponsorChange(e, values, setFieldValue);
                                }}
                                value={values.Username}
                                placeholder="Enter to Username"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="Username"
                                component="div"
                                className="text-danger"
                              />
                              {username == "Not Available" ? (
                                <span style={{ color: "red" }}>
                                  Invalid Username
                                </span>
                              ) : (
                                <span style={{ color: "green" }}>
                                  {username}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label>Select Position</Label>
                              <Field
                                as="select"
                                name="Position"
                                className=" form-control btn-square form-select"
                                value={values.Position}
                              >
                                <option value="">{"Select Position"}</option>
                                <option value="1">{"Left"}</option>
                                <option value="2">{"Right"}</option>
                              </Field>
                              <ErrorMessage
                                name="Position"
                                component="div"
                                className="text-danger"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Col md="12">
                          <Btn color="primary" disabled={isSubmitting}>
                            Submit
                          </Btn>
                        </Col>
                      </Form>
                    )}
                  </Formik>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Col xl="12 mt-4" style={{ display: "none" }}>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>From Date</Label>
                <Input type="date" placeholder="From Date" />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>To Date</Label>
                <Input type="date" placeholder="From Date" />
              </FormGroup>
            </Col>

            <Col md="4">
              <Btn color="info mt-4 height45" type="submit">
                Search
              </Btn>
            </Col>
          </Row>
          {/* <HistoryTable /> */}
        </Col>
      </Container>
    </>
  );
};

export default Placemember;
