import { H6, LI, UL } from "../../../AbstractElements";
import { LegBusinessData } from "../../../Data/Dashboard/Dashboard";

const CategoryOverviewDetails = (props:any) => {
  const {LegBOverviewData} =props    
  return (
    <UL>
      
        {LegBOverviewData?.map((itm:any, idx:number)=> <LI key={idx} className="d-flex align-items-center bg-light card-hover mt-2" >
          <div className="flex-shrink-0">
          </div>
          <div className="flex-grow-1">
          <H6 className="f-w-500">{itm?.key}</H6>
          <span className="f-16 font-light">{itm?.value}</span>
          </div>
        </LI>)}
        
    
    </UL>
  );
};

export default CategoryOverviewDetails;
