// dashbaord
import ManageUser from '../Components/manageUser'
import AddCompany from '../Components/addCompany'
import CreateInvoice from '../Components/createInvoice/CreateInvoice';
import ViewInvoice from '../Components/viewInvoice/ViewInvoice';
import CheckOldINvoice from '../Components/checkOldInvoice/CheckOldINvoice';
import RetailInvoice from '../Components/retailInvoice/RetailInvoice';
import CreateOldInvoice from '../Components/creatwOldInvoice/CreateOldInvoice';
import CreateMoneyCode from '../Components/createMoneyCode/CreateMoneyCode';
import CreateEssoInvoice from '../Components/createEssoInvoice/CreateEssoInvoice';
import ManageMacro from '../Components/manageMacro/ManageMacro';
import CreateCustomized from '../Components/createCustomized/CreateCustomized';
import CreateUltramar from '../Components/createUltramar/CreateUltramar';
import CreateRepeat from '../Components/createRepeat/CreateRepeat';
import SendBulk from '../Components/sendBulk/SendBulk';
import CompareInvoice from '../Components/compareInvoice/index'
import ViewMoneyCode from '../Components/viewMoneyCode/ViewMOneyCode';
import ViewCompany from '../Components/viewCompany/ViewCompany';
import CompanyInfo from '../Components/CompanyInfo/CompanyInfo';
import SubLOgin from '../Components/subLogin/SubLogin';
import SupplierList from '../Components/supplier/supplierList/index';
import MoneyCodeList from '../Components/moneyCode/moneyCodeList/index';
import AddMoneyCode from '../Components/moneyCode/addMoneyCode/index';
import UploadMoney from '../Components/moneyCode/upload/index'
import CheckInvoicemoneyCode from '../Components/moneyCode/checkInvoic/index';
import ViewReports from '../Components/reports/viewReports/index';
import SalesmanVol from '../Components/reports/salesmanVolume/index';
import CreateReports from '../Components/reports/createReport/index';
import AddItems from '../Components/items/addItems/index';
import Upload from '../Components/retailPrice/upload/index';
import PetroRetail from '../Components/retailPrice/petro/index';
import AddFuel from '../Components/fuelCards/addFuel/index';
import ViewFuel from '../Components/fuelCards/view/index';
import EFSFuel from '../Components/fuelCards/viewEFS/index';
import HistoryFuel from '../Components/fuelCards/history/index';
import CreateDiscount from '../Components/discount/createDiscount/index';
import ViewDiscount from '../Components/discount/view/index';
import DiscountSheet from '../Components/discount/discountSheet/index';
import BulkDiscount from '../Components/discount/bulkDiscount/index';
import ZeroDiscount from '../Components/discount/zeroDiscount/index';
import UploadTcheck from '../Components/tcheck/upload/index'
import TcheckList from '../Components/tcheck/list/index'
import CreateTCheck from '../Components/tcheck/create/index'
import ViewTCheck from '../Components/tcheck/view/index'
import UserLogin from '../Components/setting/userLogin/index'
import CompanyLogin from '../Components/setting/companyLogin/index'
import ManageSalesman from '../Components/setting/manageSalesman/index';
import ManageMenu from '../Components/setting/manageMenu/Index'
import TrackVisitor from '../Components/setting/trackVisitor/index'
import LinamarEsso from '../Components/location/linamarEsso/index';
import PetroLink from '../Components/location/petroLink/index';
import ViewCountry from '../Components/location/viewCountry/index'
import ViewStates from '../Components/location/viewState/index'
import ViewCity from '../Components/location/viewCity/index'
import ManageLoc from '../Components/location/manageLoc/index'
import ManageGroup from '../Components/location/manageGroup/index'
import ViewTransaction from '../Components/transaction/view/index'
import UploadTransaction from '../Components/transaction/upload/index'
import TransactionList from '../Components/transaction/transactionList/index';
import UnknownTransaction from '../Components/transaction/unKnownTransaction/index';
import EssoFtpLive from '../Components/transaction/essoFtpLive/index';
import CheckTransaction from '../Components/transaction/checkTransaction/index';
import UpdateUnit from '../Components/transaction/updateUnitDriver/index';
import ViewEfs from '../Components/transaction/viewEfs/index';
import RackToRetail from '../Components/transaction/rackToRetail/index';
import RetailToRack from '../Components/transaction/retailToRack/index';
import DownloadEssoCent from '../Components/pricing/download_essocent/index';
import UpdateEssoCent from '../Components/pricing/updateEssoCent/index';
import ManageEssoCent from '../Components/pricing/manage_essocent/index';
import UploadFjPrice from '../Components/pricing/uploadPricing/index';
import PriceList from '../Components/pricing/pricing_list/index';
import SinglePricing from '../Components/pricing/singlePricingPdf/index';
import BulkPrice from '../Components/pricing/bulk_price/index';
import EssoBulk from '../Components/pricing/essoBulk/index';
import LoveBulk from '../Components/pricing/loveBulk/index';
import Ultramar from '../Components/pricing/ultramar/index'
import UpdateFgRack from '../Components/pricing/updateFg/index';
import UpdateTaPetro from '../Components/pricing/updateTaPetro/index';
import UpdateLoveRack from '../Components/pricing/updateLoveRack/index';
import OwnerOperator from '../Components/pricing/ownerOperator/index';
import EssoGroup from '../Components/pricing/essoGroup/index';
import UltramarGroup from '../Components/pricing/ultramarGroup/index';
import DownloadBulk from '../Components/pricing/downloadBulk/index';
import ReportDashboard from '../Components/dashboard/index';
export const routes = [
{ path: `/dashboard`, Component: <ViewTransaction /> },
{ path: `/default/:layout`, Component: <ViewTransaction /> },
{ path: `/report_Dashboard/:layout`, Component: <ReportDashboard /> },

  { path: `/manage_user/:layout`, Component: <ManageUser /> },
  { path: `/add_company/:layout`, Component: <AddCompany /> },
  { path: `/view_company/:layout`, Component: <ViewCompany /> },
  { path: `/company_info/:layout`, Component: <CompanyInfo /> },
  { path: `/manage_subLogin/:layout`, Component: <SubLOgin /> },
  { path: `/create_invoice/:layout`, Component: <CreateInvoice /> },
  { path: `/view_invoice/:layout`, Component: <ViewInvoice /> },
  { path: `/check_invoice/:layout`, Component: <CheckOldINvoice /> },
    { path: `/create_retail_invoice/:layout`, Component: <RetailInvoice /> },
    { path: `/create_old_Invoice/:layout`, Component: <CreateOldInvoice /> },
    { path: `/create_moneycode_Invoice/:layout`, Component: <CreateMoneyCode /> },
    { path: `/create_esso_Invoice/:layout`, Component: <CreateEssoInvoice /> },
    { path: `/manage_Macro/:layout`, Component: <ManageMacro /> },
    { path: `create_customized_Invoice/:layout`, Component: <CreateCustomized /> },
    { path: `create_ui_invoice/:layout`, Component: <CreateUltramar /> },
    { path: `create_repeat_invoice/:layout`, Component: <CreateRepeat /> },
    { path: `send_bulkMail/:layout`, Component: <SendBulk /> },
    { path: `compare_Invoices/:layout`, Component: <CompareInvoice /> },
    { path: `view_moneyCode_invoices/:layout`, Component: <ViewMoneyCode /> },
    { path: `suppler_list/:layout`, Component: <SupplierList /> },
    { path: `add_supplier/:layout`, Component: <SupplierList /> },
    { path: `money_code_List/:layout`, Component: <MoneyCodeList /> },
    { path: `addMoney_code_List/:layout`, Component: <AddMoneyCode /> },
    { path: `upload_money_code/:layout`, Component: <UploadMoney /> },
    { path: `check_Invoiced_MoneyCode/:layout`, Component: <CheckInvoicemoneyCode /> },
    { path: `view_Reports/:layout`, Component: <ViewReports /> },
    { path: `salesman_volume_Report/:layout`, Component: <SalesmanVol /> },
    { path: `create_Reports/:layout`, Component: <CreateReports /> },
    { path: `add_items/:layout`, Component: <AddItems /> },
    { path: `view_items/:layout`, Component: <AddItems /> },
    { path: `upload_retail_prices/:layout`, Component: <Upload /> },
    { path: `petro_retail_prices/:layout`, Component: < PetroRetail/> },
    { path: `add_fuelCards/:layout`, Component: < AddFuel/> },
    { path: `view_fuelCards/:layout`, Component: < ViewFuel/> },
    { path: `fuel_cardList/:layout`, Component: < EFSFuel/> },
    { path: `last24_update/:layout`, Component: < HistoryFuel/> },
    { path: `create_discount/:layout`, Component: < CreateDiscount/> },
    { path: `view_Discount/:layout`, Component: < ViewDiscount/> },
    { path: `discount_Sheet/:layout`, Component: < DiscountSheet/> },
    { path: `create_Bulk_Discount/:layout`, Component: < BulkDiscount/> },
    { path: `zero_Discount_Location/:layout`, Component: < ZeroDiscount/> },
    { path: `upload_t_check/:layout`, Component: < UploadTcheck/> },
    { path: `t_checkList/:layout`, Component: < TcheckList/> },
    { path: `create_t_check_Invoices/:layout`, Component: < CreateTCheck/> },
    { path: `view_t_check_Invoices/:layout`, Component: < ViewTCheck/> },
    { path: `user_login/:layout`, Component: < UserLogin/> },
    { path: `company_log/:layout`, Component: < CompanyLogin/> },
    { path: `manage_salesMan/:layout`, Component: < ManageSalesman/> },
    { path: `manage_Menu/:layout`, Component: < ManageMenu/> },
    { path: `track_visitors/:layout`, Component: < TrackVisitor/> },
    { path: `Linamar_Esso_Location/:layout`, Component: < LinamarEsso/> },
    { path: `esso_ulramar_petroLink/:layout`, Component: < PetroLink/> },
    { path: `view_Countries/:layout`, Component: < ViewCountry/> },
    { path: `view_states/:layout`, Component: < ViewStates/> },
    { path: `view_cities/:layout`, Component: < ViewCity/> },
    { path: `manage_location/:layout`, Component: < ManageLoc/> },
    { path: `manage_group/:layout`, Component: < ManageGroup/> },
    { path: `view_transaction/:layout`, Component: < ViewTransaction/> },
    { path: `upload_transaction/:layout`, Component: < UploadTransaction/> },
    { path: `Esso_ftp_transaction/:layout`, Component: < TransactionList/> },
    { path: `unknown_transaction/:layout`, Component: < UnknownTransaction/> },
    { path: `unknown_transaction/:layout`, Component: < UnknownTransaction/> },
    { path: `Esso_ftp_liveTransaction/:layout`, Component: < EssoFtpLive/> },
    { path: `check_transaction/:layout`, Component: < CheckTransaction/> },
    { path: `update_unit_driver/:layout`, Component: < UpdateUnit/> },
    { path: `view_efs_transaction/:layout`, Component: < ViewEfs/> },
    { path: `rackTo_retail_transaction/:layout`, Component: < RackToRetail/> },
    { path: `retailTo_rack_transaction/:layout`, Component: < RetailToRack/> },
    { path: `download_esso_cent/:layout`, Component: < DownloadEssoCent/> },
    { path: `update_esso_centwise/:layout`, Component: < UpdateEssoCent/> },
    { path: `manage_esso_cent/:layout`, Component: <ManageEssoCent /> },
    { path: `upload_price/:layout`, Component: <UploadFjPrice /> },
    { path: `price_list/:layout`, Component: <PriceList /> },
    { path: `single_price_pdf/:layout`, Component: <SinglePricing /> },
    { path: `fj_bulk_price/:layout`, Component: <BulkPrice /> },
    { path: `esso_bulk_price/:layout`, Component: <EssoBulk /> },
    { path: `love_bulk_price/:layout`, Component: <LoveBulk /> },
    { path: `ultramar_bulk_price/:layout`, Component: <Ultramar /> },
    { path: `update_fg_rack_price/:layout`, Component: <UpdateFgRack /> },
    { path: `update_taPetro_rack_price/:layout`, Component: <UpdateTaPetro /> },
    { path: `update_love_rack_pricing/:layout`, Component: <UpdateLoveRack /> },
    { path: `OwnerUpdate_rack_price/:layout`, Component: <OwnerOperator /> },
    { path: `esso_group_rack_price/:layout`, Component: <EssoGroup /> },
    { path: `ultramarGroup_rack_price/:layout`, Component: <UltramarGroup /> },
    { path: `download_bulk_excel/:layout`, Component: <DownloadBulk /> },
];
