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
    <Col sm="12" md="7" lg="9" xl="9">
      <Row>
        <Col sm="12" md="4" lg="4" xl="4">
          <Card className="project-card" style={{ borderRadius: "10px" }}>
            <CardHeaderCommon
              title={AccountOverviewHeading}
              firstItem={Weekly}
              secondItem={Monthly}
              thirdItem={Yearly}
            />
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
        {myWallets.map((itm: any, idx: number) => (
          <Col sm="12" md="4" xl="4" className="wallet-bg" key={idx}>
            <Card className="wallet-card mb-3 text-black w-100 text-right">
              <center>
                <div className="wallet-image">
                  <Image
                    className="b-r-10 "
                    src={dynamicImage(
                      `avatar/${idx === 2 ? "time.png" : "1.png"}`
                    )}
                    style={{ filter: "invert(1)" }}
                    alt="avatar"
                  />
                </div>
              </center>
              <div
                className="d-flex justify-content-between align-items-center flex-column"
                style={{ textAlign: "left" }}
              >
                <H3 className="wallet-value text-white">{itm?.value}</H3>
                <div className="wallet-name text-white">{itm?.key}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default AccountOverview;
