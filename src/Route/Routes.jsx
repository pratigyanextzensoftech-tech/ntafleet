// dashbaord
import Dashboard from '../Components/dashboard/dashboard'
import Report_Dashboard from '../Components/dashboard/report_dashboard'
import Ggraph_Dashboard from '../Components/dashboard/graph_dashboard'

// discount
import CreateDiscount from '../Components/discount/createDiscount/ViewIndex.jsx';
import ViewDiscount from '../Components/discount/view/ViewIndex.jsx';
import DiscountSheet from '../Components/discount/discountSheet/DiscountSheetIndex.jsx';
import BulkDiscount from '../Components/discount/bulkDiscount/index';
import ZeroDiscount from '../Components/discount/zeroDiscount/index';

//Retail Price
import Upload from '../Components/retailPrice/upload/UploadIndex.jsx';
import PetroRetail from '../Components/retailPrice/petro/index';

//Pricing
import DownloadEssoCent from '../Components/pricing/download_essocent/index';
import UpdateEssoCent from '../Components/pricing/updateEssoCent/index';
import ManageEssoCent from '../Components/pricing/manage_essocent/index';
import UploadFjPrice from '../Components/pricing/uploadPricing/index';
import PriceList from '../Components/pricing/pricing_list/PriceListIndex.jsx';
//import SinglePricing from '../Components/pricing/singlePricingPdf/single_price_pdf';
import SinglePricing from '../Components/pricing/singlePricingPdf/SinglePdfIndex.jsx';
import BulkPrice from '../Components/pricing/bulk_price/index';
import EssoBulk from '../Components/pricing/essoBulk/index';
import CenBulk from '../Components/pricing/cen_bulk/index.jsx';
import LoveBulk from '../Components/pricing/loveBulk/index';
import Ultramar from '../Components/pricing/ultramar/index'
import TaPetroBulk from '../Components/pricing/taPetroBulk/index';
import UpdateFgRack from '../Components/pricing/updateFg/index';
import UpdateTaPetro from '../Components/pricing/updateTaPetro/index';
import UpdateLoveRack from '../Components/pricing/updateLoveRack/index';
import OwnerOperator from '../Components/pricing/ownerOperator/index';
import EssoGroup from '../Components/pricing/essoGroup/index';
import CenGroup from '../Components/pricing/cenGroup/index';
import IrvingGroup from '../Components/pricing/irvingGroup/index';
import UltramarGroup from '../Components/pricing/ultramarGroup/index';
import DownloadBulk from '../Components/pricing/downloadBulk/index';
import IrvingBulk from '../Components/pricing/IrvingBulk/index.jsx'
//Items
import AddItems from '../Components/items/addItems/ItemsIndex.jsx';

//Company
import AddCompany from '../Components/company/AddCompany'
import ViewCompany from '../Components/company/index.jsx';
import EditCompany from '../Components/company/EditCompany'
import CompanyInfo from '../Components/company/CompanyInfo/CompanyInfo';
import SubLOgin from '../Components/company/subLogin/index.jsx';

//Fuel Card
import AddFuel from '../Components/fuelCards/addFuel/index';
import ViewFuel from '../Components/fuelCards/view/ViewFuelCard.jsx';
import EFSFuel from '../Components/fuelCards/viewEFS/index';
import HistoryFuel from '../Components/fuelCards/history/index';
import EditInformation from '../Components/fuelCards/editInformation/index.jsx'

//Transaction
import ViewTransaction from '../Components/transaction/view/ViewTransaction.jsx'
import UploadTransaction from '../Components/transaction/upload/index'
import TransactionList from '../Components/transaction/transactionList/index';
import UnknownTransaction from '../Components/transaction/unKnownTransaction/index';
import EssoFtpLive from '../Components/transaction/essoFtpLive/index';
import CheckTransaction from '../Components/transaction/checkTransaction/index';
import RackToRetail from '../Components/transaction/rackToRetail/index';
import RetailToRack from '../Components/transaction/retailToRack/index';
import ViewEfs from '../Components/transaction/viewEfs/ViewEfsList.jsx';
import UpdateUnit from '../Components/transaction/updateUnitDriver/index';

