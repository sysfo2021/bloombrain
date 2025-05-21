import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { H3,H4, H5, Image } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";
import { TotalWithdrawal, TotalEarning } from "../../../utils/Constant";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
const Other_Wallet = (props: any) => {
  return (
    <>
      <Col className="px-md-3" sm="12" md="2" lg="2">
        <CardHeaderCommon headClass="pb-20" title={"Total Business"} />
        <Card className="client-card card-hover">
          <CardBody>
            <div className="flex-grow-1 px-4 px-md-0 py-2 py-md-0 text-left text-md-center">
              <Image
                className="b-r-10 img-50 mb-0 mb-md-4 float-md-none float-end"
                src={dynamicImage("TotalEarning.png")}
                alt="avatar"
              />
              <H3 className="f-w-600">${'0'}</H3>
            
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col className="px-md-3" sm="12" md="2" lg="2">
        <CardHeaderCommon headClass="pb-20" title={TotalEarning} />
        <Card className="client-card card-hover">
          <CardBody>
           
             <div className="flex-grow-1 px-4 px-md-0 py-2 py-md-0 text-left text-md-center">
              <Image
                className="b-r-10 img-50 mb-0 mb-md-4 float-md-none float-end"
                src={dynamicImage("TotalEarning.png")}
                alt="avatar"
              />
              <H3 className="f-w-600">${props.gitwallet}</H3>
            
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" md="2" lg="2" className="col-12">
        <CardHeaderCommon headClass="pb-20" title={TotalWithdrawal} />
        <Card className="client-card card-hover">
          <CardBody>
           
            <div className="flex-grow-1 px-4 px-md-0 py-2 py-md-0 text-left text-md-center">
              <Image
                className="b-r-10 img-50 mb-0 mb-md-4 float-md-none float-end"
                src={dynamicImage("Totalwithdrawal.png")}
                alt="avatar"
              />
              <H3 className="f-w-600">${props.airdrop}</H3>
            
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* <Col md="4" className='col-12'>
          <Card className="client-card card-hover boxshadow">
            <CardBody>
              <Row>
                <Col xs="8" className="custom-width-1">
                  <H5 className='font-secondary' >Bot Daily Trading Profit</H5>
                  <H5 className="f-w-600 font-seeGreen">${props.bonanza}</H5>
                </Col>
                <Col xs="4" className="custom-width-2">
                  <div >
                  <Image src={dynamicImage('Bonanza_Wallet.png')} style={{width:'60px'}} alt='airdrop'/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col> */}
    </>
  );
};

export default Other_Wallet;
