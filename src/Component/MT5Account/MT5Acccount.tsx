import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from "reactstrap";
import { ActivateBot, MT5_Account } from "../../utils/Constant";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useBotService } from '../../Service/ActivateBot/ActivateBot'
import { decryptData } from "../../utils/helper/Crypto";
import { objectEntriesToArray } from '../../utils/helper/opreaton'
import MT5Form from './MT5Form';
import MT5Details from './MT5Details';
import { useCommonService } from '../../Service/CommonService/Commonservice';

const MT5Acccount = (props:any) => {
  const { getFXSTWalletBalance, doActivation, loading } = useBotService();
  const  {ApiCalling}= useCommonService()
  const [userData, setuserData] = useState([])
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
  const [botData, setbotData] = useState<any>([]);
  const [activationStatus, setactivationStatus] = useState(false);

  useEffect(() => {
    GetUSerStatus();
  }, [activationStatus]);

  const GetUSerStatus = async () => {
    const param = {
      ClientId: ClientID,
      ActionMode: "GetMT5Detail"
    }
    const obj = {
      procName: 'CreateMT5Account',
      Para: JSON.stringify(param),
    };
    const res = await ApiCalling(obj);
    console.log(res);
    setuserData(res)
    const BotoverviewData = [
      {
        color: "primary",
        Name: "Account Status",
        Information: res[0]?.IsMT5AccountCreated === false ? 'No' : 'Yes',
      },
      {
        color: "primary",
        Name: "MT5 ID",
        Information: res[0]?.MT5ID,
      },
      {
        color: "secondary",
        Name: "Leverage",
        Information: res[0]?.Leverage,
      },
      {
        color: "tertiary",
        Name: "InvestPass",
        Information: res[0]?.InvestPass,
      },
      // {
      //   color: "tertiary",
      //   Name: "Main Pass",
      //   Information: res[0]?.MainPass,
      // },
      {
        color: "tertiary",
        Name: "Server",
        Information: res[0]?.GroupName,
      }
    ];

    setbotData(BotoverviewData);

  }
  
  return (
    <>
      <Breadcrumbs mainTitle={MT5_Account} parent={MT5_Account} />
      <Container fluid>
        <Row>
          <Col xl="4">
            <MT5Details botData={botData} />
          </Col>
          <Col xl="8">
            <MT5Form refreshAction={setactivationStatus}  formData={userData}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MT5Acccount;
