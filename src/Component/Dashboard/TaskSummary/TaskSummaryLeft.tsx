import { Col, Row } from "reactstrap";
import { H4, H5, H6, LI, SVG, UL, Image } from "../../../AbstractElements";
import { taskSummaryLeftData } from "../../../Data/Dashboard/Dashboard";
import { dynamicImage } from "../../../Service";

const TaskSummaryLeft = (props: any) => {
  const {TeamData} = props;
  return (
    <Row>
      {TeamData.map((itm:any, idx:number) => <Col sm="12" md="4" lg="4" xl="4" key={idx}>
        <UL>
          <LI
            className={`d-flex align-items-center mb-2 mb-md-0 card-hover ${itm?.color}`}
            style={{ padding: "10px", borderRadius: "10px" }}
          >
            <div className="flex-shrink-0"></div>
            <div className="flex-grow-1 px-4 px-md-0 py-2 py-md-0 text-left text-md-center">
              <Image
                className="b-r-10 img-40 mb-0 mb-md-2 float-md-none float-end"
                src={itm?.icon}
                alt="avatar"
              />
              <H4 className="f-w-500">{itm?.count}</H4>
              <span className="f-16 font-light mt-0 mt-md-2">{itm?.title}</span>
            </div>
          </LI>
        </UL>
      </Col>
    )}
    </Row>
  );
};

export default TaskSummaryLeft;
