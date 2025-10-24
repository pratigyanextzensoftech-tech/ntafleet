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
import Help from '../Components/help/index';
import AddCard from '../Components/help/addCard/index';

export const routes = [
{ path: `/dashboard`, Component: <ViewTransaction /> },
{ path: `/default`, Component: <ViewTransaction /> },
{ path: `/report_Dashboard`, Component: <ReportDashboard /> },
{ path: `/how_to_use_efsllc.com`, Component: <Help /> },
{ path: `/how_to_add_card`, Component: <AddCard /> },
  { path: `/manage_user`, Component: <ManageUser /> },
  { path: `/add_company`, Component: <AddCompany /> },
  { path: `/view_company`, Component: <ViewCompany /> },
  { path: `/company_info`, Component: <CompanyInfo /> },
  { path: `/manage_subLogin`, Component: <SubLOgin /> },
  { path: `/create_invoice`, Component: <CreateInvoice /> },
  { path: `/view_invoice`, Component: <ViewInvoice /> },
  { path: `/check_invoice`, Component: <CheckOldINvoice /> },
    { path: `/create_retail_invoice`, Component: <RetailInvoice /> },
    { path: `/create_old_Invoice`, Component: <CreateOldInvoice /> },
    { path: `/create_moneycode_Invoice`, Component: <CreateMoneyCode /> },
    { path: `/create_esso_Invoice`, Component: <CreateEssoInvoice /> },
    { path: `/manage_Macro`, Component: <ManageMacro /> },
    { path: `/create_customized_Invoice`, Component: <CreateCustomized /> },
    { path: `/create_ui_invoice`, Component: <CreateUltramar /> },
    { path: `/create_repeat_invoice`, Component: <CreateRepeat /> },
    { path: `/send_bulk_mail`, Component: <SendBulk /> },
    { path: `/compare_Invoices`, Component: <CompareInvoice /> },
    { path: `/view_moneyCode_invoices`, Component: <ViewMoneyCode /> },
    { path: `/suppler_list`, Component: <SupplierList /> },
    { path: `/add_supplier`, Component: <SupplierList /> },
    { path: `/money_code_List`, Component: <MoneyCodeList /> },
    { path: `/addMoney_code_List`, Component: <AddMoneyCode /> },
    { path: `/upload_money_code`, Component: <UploadMoney /> },
    { path: `/check_moneycode`, Component: <CheckInvoicemoneyCode /> },
    { path: `/view_Reports`, Component: <ViewReports /> },
    { path: `/salesman_report`, Component: <SalesmanVol /> },
    { path: `/create_Reports`, Component: <CreateReports /> },
    { path: `/add_items`, Component: <AddItems /> },
    { path: `/view_items`, Component: <AddItems /> },
    { path: `/upload_retail_prices`, Component: <Upload /> },
    { path: `petro_retail_prices`, Component: < PetroRetail/> },
    { path: `/add_card`, Component: < AddFuel/> },
    { path: `/view_fuelCards`, Component: < ViewFuel/> },
    { path: `/efs_view_card`, Component: < EFSFuel/> },
    { path: `/last24_update`, Component: < HistoryFuel/> },
    { path: `/create_discount`, Component: < CreateDiscount/> },
    { path: `/view_Discount`, Component: < ViewDiscount/> },
    { path: `/discount_Sheet`, Component: < DiscountSheet/> },
    { path: `/create_Bulk_Discount`, Component: < BulkDiscount/> },
    { path: `/zero_Discount_Location`, Component: < ZeroDiscount/> },
    { path: `/upload_tcheck`, Component: < UploadTcheck/> },
    { path: `/tcheck_list`, Component: < TcheckList/> },
    { path: `/create_tcheck_invoice`, Component: < CreateTCheck/> },
    { path: `view_tcheck_invoices`, Component: < ViewTCheck/> },
    { path: `/login_log`, Component: < UserLogin/> },
    { path: `/company_log`, Component: < CompanyLogin/> },
    { path: `/manage_salesMan`, Component: < ManageSalesman/> },
    { path: `/manage_Menu`, Component: < ManageMenu/> },
    { path: `/track_visitors`, Component: < TrackVisitor/> },
    { path: `/Linamar_Esso_Location`, Component: < LinamarEsso/> },
    { path: `/esso_ulramar_petroLink`, Component: < PetroLink/> },
    { path: `/view_Countries`, Component: < ViewCountry/> },
    { path: `/view_states`, Component: < ViewStates/> },
    { path: `/view_cities`, Component: < ViewCity/> },
    { path: `/manage_location`, Component: < ManageLoc/> },
    { path: `/manage_group`, Component: < ManageGroup/> },
    { path: `/view_transaction`, Component: < ViewTransaction/> },
    { path: `/upload_transaction`, Component: < UploadTransaction/> },
    { path: `/Esso_ftp_transaction`, Component: < TransactionList/> },
    { path: `/unknown_transaction`, Component: < UnknownTransaction/> },
    { path: `/unknown_transaction`, Component: < UnknownTransaction/> },
    { path: `/Esso_ftp_liveTransaction`, Component: < EssoFtpLive/> },
    { path: `/check_transaction`, Component: < CheckTransaction/> },
    { path: `/update_unit`, Component: < UpdateUnit/> },
    { path: `/view_efs_transaction`, Component: < ViewEfs/> },
    { path: `/rack_to_retail_transaction`, Component: < RackToRetail/> },
    { path: `/to_retail_transaction`, Component: < RetailToRack/> },
    { path: `/download_esso_cent`, Component: < DownloadEssoCent/> },
    { path: `/update_esso_centwise`, Component: < UpdateEssoCent/> },
    { path: `/manage_esso_cent`, Component: <ManageEssoCent /> },
    { path: `/upload_price`, Component: <UploadFjPrice /> },
    { path: `/price_list`, Component: <PriceList /> },
    { path: `/single_price_pdf`, Component: <SinglePricing /> },
    { path: `/fj_bulk_price`, Component: <BulkPrice /> },
    { path: `/esso_bulk_price`, Component: <EssoBulk /> },
    { path: `/love_bulk_price`, Component: <LoveBulk /> },
    { path: `/ultramar_bulk_price`, Component: <Ultramar /> },
    { path: `/update_fg_rack_price`, Component: <UpdateFgRack /> },
    { path: `/update_taPetro_rack_price`, Component: <UpdateTaPetro /> },
    { path: `/update_love_rack_pricing`, Component: <UpdateLoveRack /> },
    { path: `/OwnerUpdate_rack_price`, Component: <OwnerOperator /> },
    { path: `/esso_group_rack_price`, Component: <EssoGroup /> },
    { path: `/ultramarGroup_rack_price`, Component: <UltramarGroup /> },
    { path: `/download_bulk_excel`, Component: <DownloadBulk /> },
];