//Invoice

import ViewInvoice from '../Components/viewInvoice/ViewIndex.jsx';

import ViewPdf from '../Components/viewInvoice/ViewPdf.jsx';
import CreateInvoice from '../Components/createInvoice/CreateInvoice';
import CheckOldINvoice from '../Components/checkOldInvoice/CheckOldINvoice';
import RetailInvoice from '../Components/retailInvoice/RetailInvoice';
import CreateOldInvoice from '../Components/creatwOldInvoice/CreateOldInvoice';
import CreateMoneyCode from '../Components/createMoneyCode/CreateMoneyCode';
import CreateEssoInvoice from '../Components/createEssoInvoice/CreateEssoInvoice';
import ManageMacro from '../Components/manageMacro/ManageMacro';
import CreateCustomized from '../Components/createCustomized/CreateCustomized';
import CreateUltramar from '../Components/createUltramar/CreateUltramar';
import CreateRepeat from '../Components/createRepeat/CreateRepeat';
import SendBulk from '../Components/sendBulk/index.jsx';
import CompareInvoice from '../Components/compareInvoice/index'
import CreateCenInvoice from '../Components/CreateCenInvoice/Index.jsx'
//Reports
import ViewReports from '../Components/reports/viewReports/ViewReportLIst.jsx';
import SalesmanVol from '../Components/reports/salesmanVolume/SalesManList.jsx';
import CreateReports from '../Components/reports/createReport/index';

//Supplier
import SupplierList from '../Components/supplier/supplierList/SupplierIndex.jsx';

//Money Code
import MoneyCodeList from '../Components/moneyCode/moneyCodeList/MoneyCode.jsx';
import AddMoneyCode from '../Components/moneyCode/addMoneyCode/index';
import UploadMoney from '../Components/moneyCode/upload/index'
import ViewMoneyCode from '../Components/viewMoneyCode/index.jsx';
import CheckInvoicemoneyCode from '../Components/moneyCode/checkInvoic/index';


//Location
import LinamarEsso from '../Components/location/linamarEsso/LinamarEssoIndex.jsx';
import PetroLink from '../Components/location/petroLink/index';
import ViewCountry from '../Components/location/viewCountry/CountryIndex.jsx'
import ViewStates from '../Components/location/viewState/ViewStateIndex.jsx'
import ViewCity from '../Components/location/viewCity/ViewCityIndex.jsx'
import ManageLoc from '../Components/location/manageLoc/index'
import ManageGroup from '../Components/location/manageGroup/index'

//Setting
import UserLogin from '../Components/setting/userLogin/index'
import TrackVisitor from '../Components/setting/trackVisitor/index'
import CompanyLogin from '../Components/setting/companyLogin/index'
import ManageUser from '../Components/setting/manageUser/ManageUserIndex.jsx'
import ManageSalesman from '../Components/setting/manageSalesman/ManageSalesManIndex.jsx';
import ManageMenu from '../Components/setting/manageMenu/Index'

//Tcheck
import UploadTcheck from '../Components/tcheck/upload/index'
import TcheckList from '../Components/tcheck/list/TcheckList.jsx'
import TcheckEditForm from '../Components/tcheck/list/TcheckEditForm'
import CreateTCheck from '../Components/tcheck/create/index'
import ViewTCheck from '../Components/tcheck/view/ViewTcheck.jsx'

//Help
import Help_Use_Efsllc from '../Components/help/help_use_efsllc';
import Help_Add_Card from '../Components/help/help_add_card';
import How_Create_Report from '../Components/help/how_create_report';
import How_Card_Discount from '../Components/help/how_card_discount';
import EditUnknownTransaction from '../Components/transaction/unKnownTransaction/EditUnknownTransaction';
 import EditFuel from '../Components/fuelCards/editFuel/index'
