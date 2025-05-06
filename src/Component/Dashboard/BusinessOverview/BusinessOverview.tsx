import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { BusinessOverviewHeading, Monthly, Weekly, Yearly } from "../../../utils/Constant";
import BusinessOverviewDetails from "./BusinessOverviewDetails";
import LegBusinessOverview from "./LegBusinessOverview";
import TotalInvestment from "../TotalInvestment/TotalInvestment";

const CategoryOverview = (props:any) => {
  return (
    <Col sm="12" md="12" lg="8" xl="7" className="ecommerce-dashboard ">
       <CardHeaderCommon headClass="pb-0" title={BusinessOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
      <Card className="">
        <CardBody className="category" style={{paddingTop:'0px'}}>
          <Row>
            <TotalInvestment TotalInvestmentData={props?.TotalinvestmentData} />
            <Col xl="3" xs="6">
              <LegBusinessOverview LegBOverviewData={props?.LegBViewdata}/>
            </Col>
            <Col xl="3" xs="6">
              <BusinessOverviewDetails  overViewdata={props?.BOverviewData}/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CategoryOverview;
