import { Card, CardBody, Col } from "reactstrap";
import React, { useEffect, useState } from "react";
import { decryptData } from "../../../utils/helper/Crypto";
import { Btn, H1, H3, H6, P } from "../../../AbstractElements";
import { Href } from "../../../utils/Constant";
import { profileNameProps } from "../../../Type/Dashboard/ProjectType";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSweetAlert } from "../../../Context/SweetAlertContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { useTransferFundService } from "../../../Service/TransferFundToDepositWallet/TransferFundToDepositWallet";
import ReferralLink from "../ReferralLink/ReferralLink";
const ProfileGreet = (props: any) => {
  // console.log(props);
  const [ClientID, setClientID] = useState(
    decryptData(localStorage.getItem("clientId") as string)
  );
  const { showAlert, ShowSuccessAlert, ShowConfirmAlert } = useSweetAlert();
  const { doLoginKingMakerz, loading } = useTransferFundService();
  const { memberName, Rank } = props?.profileName;
  // console.log(props?.loadingStatus);

  const CopyCallBack = (t: any, r: any) => {
    if (r == true) {
      toast.success("Copied");
    }
  };
  const doLogin = async () => {
    const param = {
      ClientId: ClientID,
    };
    const res = await doLoginKingMakerz(param);
    if (res) {
      const parsedData = JSON.parse(res);
      // Extract the login_url
      const loginUrl = parsedData?.data?.login_url;
      window.open(loginUrl);
    } else {
      showAlert("Unable to Login");
    }
  };
  const rankData = {
    top: "L1",
    current: "L4",
  };
  return (
    <Col sm="12" md="3" lg="3" xl="3">
      <Card className="profile-greeting card-hover bgImage1 overflow-hidden">
        <CardBody>
          <div className="img-overlay">
            <H1>Welcome, {memberName}</H1>
            {/* <H6>{'demofxstock@gmail.com'}</H6>
            <H6>{Rank ? Rank : 'NO Rank'}</H6> */}

            {/* <P className="mb-1">
              Welcome to the Bloombrain Capital family!
            </P> */}
            <div className="d-flex justify-content-between gap-1 align-items-center">
              <div className="badge rank-badge">
                Top Rank: <span>{rankData.top}</span>
              </div>
              <div className="text-black rank-badge badge">
                Current Rank: <span className="text-black">{rankData.current}</span>
              </div>
            </div>
            <ReferralLink />
            {/* <CopyToClipboard text={localStorage.getItem("refURL") as string} onCopy={CopyCallBack} >
              <Btn color="primary f-14 mt-3  mt-xl-4 text-black" style={{marginRight:'10px'}}>
                Copy Left ID URL
              </Btn>
              
            </CopyToClipboard> */}
            {/* <CopyToClipboard text={localStorage.getItem("refURL") as string} onCopy={CopyCallBack} >
              <Btn color="primary f-14 mt-3 mt-xl-4 text-black">
              Copy Right ID URL
              </Btn>
            </CopyToClipboard>
            <br />
            <Btn color="primary f-14 mt-2 mt-xl-3 text-black animated-button">
              {loading ? 'Please Wait....' : 'Create MT5 Account'}
            </Btn>  */}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProfileGreet;