import EditMoneyCodeForm from '../Components/moneyCode/addMoneyCode/EditMoneyCode';
import Notification from '../Components/notification/index';
import CreateIrving from '../Components/createIrving/CreateIrving.jsx';
export const routes = [
    //Dashboard
    { path: `/dashboard`, Component: <ViewTransaction /> },
    { path: `/report_dashboard`, Component: <Report_Dashboard /> },
    { path: `/graph_dashboard`, Component: <Ggraph_Dashboard /> },
    //Discount
    { path: `/create_discount`, Component: <CreateDiscount /> },
    { path: `/view_discount`, Component: <ViewDiscount /> },
    { path: `/discount_Sheet`, Component: <DiscountSheet /> },
    { path: `/create_bulk_discount`, Component: <BulkDiscount /> },
    { path: `/zero_discount_location`, Component: <ZeroDiscount /> },
    //Retail Price
    { path: `/upload_retail_prices`, Component: <Upload /> },
    { path: `/petro_retail_prices`, Component: < PetroRetail /> },
    //Pricing
    { path: `/download_esso_cent`, Component: < DownloadEssoCent /> },
    { path: `/update_esso_centwise`, Component: < UpdateEssoCent /> },
    { path: `/manage_esso_cent`, Component: <ManageEssoCent /> },
    { path: `/upload_price`, Component: <UploadFjPrice /> },
    { path: `/price_list`, Component: <PriceList /> },
    { path: `/single_price_pdf`, Component: <SinglePricing /> },
    { path: `/fj_bulk_price`, Component: <BulkPrice /> },
    { path: `/ta_petro_bulk_price`, Component: <TaPetroBulk /> },
    { path: `/esso_bulk_price`, Component: <EssoBulk /> },
    { path: `/irving_bulk_price`, Component: <IrvingBulk /> },
    { path: `/love_bulk_price`, Component: <LoveBulk /> },
    { path: `/ultramar_bulk_price`, Component: <Ultramar /> },
    { path: `/update_fg_rack_price`, Component: <UpdateFgRack /> },
    { path: `/update_taPetro_rack_price`, Component: <UpdateTaPetro /> },
    { path: `/update_love_rack_pricing`, Component: <UpdateLoveRack /> },
    { path: `/OwnerUpdate_rack_price`, Component: <OwnerOperator /> },
    { path: `/esso_group_rack_price`, Component: <EssoGroup /> },
    { path: `/irving_group_rack_price`, Component: <IrvingGroup /> },
    { path: `/ultramarGroup_rack_pric`, Component: <UltramarGroup /> },
    { path: `/download_bulk_excel`, Component: <DownloadBulk /> },
    { path: `/cen_bulk_pricing`, Component: <CenBulk /> },
    { path: `/cen_group_pricing`, Component: <CenGroup /> },
    //Items
    { path: `/add_items`, Component: <AddItems /> },
    { path: `/view_items`, Component: <AddItems /> },
    //Company
    { path: `/add_company`, Component: <AddCompany /> },
    { path: `/edit_company/:id`, Component: <EditCompany /> },
    { path: `/view_company`, Component: <ViewCompany /> },
    { path: `/company_info`, Component: <CompanyInfo /> },
    { path: `/sub_login`, Component: <SubLOgin /> },
    //Fuel Card
    { path: `/add_card`, Component: < AddFuel /> },
    { path: `/view_fuelCards`, Component: < ViewFuel /> },
    { path: `/efs_view_card`, Component: < EFSFuel /> },
    { path: `/card_update`, Component: < HistoryFuel /> },
    { path: `/edit-fuelCards/:id`, Component: < EditFuel /> },
    { path: `/edit-information/:id`, Component: < EditInformation /> },
    //Transaction
    { path: `/view_transaction`, Component: < ViewTransaction /> },
    { path: `/upload_transaction`, Component: < UploadTransaction /> },
    { path: `/Esso_ftp_transaction`, Component: < TransactionList /> },
    { path: `/unknown_transaction`, Component: < UnknownTransaction /> },
    { path: `/Esso_ftp_liveTransaction`, Component: < EssoFtpLive /> },
    { path: `/check_transaction`, Component: < CheckTransaction /> },
    { path: `/rack_to_retail_transaction`, Component: < RackToRetail /> },
    { path: `/to_retail_transaction`, Component: < RetailToRack /> },
    { path: `/view_efs_transaction`, Component: < ViewEfs /> },
    { path: `/update_unit`, Component: < UpdateUnit /> },
    { path: `/edit-transaction/:id`, Component: < EditUnknownTransaction /> },
    //Invoice
    { path: `/view_invoice`, Component: <ViewInvoice /> },
    { path: `/viewInvoice/ViewPdf/:id`, Component: <ViewPdf /> },
    { path: `/create_invoice`, Component: <CreateInvoice /> },
    { path: `/check_invoice`, Component: <CheckOldINvoice /> },
    { path: `/create_retail_invoice`, Component: <RetailInvoice /> },
    { path: `/create_old_Invoice`, Component: <CreateOldInvoice /> },
    { path: `/create_moneycode_Invoice`, Component: <CreateMoneyCode /> },
    { path: `/create_esso_Invoice`, Component: <CreateEssoInvoice /> },
    { path: `/manage_Macro`, Component: <ManageMacro /> },
    { path: `/create_customized_Invoice`, Component: <CreateCustomized /> },
    { path: `/create_ul_invoice`, Component: <CreateUltramar /> },
    { path: `/create_repeat_invoice`, Component: <CreateRepeat /> },
    { path: `/send_bulk_mail`, Component: <SendBulk /> },
    { path: `/compare_invoice`, Component: <CompareInvoice /> },
    { path: `/create_irv_invoice`, Component: <CreateIrving /> },
    { path: `/create_cen_invoice`, Component: <CreateCenInvoice /> },
    //Report 
    { path: `/view_Reports`, Component: <ViewReports /> },
    { path: `/salesman_report`, Component: <SalesmanVol /> },
    { path: `/create_Reports`, Component: <CreateReports /> },
    //Supplier
    { path: `/suppler_list`, Component: <SupplierList /> },
    { path: `/add_supplier`, Component: <SupplierList /> },
    //Money Code 
    { path: `/money_code_List`, Component: <MoneyCodeList /> },
    { path: `/addMoney_code_List`, Component: <AddMoneyCode /> },
    { path: `/editMoney_code_List/:id`, Component: < EditMoneyCodeForm /> },
    { path: `/upload_money_code`, Component: <UploadMoney /> },
    { path: `/view_moneyCode_invoices`, Component: <ViewMoneyCode /> },
    { path: `/check_moneycode`, Component: <CheckInvoicemoneyCode /> },
    // Location
    { path: `/Linamar_Esso_Location`, Component: < LinamarEsso /> },
    { path: `/esso_ulramar_petroLink`, Component: < PetroLink /> },
    { path: `/view_Countries`, Component: < ViewCountry /> },
    { path: `/view_states`, Component: < ViewStates /> },
    { path: `/view_cities`, Component: < ViewCity /> },
    { path: `/manage_location`, Component: < ManageLoc /> },
    { path: `/manage_group`, Component: < ManageGroup /> },
    //Setting
    { path: `/login_log`, Component: < UserLogin /> },
    { path: `/track_visitors`, Component: < TrackVisitor /> },
    { path: `/company_log`, Component: < CompanyLogin /> },
    { path: `/manage_user`, Component: <ManageUser /> },
    { path: `/manage_user/:id`, Component: <ManageUser /> },
    { path: `/manage_salesMan`, Component: < ManageSalesman /> },
    { path: `/manage_Menu`, Component: < ManageMenu /> },
    //TCheck
    { path: `/upload_tcheck`, Component: < UploadTcheck /> },
    { path: `/tcheck_list`, Component: < TcheckList /> },
    { path: `/tcheck_list/:id`, Component: <TcheckEditForm /> },
    { path: `/create_tcheck_invoice`, Component: < CreateTCheck /> },
    { path: `view_tcheck_invoices`, Component: < ViewTCheck /> },
    //Help
    { path: `/help_use_efsllc`, Component: <Help_Use_Efsllc/> },
    { path: `/help_add_card`, Component: <Help_Add_Card /> },
    { path: `/how_create_report`, Component: <How_Create_Report /> },
    { path: `/how_card_discount`, Component: <How_Card_Discount /> }, 
    //notification
    { path: `/manage_notification`, Component: <Notification /> },
];
