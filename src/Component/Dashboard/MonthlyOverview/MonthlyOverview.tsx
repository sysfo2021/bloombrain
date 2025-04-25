import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, MonthlyOverviewHeading, Weekly, Yearly } from "../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { monthlyOverviewChartData } from "../../../Data/Dashboard/DashboardChartData";

const MonthlyOverview = () => {
  return (
    <Col xl="7" md="6" lg="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={MonthlyOverviewHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody>
          <div className="monthly-overview" id="monthly-overview" >
            <ReactApexChart options={monthlyOverviewChartData} series={monthlyOverviewChartData.series} height={290} type={"bar"} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MonthlyOverview;
