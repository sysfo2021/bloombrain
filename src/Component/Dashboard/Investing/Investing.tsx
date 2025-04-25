import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, Weekly, Yearly } from "../../../utils/Constant";
import { H3, Image,  } from "../../../AbstractElements";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useCommonService } from "../../../Service/CommonService/Commonservice";
import { dynamicImage } from "../../../Service";
import { decryptData } from "../../../utils/helper/Crypto";
const Investing = (props: any) => {
  const { IncomesData } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string))
  const { loading, ApiCalling } = useCommonService();
  const [CoponData, setCoponData] = useState<any>([])
  console.log(IncomesData);
  

  // const OpenModal = async () => {
  //   const param = {
  //     MemberId: ClientID,
  //     ActionMode: "GetMoreCoupons"
  //   };
  //   const obj = {
  //     procName: 'MemberDashboard',
  //     Para: JSON.stringify(param),
  //   };
  //   const res = await ApiCalling(obj)
  //   console.log(res.length);

  //   setCoponData(res)
  //   setModalOpen(true)
  // }

  return (
    <Col xl="12" sm="12" className="mt-md-0 mt-3">
      <Row>
        {IncomesData.map((itm:any, idx:number)=> <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={itm?.title} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
                <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">${itm?.Value}</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_1.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col> )}
        {/* <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Profit Sharing Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_2.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Bot Income "} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_3.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Club Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_4.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Club Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_4.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Club Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_4.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Club Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_4.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="3" sm="3">
          <CardHeaderCommon headClass="pb-0" title={"Club Income"} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} coupon={true} coponcount={coponcout} Openmodal={OpenModal} />
          <Card className="investing-card">
            <div className="text-end me-3"></div>
            <CardBody className="px-6 pb-2 pt-md-0 pt-2">
              <div className="investing" >
              <Row className="align-items-center">
                  <div className="col-xl-6 col-sm-6 col-6"><H3 className="mt-1">$0</H3></div>
                  <div className="col-xl-6 col-sm-6 col-6">
                    <Image className="b-r-10 img-40 drop-shodow f-right" src={dynamicImage(`income_4.png`)} alt="avatar" />
                  </div>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col> */}

      </Row>
    </Col>
  );
};

export default Investing;
