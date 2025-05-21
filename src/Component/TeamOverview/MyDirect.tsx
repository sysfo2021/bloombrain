import React from "react";
import Breadcrumbs from "../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Col, Container, Row, FormGroup, Input, Label } from "reactstrap";
import { TeamOverViewTitle, My_Direct } from "../../utils/Constant";
import HistoryTable from "../../CommonElements/SearchTable/SearchTable";
import { getSponsorList } from "../../Data/TableData/TableData";
import { useState, useEffect, useMemo } from "react";
import { decryptData } from "../../utils/helper/Crypto";
import { useNavigate } from "react-router-dom";
const MyDirect = () => {
  const [memberID, setmemberID] = useState(
    decryptData(localStorage.getItem("clientId") as string)
  );
  const [API_Payload, setAPIPayload] = useState<any>({});
  const [SeaarchData_date, setSeaarchData_date] = useState<any>(null);
  const navigate = useNavigate();
  // Button click handler
  const handlePlacement = (clientId: string) => {
    navigate(`${process.env.PUBLIC_URL}/placement?mid=` + clientId);
  };
  const sponsorColumns = useMemo(() => getSponsorList(handlePlacement), []);
  useMemo(() => {
    setAPIPayload({
      procName: "SponsorDetails",
      Para: JSON.stringify({
        MemberId: memberID,
        ActionMode: "GetTeamInTable",
      }),
    });
  }, []);
  return (
    <>
      <Breadcrumbs
        mainTitle={My_Direct}
        parent={TeamOverViewTitle}
        ChildName={My_Direct}
      />
      <Container fluid>
        <HistoryTable
          ColumnData={sponsorColumns}
          SeaarchData_date={SeaarchData_date}
          apiPayload={API_Payload}
        />
      </Container>
    </>
  );
};

export default MyDirect;
