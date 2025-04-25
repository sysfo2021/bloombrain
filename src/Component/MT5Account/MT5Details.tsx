import React from 'react'
import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { MT5DetailHeading } from "../../utils/Constant";
import { UL, LI, H5 } from "../../AbstractElements";

const MT5Details = (props: any) => {

  return (

    <Card className="project-card">
      <CardHeaderCommon title={MT5DetailHeading} />
      <CardBody className="pt-3">
        <Row className="align-items-center">

          <Col className="d-sm-none d-md-block">
            <UL className="overview-details">
              {props?.botData.map((item: any, i: number) => (
                <LI className="d-flex align-items-center p-0 mb-3" key={i}>
                  <div className={`circle-dot-${item.color}`}>
                    <span />
                  </div>
                  <H5 className="custom-h5">
                    {item.Name}
                    <span className="font-light" style={{ float: 'right' }}>
                      {item.Name === "Bot Status" ? (
                        <div dangerouslySetInnerHTML={{ __html: item.Information }} />
                      ) : (
                        <> {item.Information}</>
                      )}
                    </span>
                  </H5>
                </LI>
              ))}
            </UL>
          </Col>

        </Row>

      </CardBody>
    </Card>

  );
};

export default MT5Details;

