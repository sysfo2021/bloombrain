import SamplePage from "../Pages/SamplePage/SamplePage";

import DashboardPage from "../Pages/Dashboard/Dashboard";

import MyProfilePage from "../Pages/MyProfile/MyProfile";


import WelcomeLetterPage from "../Pages/WelcomeLetter/WelcomeLetter";
import MyIdCardPage from "../Pages/MyIdCard/MyIdCard";

import AccountSettingPage from "../Pages/AccountSettings/AccountSettings";
import ActivateBotPage from "../Pages/ActivateBot/ActivateBot";
import BonanzaPage from "../Pages/Reward/Bonanza";
import LifeTimeRewardPage from "../Pages/Reward/LifeTimeReward";

import USSDTTRC20Page from "../Pages/DepositFund/USDTTRC20";
import USSDTBEP20Page from "../Pages/DepositFund/USDTBEP20";

import FundINRPage from "../Pages/DepositFund/FundINR";
import FxstTokenHistoryPage from "../Pages/DepositFund/FXSTTokenHistory";
import DepositHistoryPage from "../Pages/DepositFund/DepositHistory";
import DepositWalletPage from "../Pages/WalletTransfer/DepositWallet";
import FasttrackRemport from "../Pages/Payout/FastTrackIncome"
import FxstPayWalletPage from "../Pages/WalletTransfer/FxstPayWallet";
import FxstockWalletPage from "../Pages/WalletTransfer/FxstockWallet";
import FxWalletReport from '../Pages/WalletTransfer/FxWalletReport'

import RequestWithdrawPage from "../Pages/Withdraw/RequestWithdraw";
import WithdrawHistoryPage from "../Pages/Withdraw/WithdrawHistory";
import BotLevelIncomePage from "../Pages/Payout/BotLevelInome";
import MonthlyProfitIncome from '../Pages/Payout/MonthlyProfitIncome'
import ProfileSharingIncomePage from "../Pages/Payout/ProfitSharingIncome";
import RoyaltylogReportPage from '../Pages/Payout/RoyaltyLogIncome'
import ChashbacklevelContainer from '../Pages/Payout/CashbackLevelIncome'

