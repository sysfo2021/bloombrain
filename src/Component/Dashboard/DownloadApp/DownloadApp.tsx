import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, DownloadAppHeading, Weekly, Yearly } from "../../../utils/Constant";
import { useState } from "react";
import { Btn, H2, H6, H4, H3, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";


const DownloadApp = ({ downloadappData }: any) => {
  const [tabId, setTabId] = useState<string>("mon-tab")
  return (
   
      <Col xl="4" sm="4">
        <CardHeaderCommon headClass="pb-20" title={DownloadAppHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <Card className="schedule-card">
          <CardBody>
            <Row>
              <div className="col-6 col-md-6 col-lg-6 col-xl-6"><H3 className="mt-1">{downloadappData}</H3></div>
              <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                <Image className="img-40 drop-shodow f-right" src={dynamicImage(`income_5.png`)} alt="avatar" />
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
     
    
  );
};

export default DownloadApp;
