import { Card, CardBody, Col, Row } from "reactstrap";
import CardHeaderCommon from "../../../CommonElements/CommonCardHeader/CardHeaderCommon";
import {
  Monthly,
  AccountOverviewHeading,
  Weekly,
  Yearly,
} from "../../../utils/Constant";
import { H4, Btn, Image, H3 } from "../../../AbstractElements";
import AccountOverviewDetail from "./AccountOverviewDetail";
import { dynamicImage } from "../../../Service";

const AccountOverview = (props: any) => {
  const { myWallets } = props;
  console.log(myWallets);
  return (
    <Col sm="12" md="7" lg="6" xl="6">
      <Row>
        <Col sm="12" md="6" lg="6" xl="6">
          <CardHeaderCommon
            title={AccountOverviewHeading}
            firstItem={Weekly}
            secondItem={Monthly}
            thirdItem={Yearly}
          />
          <Card className="project-card">
            <CardBody className="pt-0 px-2">
              <H4>
                <button
                  style={{ padding: "5px" }}
                  className="edge-btn f-13 f-10 w-100 btn btn-light-primary mt-2"
                >
                  Last Login {props?.LastLogin}
                </button>
              </H4>
              <AccountOverviewDetail actOverview={props?.actOverviewData} />
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6" xl="6">
          <div>
            {myWallets.map((itm: any, idx: number) => (
              <Btn
                key={idx}
                color="primary f-14 mb-3 text-black w-100 height74 btnBg text-right"
              >
                <Row>
                  <div className="col-4 col-md-4 col-sm-4">
                    <center>
                      <Image
                        className="b-r-10 img-50"
                        src={dynamicImage(
                          `avatar/${idx === 2 ? "time.png" : "1.png"}`
                        )}
                        style={{ filter: "invert(1)" }}
                        alt="avatar"
                      />
                    </center>
                  </div>
                  <div
                    className="col-8 order-first col-md-8 col-sm-8"
                    style={{ textAlign: "left" }}
                  >
                    <H3 className="text-white">{itm?.value}</H3>
                    <div style={{ fontSize: "12px" }}>{itm?.key}</div>
                  </div>
                </Row>
              </Btn>
            ))}
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default AccountOverview;
