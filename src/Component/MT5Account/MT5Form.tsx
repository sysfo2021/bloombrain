import { Card, CardBody, Col, Row,  FormGroup, Input, Label, } from "reactstrap";
import React, { useEffect, useState, useRef } from 'react';
import { Btn } from "../../AbstractElements";
import { decryptData } from "../../utils/helper/Crypto";
import { useBotService } from '../../Service/ActivateBot/ActivateBot'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MT5initialValues } from "../../Type/Forms/FormsType";
import { useSweetAlert } from '../../Context/SweetAlertContext'
import Loader from '../../CommonElements/Loader/Loader'

interface botprops {
    FXSTWalletBalance: number;
}
const MT5Form = (props: any) => {
    const { refreshAction, formData } = props;
    const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
    const [WalletType, setWalletType] = useState('ProductWallet')
    const [Plan, setPlan] = useState<any>([]);
    const [Price, setPrice] = useState(100);
    const [WalletBalance, setWalletBalance] = useState(0);
    const [FormDataValues, setFormDataValues] = useState<any>(null)
    const [loader, setloader] =useState(false)
    const { doActivation, getFXSTWalletBalance, MT5AccountActivation, loading } = useBotService();
    const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
   
  const ActiveBotSchema = Yup.object().shape({
    name: Yup.string().optional(),
    Email: Yup.string().optional(),
    phone : Yup.string().optional(),
    country: Yup.string().optional()
  });
  
    useEffect(() => {
      SetFormValues()
      WalletTypeChange(WalletType)
    }, [])

    const SetFormValues = ()=>{
      let OBJ ={
        name:formData[0]?.FirstName,
        Email:formData[0]?.EmailId, 
        phone:formData[0]?.ContactNo, 
        country:formData[0]?.CountryName, 
      }
      setFormDataValues(OBJ)
    }
   
    const handleActivation = async (Value:any) => {
        const confirmed = await ShowConfirmAlert("Create MT5 Account", "Are you sure want to perform this action");
        if (confirmed) {
          setloader(true)
            const obj = {
              ClientId: ClientID
          };
            try {
              const res = await MT5AccountActivation(obj);
            if (res[0].StatusCode == "1") {
                ShowSuccessAlert(res[0].Msg);
                refreshAction(true);
                setloader(false)
            } else {
                showAlert(res);
                setloader(false)
            }
            } catch (error) {
              setloader(false)
            }
        } 
    }

    const WalletTypeChange = async (value: any) => {
        const param = {
            ClientId: ClientID,
        }
        const obj = {
            procName: 'CreateMT5Account',
            Para: JSON.stringify(param),
        };
        const res = await getFXSTWalletBalance(obj);

    }

   

const SetChangeValue =(event: React.ChangeEvent<HTMLSelectElement>, setFieldValue: (field: string, value: any) => void)=>{
    const selectedValue = event.target.value;
    setFieldValue('Plan', selectedValue); // Plan ka original value assign karein
    setFieldValue('Fee', selectedValue === '1' ? '$100' :selectedValue === '' ? '' : `$200`);

}



    return (
        <Formik
        initialValues={FormDataValues || MT5initialValues}
        validationSchema={ActiveBotSchema} // Ensure validationSchema is properly defined
        onSubmit={(values, { setSubmitting }) => {
          handleActivation(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Card>
              <CardBody>
                
                  <Row>
                  <Col md="12">      
                    <FormGroup>
                      <Label>Name</Label>
                       <Field name="name" type="text" placeholder="Name" className="form-control" value={formData[0]?.FirstName || 'NA'} disabled />
                   
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                        <Field name="Email" type="text" placeholder="Email" className="form-control" value={formData[0]?.EmailId || 'NA'}  disabled />

                    </FormGroup>
                    <FormGroup>
                      <Label>Phone</Label>
                      <Field name="phone" type="text" placeholder="Phone No" className="form-control" value={formData[0]?.ContactNo || 'NA'} disabled />
                    </FormGroup>
                    <FormGroup>
                      <Label>Country</Label>
                      <Field name="country" type="text" placeholder="Enter Country" value={formData[0]?.CountryName || 'NA'} className="form-control" disabled />
                    </FormGroup>
                  </Col>
      
                  <Col md="4">
                    <Btn color="primary" style={{ marginTop: '30px' }} type="submit">
                    Create MT5 
                    {loader ? <div className="spinner-border spinner-border-sm ms-1"  role="status">
                          <span className="sr-only">Loading...</span>
                        </div> : null}
                    
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

export default MT5Form;
