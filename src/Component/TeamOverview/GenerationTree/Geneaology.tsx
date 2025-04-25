import BinaryTree from '../../../Component/Tree/BinaryTree';
import { dynamicImage } from '../../../Service';
import React, { useState, useEffect } from "react";
import { useApiHelper } from '../../../utils/helper/apiHelper';
import { decryptData } from "../../../utils/helper/Crypto";
const BinaryTreeComponent = () => {
  const { post, loading } = useApiHelper();
  const [firstNode, setfirstNode] = useState<any>(null);
  const [treeData, settreeData] = useState<any>([]);
  const [ClientID, setClientID] = useState(decryptData(localStorage.getItem("clientId") as string));
  const generateTreeNodes = (Data:any) =>{
    const Result =  Data.map((itm:any)=>( 
        {id:itm?.id,
        left_child_id:itm?.left_child_id,
        right_child_id:itm?.right_child_id,
        username:itm?.username,
        description:{
          userName:itm?.userName,
          Reg_Date:itm?.Reg_Date,
          Bot_Status:itm?.BotActivationStatus,
          Bot_Activation_Date:itm?.Bot_Activation_Date,
          Sponsor:itm?.Sponsor,
          totalleftTeamCount: itm?.TotalLeftTeamBotCount,
          totalRightTeamCount:itm?.TotalRightTeamBotCount,
          leftTeamCount: itm?.LeftTeamBotCount,
          rightTeamCount:itm?.RightTeamBotCount,
          leftRemainingTeamCount: itm?.LeftRemainingTeamBotCount,
          rightRemaining:itm?.RightRemainingTeamBotCount
        },
        image:dynamicImage(itm?.NodeImg)
      }
      
    ))
    return Result
    
  }

  const FetchNodeData = async (clientId: any) => {
    const param = {
      ClientId: clientId
    }
    const obj = {
      procName: 'GetBinaryTree',
      Para: JSON.stringify(param),
    };
    const res = await doAajxCall(obj);
    // console.log(res);
    const treeNodes = generateTreeNodes(res);
    // console.log(treeNodes[0]);
    
    setfirstNode(treeNodes[0])
    // console.log(treeNodes);
    settreeData(treeNodes);
  }
  const doAajxCall = async (payload: any) => {
    try {
      return await post(`${process.env.REACT_APP_API_URL}/ExecuteProcedure`, payload); 
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  };
  useEffect(() => {
    FetchNodeData(ClientID);
  }, []); // Empty dependency array to ensure this runs only once on mount

  

  return (
    <div className='page-body'>
      {firstNode ? <BinaryTree
        allUsers={treeData}
        rootUser={treeData[0]}
        bgSideBar={'#00b6eb'}
        colorText={'#333'}
        colorSideBar={'#fff'}
      // imageFake={'https://imgur.com/PE0P672.png'}
      // nameFake={'undefined'}  
      // bgButton={'blue'}
      // colorButton={'black'}
      // disableSideBar
      // disableNavigation
      // renderNode={user=>{
      //   return (<div>Node</div>);
      // }}
      // renderDetail={user => {
      //   return <div>User</div>;
      // }}
      /> : <div className='d-flex justify-content-center align-items-center' style={{minHeight:'300px'}}>
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
      </div>}

      {/* <Geneaology/> */}
    </div>

  )
}

export default BinaryTreeComponent