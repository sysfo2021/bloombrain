import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import { Monthly, TotalInvestmentHeading, Weekly, Yearly } from "../../../utils/Constant";
import ReactApexChart from "react-apexcharts";
import { totalInvestmentChart } from "../../../Data/Dashboard/DashboardChartData";
import { H5, H6, LI, UL, Btn,Image } from "../../../AbstractElements";
import { totalInvestmentFooterData } from "../../../Data/Dashboard/Dashboard";
import { dynamicImage } from '../../../Service/index'
const TotalInvestment = (props: any) => {
  const {TotalinvestmentData} = props
  const Data = [
    {title:"Power Leg Business", Value:TotalinvestmentData[0]?.value, ImgPath:dynamicImage(`L-business.png`)},
    {title:"Weaker Leg Business", Value:TotalinvestmentData[0]?.value, ImgPath:dynamicImage(`R-business.png`)}
  ]
  
  return (
    <Col xl="3" md="3">
      <Card className="invest-card ecommerce-dashboard">
        <CardHeaderCommon headClass="pb-0" title={TotalInvestmentHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="p-0 category ">
          <UL>
            {Data.map((itm:any, idx:number)=> <LI className="d-flex  bg-light card-hover mt-2" style={{padding:'10px'}}>
              <div className="flex-shrink-0">
              </div>
              <div className="flex-grow-1"  style={{textAlign:'left',position:'relative'}}>
                <H6 className="f-w-500">{itm?.title}</H6>
                <span className="f-16 font-light">{itm?.Value}</span>
                <Image className="img-30 f-right" src={itm?.ImgPath} alt="avatar" style={{position:'absolute',right:'0px',top:'7px'}}  />
              </div>
            </LI>)}
            {/* <LI className="d-flex align-items-center bg-light card-hover mt-2"  style={{padding:'10px'}}>
              <div className="flex-shrink-0">

              </div>
              <div className="flex-grow-1"  style={{textAlign:'left',position:'relative'}}>
              <H6 className="f-w-500" style={{textAlign:'left'}}>Right Leg Business</H6>
                <span className="f-16 font-light">0</span>
                <Image className="img-30 f-right" src={dynamicImage(`R-business.png`)} alt="avatar" style={{position:'absolute',right:'0px',top:'7px'}}  />
              </div>
            </LI> */}

          </UL>
          {/* <Btn color="edge-btn f-13 w-100 btn btn-light-tertiary" className="mt-2">View Full Report</Btn> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalInvestment;
