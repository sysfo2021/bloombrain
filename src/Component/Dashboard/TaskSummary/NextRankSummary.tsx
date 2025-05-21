import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, NextRankSummaryHeading, Weekly, Yearly } from "../../../utils/Constant";
import RankSummaryLeft from "./RankSummaryLeft";


const TaskSummary = (props:any) => {
  const {TeamData} = props;
  return (
    <Col sm="12" md="6" lg="6" xl="6">
       <CardHeaderCommon headClass="pb-0" title={NextRankSummaryHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
      <Card className="summary-card ecommerce-dashboard ">
        <CardBody className="">
            <RankSummaryLeft TeamData={TeamData}/>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TaskSummary;
