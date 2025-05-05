import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Container, Row } from "reactstrap";
import SVG from "../SVG";
import { Image } from "../../AbstractElements";
import { PropsTypes } from "../../Type/Layout/CommonElements/Breadcrumbs";
import H3 from "../Headings/H3Element";
import Btn from "../Button";
import { FaGooglePlay } from "react-icons/fa";
import H6 from "../Headings/H6Element";
import P from "../Paragraph";
import { dynamicImage } from "../../Service";
import { FaUser } from "react-icons/fa";
const Breadcrumbs = ({ mainTitle, parent, ChildName }: PropsTypes) => {
  return (
    <Container fluid>
      <Row className="page-title align-items-center">
        <div
          className={
            mainTitle === "Dashboard" ? "col-4 col-md-2 order-1" : "col-md-6"
          }
        >
          <H3>{mainTitle}</H3>
        </div>
        <div className="col-8 col-sm-6 col-md-8 px-0 order-2 justify-content-end">
          <div
            className={
              mainTitle === "Dashboard"
                ? "d-flex gap-2 justify-content-end"
                : "d-none"
            }
          >
            {/* <Link to="https://whatsapp.com/channel/0029Vb0wtlWLikg9GKmA1A2b" target="_blank" rel="noopener noreferrer">
            <Image src={dynamicImage('social.png')} alt="facebook"  className="social-icon"/>
            </Link> */}
            <Link to="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={dynamicImage("social/Facebook_W.png")}
                alt="facebook"
                className="social-icon"
              />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={dynamicImage("social/Youtube_W.png")}
                alt="instagram"
                className="social-icon"
              />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={dynamicImage("social/Instagram_W.png")}
                alt="telegram"
                className="social-icon"
              />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
              <Image
                src={dynamicImage("social/Whatsapp_W.png")}
                alt="facebook"
                className="social-icon"
              />
            </Link>
          </div>
        </div>
       
        <div
          className={
            mainTitle === "Dashboard"
              ? "col-12 mb-3 mb-md-0 col-md-3 col-xl-2 order-md-3 order-2 "
              : "col-md-6"
          }
        >
          <Breadcrumb className="justify-content-sm-end align-items-center">
            <BreadcrumbItem>
              <Link to={`${process.env.PUBLIC_URL}`}>
                <SVG iconId="Home" className="svg-color" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{parent}</BreadcrumbItem>
            {ChildName ? (
              <BreadcrumbItem className="active">{ChildName}</BreadcrumbItem>
            ) : undefined}
          </Breadcrumb>
        </div>
      </Row>
    </Container>
  );
};

export default Breadcrumbs;
