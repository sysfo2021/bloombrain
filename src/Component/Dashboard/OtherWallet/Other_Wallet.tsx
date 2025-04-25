import React from 'react'
import { Card, CardBody, Col, Row } from "reactstrap";
import { H3, H5, Image } from "../../../AbstractElements";
import { dynamicImage } from '../../../Service';
import { TotalWithdrawal, TotalEarning } from "../../../utils/Constant";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
const Other_Wallet = (props:any) => { 
  return (
        <>
        <Col md="4" className='col-12'>
          <Card className="client-card card-hover">
          <CardHeaderCommon headClass="pb-20" title={TotalWithdrawal} />
            <CardBody>
              <Row>
                <Col xs="6" className="custom-width-1">
                  {/* <H5 className='font-primary'>Total Withdrawal</H5> */}
                  <H3 className="f-w-600 ">${props.airdrop}</H3>
                </Col>
                <Col xs="6" className="custom-width-2">
                  <div >
                   <Image src={dynamicImage('Totalwithdrawal.png')}  className='img-40 drop-shodow f-right media' alt='airdrop'/>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className='col-12 px-md-3 ' md="4">
          <Card className="client-card card-hover">
          <CardHeaderCommon headClass="pb-20" title={TotalEarning} />
            <CardBody>
              <Row>
                <Col xs="6" className="custom-width-1">
                  {/* <H5 className='font-primary'>Total Earning</H5> */}
                  <H3 className="f-w-600">${props.gitwallet}</H3>
                </Col>
                <Col xs="6" className="custom-width-2">
                  <div >
                   <Image src={dynamicImage('TotalEarning.png')} className='img-40 drop-shodow f-right media' alt='airdrop'/>
                  </div>
                </Col>
              </Row>
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

  )
}

export default Other_Wallet