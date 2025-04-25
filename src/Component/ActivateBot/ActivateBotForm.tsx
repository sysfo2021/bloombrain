import { Card, CardBody, Col, Row,  FormGroup, Input, Label, } from "reactstrap";
import React, { useEffect, useState, useRef } from 'react';
import { Btn } from "../../AbstractElements";
import { decryptData } from "../../utils/helper/Crypto";
import { useBotService } from '../../Service/ActivateBot/ActivateBot'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BotActivationinitialValues } from "../../Type/Forms/FormsType";
import { useSweetAlert } from '../../Context/SweetAlertContext'
import Loader from '../../CommonElements/Loader/Loader'

interface botprops {
    FXSTWalletBalance: number;
}
const ActivateBotForm = (props: any) => {
    const { refreshAction } = props;
    const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
    const [WalletType, setWalletType] = useState('ProductWallet')
    const [Plan, setPlan] = useState<any>([]);
    const [Price, setPrice] = useState(100);
    const [WalletBalance, setWalletBalance] = useState(0)
    const { doActivation, getFXSTWalletBalance, loading } = useBotService();
    const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();

  const ActiveBotSchema = Yup.object().shape({
    WalletType: Yup.string().required("Select Wallet Type"),
    Plan: Yup.string().required("Choose Plan."),
    Fee : Yup.string().required("Fee Required"),
  });
    useEffect(() => {
        GetPlans()
       WalletTypeChange(WalletType)
    
    }, [])
   
    const handleActivation = async (Value:any) => {
        console.log(Value);
        
        const {Fee, Plan, WalletType} = Value
        const confirmed = await ShowConfirmAlert("Activate Bot", "Are you sure want to activate");
        if (confirmed) {
            const param = {
                ClientId: ClientID,
                Duration :Plan,
                WalletType: 'DepositWallet'
            }
            const res = await doActivation(param);
            if (res[0].StatusCode == "1") {
                ShowSuccessAlert("Bot Activated Successfully");
                refreshAction(true);
            } else {
                showAlert(res[0].Msg);
            }
        } else {
            console.log('do nothing.');
        }
    }

    const WalletTypeChange = async (value: any) => {
        const param = {
            ClientId: ClientID,
            WalletType: value,
            ActionMode: "GetWalletBalance"
        }
        const obj = {
            procName: 'ActivateBotByMember',
            Para: JSON.stringify(param),
        };
        const res = await getFXSTWalletBalance(obj);
        setWalletBalance(res[0]?.WalletBalance)
        // console.log(res);

    }

    const GetPlans = async()=>{
        const OBJ = {
            Para:JSON.stringify({ClientID:ClientID,  ActionMode:'GetBotDuration'}),
            procName:'ActivateBotByMember'
            
        }
        const result = await getFXSTWalletBalance(OBJ);
        console.log(result.length);
        setPlan(result)
    }

const SetChangeValue =(event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any) => void)=>{
    const selectedValue = event.target.value;
    setFieldValue('Plan', selectedValue); // Plan ka original value assign karein
    setFieldValue('Fee', selectedValue === '1' ? '$100' :selectedValue === '' ? '' : `$200`);

}
    

    return (
        <Formik
        initialValues={BotActivationinitialValues}
        validationSchema={ActiveBotSchema} // Ensure validationSchema is properly defined
        onSubmit={(values, { setSubmitting }) => {
          handleActivation(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <button className="btn-light py-2 pe-2" style={{ fontSize: '18px', textAlign: 'justify', width: '210px' }} type="button">
              Wallet Balance :
              {loading ? (
                <div className="spinner-border text-light text-center" style={{ width: '1rem', height: '1rem' }} role="status"></div>
              ) : (
                <span style={{color: 'black'}}> &nbsp;{WalletBalance}</span>
              )}
            </button>
            <hr />
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Wallet Type</Label>
                      <Field
                        name="WalletType"
                        as="select"
                        className="form-control btn-square form-select"
                      >
                        <option value="ProductWallet">Deposit Wallet</option>
                      </Field>
                        <ErrorMessage name="WalletType" component="div" className="text-danger" />
                    </FormGroup>
      
                    <FormGroup>
                      <Label>Choose Plan</Label>
                      <Field
                        name="Plan"
                        as="select"
                        value={values.Plan}
                        className="form-control btn-square form-select"
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => SetChangeValue(e, setFieldValue)}
                      >
                        <option value=''>Please choose Plan</option>
                        {Plan.map((itm: any, index: number) => (
                          <option key={index} value={itm.DurationId}>
                            {itm?.DurationValidity}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="Plan" component="div" className="text-danger" />
                    </FormGroup>
      
                    <FormGroup>
                      <Label>Subscription Fee</Label>
                      <Field
                        name="Fee"
                        type="text"
                        placeholder="Activation Fee"
                        className="form-control"
                        disabled
                      />
                      <ErrorMessage name="Fee" component="div" className="text-danger" />

                    </FormGroup>
      
                    <div>
                      <span className="badge badge-light" style={{ fontSize: '18px', color: '#111' }}>
                        <i className="fa fa-user"></i> <span style={{ color: '#111' }}>{localStorage.getItem("MemberName")}</span>
                      </span>
                    </div>
                  </Col>
      
                  <Col md="4">
                    <Btn color="primary" style={{ marginTop: '30px' }} type="submit">
                      Activate
                    </Btn>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
      

    );
};

export default ActivateBotForm;
