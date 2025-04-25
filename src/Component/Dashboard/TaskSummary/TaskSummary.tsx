import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, TaskSummaryHeading, Weekly, Yearly } from "../../../utils/Constant";
import TaskSummaryLeft from "./TaskSummaryLeft";


const TaskSummary = (props:any) => {
  const {TeamData} = props;
  return (
    <Col xl="5" md="6">
       <CardHeaderCommon headClass="pb-0" title={TaskSummaryHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
      <Card className="summary-card ecommerce-dashboard ">
        <CardBody className="">
            <TaskSummaryLeft TeamData={TeamData}/>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TaskSummary;
