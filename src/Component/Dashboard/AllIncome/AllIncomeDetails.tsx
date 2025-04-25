import { Input } from "reactstrap";
import { Btn, H6, Image } from "../../../AbstractElements";
import { Link } from "react-router-dom";
import { Href } from "../../../utils/Constant";
import { dynamicImage } from '../../../Service';

const AllIncomeDetails = (props:any) => { 
  const {Allincomes} = props 
  
  let Data = [
    {title:"IB Income", Amt:Allincomes[0]?.value, icon:<Image className="b-r-10 img-40" src={dynamicImage(`avatar/1.png`)} alt="avatar" />, path:`${process.env.PUBLIC_URL}/monthlyprofitincome`},
    {title:"Bot Income ", Amt:Allincomes[1]?.value,icon:<Image className="b-r-10 img-40" src={dynamicImage(`avatar/2.png`)} alt="avatar" />, path:Href},
    {title:"Rank & Reward", Amt:Allincomes[2]?.value,icon:<Image className="b-r-10 img-40" src={dynamicImage(`avatar/3.png`)} alt="avatar" />, path:`${process.env.PUBLIC_URL}/botlevelincome`},
    {title:"Club Income", Amt:Allincomes[3]?.value,icon:<Image className="b-r-10 img-40" src={dynamicImage(`avatar/4.png`)} alt="avatar" />, path:`${process.env.PUBLIC_URL}/profitsharing`},
    {title:"Profit Sharing Income", Amt:Allincomes[4]?.value,icon:<Image className="b-r-10 img-40" src={dynamicImage(`avatar/5.png`)} alt="avatar" />, path:`${process.env.PUBLIC_URL}/royaltylog`}
  ]
  return (
    <>
      {Data?.map((item:any, i:number) => (
        <tr key={i}>
          <td style={{width:'50%', padding:'0px !important'}}>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0 px-0">
                {/* <Image className="b-r-10 img-40" src={dynamicImage(`avatar/11.jpg`)} alt="avatar" /> */}
                {/* <LuBarChart4 size={25}/> */}
                {item?.icon}
              </div>
              <div className="flex-grow-1 all-Incomes">
                <Link to={Href}>
                  <H6 className="f-w-500 Font-S">{item.title}</H6>
                </Link>
              </div>
            </div>
          </td>
          <td className="px-0 fw-bolder" dangerouslySetInnerHTML={{ __html: item.Amt }}></td>
          <td>
          <Link to={item?.path}> <Btn className={`edge-btn f-13 w-100`} color='light-primary'>
              View
              </Btn>
              </Link>
          </td>
        </tr> 
      ))}
    </>
  );
};

export default AllIncomeDetails;