import LevelwiseTeamList from '../Pages/TeamOverviews/LevelwiseTeamList'
import BusinessReport from '../Pages/TeamOverviews/BusinessReport'
import GenerationTree from '../Pages/TeamOverviews/GenerationTree'
import DepositFXSTToken from '../Pages/DepositFund/DepositFXSTToken'
import SupportTicket from '../Pages/SupportTicket/SupportTicket'
import MyDirectPage from '../Pages/TeamOverviews/MyDirectReport'
import MyTeamBusinessPage from '../Pages/TeamOverviews/MyTeamBusiness'
import TeamDownline from '../Pages/TeamOverviews/Downline'
import Geneaology from "../Pages/TeamOverviews/Geneaology";
import FundReportINR from '../Pages/DepositFund/RequestfundINR'
import P2PTransferPage from "../Pages/WalletTransfer/P2PTransfer";
import P2PWalletReport from "../Pages/WalletTransfer/P2PReport";
import FxstPayWalletToCommission from "../Pages/WalletTransfer/FxstPayWalletToCommission";
import AccountStatement from "../Pages/AccountStatement/AccountStatement";
import LotteryTransfer from "../Pages/Lottery/KingMakerzTransfer";
import LotteryTransferLog from "../Pages/Lottery/KingMakerzTransferLog";
import KYC_Deposit from "../Pages/DepositFund/KYC_Deposit";
import AadharKYC from "../Component/Profile/AadharKYC";
import Package from "../Pages/Packages/Package";
import PackageHistory from "../Pages/Packages/PackageHistory";
import BotMatchingIncome from "../Pages/Payout/BotMatchingIncome";
import ClubIncomes from "../Pages/Payout/ClubIncomes";
import IBIncomes from "../Pages/Payout/IBIncomes";
import MT5Acccount from "../Pages/MT5Account/ActivateMT5Act";
import PlacementBox from '../Pages/TeamOverviews/MemberPlacement'
const routes = [

  // Sample Page
  { path: `${process.env.PUBLIC_URL}/samplepage`, Component: <SamplePage /> },
  // Dashboard Page
  { path: `${process.env.PUBLIC_URL}/dashboard`, Component: <DashboardPage /> },

  { path: `${process.env.PUBLIC_URL}/myprofile`, Component: <MyProfilePage /> },
  // { path: `${process.env.PUBLIC_URL}/docverification`, Component: <AadharKYC /> },

  // { path: `${process.env.PUBLIC_URL}/welcomeletter`, Component: <WelcomeLetterPage /> },

  { path: `${process.env.PUBLIC_URL}/myidcard`, Component: <MyIdCardPage /> },
  { path: `${process.env.PUBLIC_URL}/accountsettings`, Component: <AccountSettingPage /> },
  { path: `${process.env.PUBLIC_URL}/activatebot`, Component: <ActivateBotPage /> },
  { path: `${process.env.PUBLIC_URL}/mt5account`, Component: <MT5Acccount /> },
  
  { path: `${process.env.PUBLIC_URL}/bonanza`, Component: <BonanzaPage /> },
  { path: `${process.env.PUBLIC_URL}/rankandreward`, Component: <LifeTimeRewardPage /> },
  { path: `${process.env.PUBLIC_URL}/trc20`, Component: <USSDTTRC20Page /> },
  { path: `${process.env.PUBLIC_URL}/bep20`, Component: <USSDTBEP20Page /> },
  // { path: `${process.env.PUBLIC_URL}/requestfund`, Component: <FundINRPage /> },
  // { path: `${process.env.PUBLIC_URL}/requestfund`, Component: <FundINRPage /> },
  // { path: `${process.env.PUBLIC_URL}/FxstTokenHistory`, Component: <FxstTokenHistoryPage /> },
  { path: `${process.env.PUBLIC_URL}/DepositHistory`, Component: <DepositHistoryPage /> },
  { path: `${process.env.PUBLIC_URL}/inrfundreport`, Component: <FundReportINR /> },


  { path: `${process.env.PUBLIC_URL}/DepositWallet`, Component: <DepositWalletPage /> },
  { path: `${process.env.PUBLIC_URL}/FxstPayWallet`, Component: <FxstPayWalletPage /> },
  { path: `${process.env.PUBLIC_URL}/p2ptransfer`, Component: <P2PTransferPage /> },
  // { path: `${process.env.PUBLIC_URL}/FxstockWallet`, Component: <FxstockWalletPage /> },
  // { path: `${process.env.PUBLIC_URL}/fxstockwalletreport`, Component: <FxWalletReport /> },
  // { path: `${process.env.PUBLIC_URL}/fxstpaytocommission`, Component: <FxstPayWalletToCommission /> },
  { path: `${process.env.PUBLIC_URL}/p2pwalletreport`, Component: <P2PWalletReport /> },
  { path: `${process.env.PUBLIC_URL}/kycwallet`, Component: <KYC_Deposit /> },

  //Lottery
  { path: `${process.env.PUBLIC_URL}/transfer`, Component: <LotteryTransfer /> },
  { path: `${process.env.PUBLIC_URL}/transferlog`, Component: <LotteryTransferLog /> },


  { path: `${process.env.PUBLIC_URL}/RequestWithdraw`, Component: <RequestWithdrawPage /> },
  { path: `${process.env.PUBLIC_URL}/WithdrawHistory`, Component: <WithdrawHistoryPage /> },
  { path: `${process.env.PUBLIC_URL}/botLevelIncome`, Component: <BotLevelIncomePage /> },
  { path: `${process.env.PUBLIC_URL}/botmatchingincome`, Component: <BotMatchingIncome /> },
  { path: `${process.env.PUBLIC_URL}/monthlyprofitincome`, Component: <MonthlyProfitIncome /> },
  { path: `${process.env.PUBLIC_URL}/profitsharing`, Component: <ProfileSharingIncomePage /> },
  { path: `${process.env.PUBLIC_URL}/fasttrackincome`, Component: <FasttrackRemport /> },
  {path:`${process.env.PUBLIC_URL}/clubincome`, Component: <ClubIncomes/>},
  {path:`${process.env.PUBLIC_URL}/ibincome`, Component: <IBIncomes/>},
  { path: `${process.env.PUBLIC_URL}/royaltylog`, Component: <RoyaltylogReportPage /> },
  { path: `${process.env.PUBLIC_URL}/supportticket`, Component: <SupportTicket /> },

  { path: `${process.env.PUBLIC_URL}/levelwiseteamlist`, Component: <LevelwiseTeamList /> },
  { path: `${process.env.PUBLIC_URL}/businessreport`, Component: <BusinessReport /> },
  { path: `${process.env.PUBLIC_URL}/teamdownline`, Component: <TeamDownline /> },
  { path: `${process.env.PUBLIC_URL}/tree`, Component: <GenerationTree /> },
  { path: `${process.env.PUBLIC_URL}/sponsorlist`, Component: <MyDirectPage /> },
  { path: `${process.env.PUBLIC_URL}/myteambusiness`, Component: <MyTeamBusinessPage /> },
  // { path: `${process.env.PUBLIC_URL}/fxstdeposit`, Component: <DepositFXSTToken /> },
  { path: `${process.env.PUBLIC_URL}/accountstatement`, Component: <AccountStatement /> },
  { path: `${process.env.PUBLIC_URL}/package`, Component: <Package /> },
  { path: `${process.env.PUBLIC_URL}/packagehistory`, Component: <PackageHistory />},
  { path: `${process.env.PUBLIC_URL}/binarytree`, Component: <Geneaology /> },
  { path: `${process.env.PUBLIC_URL}/placement`, Component: <PlacementBox /> },

]

export default routes;