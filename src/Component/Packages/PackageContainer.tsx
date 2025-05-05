import React, { useEffect, useState } from "react";
import "./Package.scss";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";  // Import Yup
import { Col, Container, Row } from "reactstrap";
import { Package } from "../../utils/Constant";
import { dynamicImage } from "../../Service";
import { useCommonService } from "../../Service/CommonService/Commonservice";
import { decryptData, encryptData } from "../../utils/helper/Crypto";
import { useSweetAlert } from "../../Context/SweetAlertContext";
import { Loader } from "react-feather";

const PackageContainer = () => {
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
  const [packageData, setpackageData] = useState<any>([]);
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const [token, settoken] = useState('');
  const [WalletBalance, setWalletBalance] = useState('0');
  const [PackageName, setPackageName] = useState('')
  const { ApiCalling ,loading} = useCommonService();

  // Yup Validation Schema
  const validationSchema = Yup.object().shape({
    Amount: Yup.number()
      .optional() 
  });

  // Fetching Packages
  const FetchPackages = async () => {
    const OBJ = {
      para: JSON.stringify({ ClientId: ClientID, ActionMode: "GetTopPackage" }),
      procName: "PurchaseToken",
    };
    const result = await ApiCalling(OBJ);
    const Data = JSON.parse(result[0]?.Result);
    setpackageData(Data?.Packages);
    setWalletBalance(Data?.WalletBalance);
    settoken(Data?.token);
    localStorage.setItem("userToken", encryptData(Data?.token));
  };

  // Submitting form
  const handleWithdrawal = async (values: any, item: any, packageName:any) => {
    setPackageName(packageName)
    const confirmed = await ShowConfirmAlert("Are you sure want to Buy this Package?");
    if (confirmed) {
      const param = {
        DepositToken: token,
        PackageAmount: 0,
        PackageId: item.PackageId,
        ClientId: ClientID,
        ActionMode: "PurchaseToken",
      };
      const obj = {
        procName: "PurchaseToken",
        Para: JSON.stringify(param),
      };
      const res = await ApiCalling(obj);
      if (res[0].StatusCode == "1") {
        ShowSuccessAlert(res[0].Msg);
        FetchPackages();
      } else {
        showAlert(res[0].Msg);
      }
    }
  };

  useEffect(() => {
    FetchPackages();
  }, []);


  return (
    <>
      <Breadcrumbs mainTitle={Package} parent={Package} />
      
      <Container fluid>
        <Row className="justify-content-center">
          <Col className="pricing-box align-item-center p-0 py-2 m-0 mb-4 col-md-9" style={{ height: "auto" }}>
            <h3>Wallet Balance : {WalletBalance}</h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {packageData?.map((plan: any, index: number) => (
            <Col sm="6" md="4" lg="4" xl="4" xxl="3" key={index}>
              <div className="pricing-box">
                <div className="icon">
                  <img src={dynamicImage(plan.PackageImage)} alt={plan.PackageImage} />
                </div>
                <h2 className="price">
                  {plan?.MinAmount}
                </h2>
                <p className="package-name">{plan.PackageName}</p>
                <p className="discount">{plan.RoiPercentage}</p>
                <Formik
                  initialValues={{ Amount: "" }}
                  validationSchema={validationSchema} // Apply validation schema
                  onSubmit={(values, { resetForm }) => {
                    handleWithdrawal(values, plan, plan.PackageName);
                    resetForm();
                  }}
                >
                  {({ resetForm }) => (
                    <Form>
                      {/* <Field type="number" className="enterAmount" name="Amount" placeholder="Enter Amount" />
                      <ErrorMessage name="Amount" component="div" className="text-danger" /> */}
                      <button className="buy-now" type="submit">
                        Buy Now {loading && PackageName === plan.PackageName ?  <div className="spinner-border spinner-border-sm" role="status">
                          <span className="sr-only">Loading...</span>
                    </div> : null}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          ))}
        </Row>
      </Container> 
    </>
  );
};

export default PackageContainer;



