import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { BusinessOverviewHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import BusinessOverviewDetails from "./BusinessOverviewDetails";
import LegBusinessOverview from "./LegBusinessOverview";

const CategoryOverview = (props:any) => {
  return (
    <Col md="5" xl="4" className="ecommerce-dashboard ">
       <CardHeaderCommon headClass="pb-0" title={BusinessOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
      <Card className="">
       
        <CardBody className="category" style={{paddingTop:'0px'}}>
          <Row>
            <Col xl="6" xs="6">
              <LegBusinessOverview LegBOverviewData={props?.LegBViewdata}/>
            </Col>
            <Col xl="6" xs="6">
              <BusinessOverviewDetails  overViewdata={props?.BOverviewData}/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoryOverview;
