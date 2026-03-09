const baseurl="https://newapi.ntafleetsolutions.com"
const api = `${process.env.PUBLIC_URL}/api`;
export const MenuApi=`${baseurl}/api/usermenu`;

export const download=`${baseurl}/api/download`;

export const discount_sheet = `${baseurl}/api/discount_sheet`;
export const discount_list = `${baseurl}/api/discount_list`;
export const company = `${baseurl}/api/company`;
export const company_info = `${baseurl}/api/company/company_info`;
export const send_mail = `${baseurl}/api/send_mail`;

export const companyall = `${baseurl}/api/company/all`;
export const tacompany = `${baseurl}/api/company/taall`;
export const essoOwnercompany = `${baseurl}/api/company/essoownerall`;
export const ulOwnercompany = `${baseurl}/api/company/ulownerall`;
export const fgcompany = `${baseurl}/api/company/fgall`;
export const essocompany = `${baseurl}/api/company/essoall`;
export const ulcompany = `${baseurl}/api/company/ulall`;
export const irvcompany = `${baseurl}/api/company/irvall`;
export const cencompany = `${baseurl}/api/company/cenall`;
export const company_log = `${baseurl}/api/company_log`;
export const transactions = `${baseurl}/api/transactions`;
export const pmenu = `${baseurl}/api/pmenu`;
export const pmenuAll = `${baseurl}/api/pmenu/all`; 
export const login = `${baseurl}/api/admin/login`;
export const loginlog = `${baseurl}/api/admin/user_log`;
export const money_code = `${baseurl}/api/mond_code`;
export const items = `${baseurl}/api/items`;
export const itemsAll = `${baseurl}/api/items/all`;
export const user_tracking = `${baseurl}/api/user_tracking`;
export const tcheck = `${baseurl}/api/tcheck`;
export const tcheck_invoice = `${baseurl}/api/tcheck_invoice`;
export const state = `${baseurl}/api/state`;
export const state_all = `${baseurl}/api/state/all`;
export const city = `${baseurl}/api/city`;
export const country = `${baseurl}/api/country`;
export const combine_invoice = `${baseurl}/api/invoicecombine`;
export const owner_invoice = `${baseurl}/api/owner_invoice`;
export const customized_invoice = `${baseurl}/api/customized_invoice`;
export const salesman_volume = `${baseurl}/api/salesman_volume`;
export const supplier = `${baseurl}/api/supplier`;
export const supplierAll = `${baseurl}/api/supplier/all`;
export const supplierById = `${baseurl}/api/supplier/byid`;
export const administrator = `${baseurl}/api/administrator`;
export const country_all = `${baseurl}/api/country/all`;
export const moneycode_invoice = `${baseurl}/api/moneycode_invoice`;
export const linamar_esso_loc = `${baseurl}/api/linamar_esso_loc`;
export const fual_card = `${baseurl}/api/fual_card`;
export const fual_card_update = `${baseurl}/api/fual_card/card_update_otp`;
export const efs_fual_card = `${baseurl}/api/efs_fual_card`; 
export const salesman = `${baseurl}/api/salesman`;
export const salesmanAll = `${baseurl}/api/salesman/all`; 
export const card_discount_sheet = `${baseurl}/api/card_discount_sheet`;
export const client_Id = `${baseurl}/api/client_Id`;
export const comp_owner_rack_cent = `${baseurl}/api/comp_owner_rack_cent`;
export const comp_owner_report = `${baseurl}/api/comp_owner_report`;
export const company_fee = `${baseurl}/api/company_fee`;
export const company_with_ulcent = `${baseurl}/api/company_with_ulcent`;
export const currency_rate = `${baseurl}/api/currency_rate`;
export const customized_invoice_detail = `${baseurl}/api/customized_invoice_detail`;
export const ta_pricing = `${baseurl}/api/ta_pricing`;
export const ta_pricing_upload = `${baseurl}/api/ta_pricing/upload`;
export const ta_pricing_actual = `${baseurl}/api/ta_pricing_actual`;
export const ta_pricing_actual_upload = `${baseurl}/api/ta_pricing_actual/upload`;
export const ul_pricing = `${baseurl}/api/ul_pricing`;
export const irv_pricing = `${baseurl}/api/irv_pricing`;
export const cen_pricing = `${baseurl}/api/cen_pricing`;
export const  irv_pricing_pdf= `${baseurl}/api/irv_pricing_pdf`;
export const  cen_pricing_pdf= `${baseurl}/api/cen_pricing_pdf`;
export const ul_pricing_upload = `${baseurl}/api/ul_pricing/upload`;
export const love_pricing = `${baseurl}/api/love_pricing`;
export const love_pricing_actual = `${baseurl}/api/love_pricing_actual`;
export const esso_pricing = `${baseurl}/api/esso_pricing`;
export const upload_esso_pricing = `${baseurl}/api/esso_pricing/upload`;
export const unknown_transactions = `${baseurl}/api/transactions/unknown`;
export const macro_trans = `${baseurl}/api/macro_trans`;
export const petro_retail = `${baseurl}/api/petro_retail`;
export const sub_company = `${baseurl}/api/sub_company`;
export const retail_price = `${baseurl}/api/retail_price`;
export const esso_pricing_pdf = `${baseurl}/api/esso_pricing_pdf`;
export const ul_pricing_pdf = `${baseurl}/api/ul_pricing_pdf`;
export const love_pricing_pdf = `${baseurl}/api/love_pricing_pdf`;
export const pricing_pdf = `${baseurl}/api/pricing_pdf`;
export const ta_pricing_pdf = `${baseurl}/api/ta_pricing_pdf`;
export const report = `${baseurl}/api/report`;
export const report_detail = `${baseurl}/api/report_detail`;
export const report_new = `${baseurl}/api/report_new`;
export const report_new_downlod = `${baseurl}/api/report_new/download`;
export const tranaction_total = `${baseurl}/api/transactions/totals`;
export const notification = `${baseurl}/api/notification`;
export const card_update = `${baseurl}/api/fual_card/card_update`;
export const updateHistory = `${baseurl}/api/update_history`;

export const owner_report = `${baseurl}/api/owner_report`;
export const owner_report_downlod = `${baseurl}/api/owner_report/download`;
export const loc_group_Essogroup = `${baseurl}/api/loc_group_new/esso_group`;
export const Esso_cent_Data = `${baseurl}/api/loc_group_new/esso_group_input`;
export const Esso_csv_upload = `${baseurl}/api/esso_cent_new/upload`;

export const ta_group_Tagroup = `${baseurl}/api/ta_group/ta_group`;
export const ta_group_TagroupInput = `${baseurl}/api/ta_group/ta_group_input`;
export const ta_get_rowvalue = `${baseurl}/api/ta_cent/get_rowvalue`;
export const ta_saverowvalue = `${baseurl}/api/ta_cent/upsert`;

export const fg_group_input = `${baseurl}/api/rack_cent/fg_group_input`;
export const fg_get_rowvalue = `${baseurl}/api/rack_cent/fg_row_value`;
export const fg_saverowvalue = `${baseurl}/api/rack_cent/upsert`;
 

export const ul_group_ulgroup = `${baseurl}/api/ul_loc_group/ul_group`;
export const ul_group_ulgroupInput = `${baseurl}/api/ul_loc_group/ul_group_input`;
export const ul_get_rowvalue = `${baseurl}/api/ul_cent/get_rowvalue`;
export const ul_saverowvalue = `${baseurl}/api/ul_cent/upsert`;
export const ul_cent_upload= `${baseurl}/api/ul_cent/ul_upload`;

export const irv_group_irvgroup = `${baseurl}/api/irv_loc_group/irv_group`;
export const irv_group_irvgroupInput = `${baseurl}/api/irv_loc_group/irv_group_input`;
export const irv_get_rowvalue = `${baseurl}/api/irv_cent/get_rowvalue`;
export const irv_saverowvalue = `${baseurl}/api/irv_cent/upsert`; 

export const esso_group_essogroup = `${baseurl}/api/loc_group_new/esso_group`;
export const esso_group_essogroupCity = `${baseurl}/api/loc_group_new/esso_group_city`;
export const esso_group_essogroupInput = `${baseurl}/api/loc_group_new/esso_group_input`;
export const esso_group_essogroupInputCity = `${baseurl}/api/loc_group_new/esso_group_input_city`;


export const esso_get_rowvalue = `${baseurl}/api/esso_cent_new/get_rowvalue`;
export const esso_saverowvalue = `${baseurl}/api/esso_cent_new/upsert`;

export const cen_get_rowvalue = `${baseurl}/api/cen_cent_new/get_rowvalue`;
export const cen_saverowvalue = `${baseurl}/api/cen_cent_new/upsert`;
export const cen_group_cengroupInput = `${baseurl}/api/loc_group_new/cen_group_input`;

export const cen_group_cengroup = `${baseurl}/api/loc_group_new/cen_group`;
export const cen_cent_upload = `${baseurl}/api/cen_cent_new/cen_upload`;
export const cen_cent_new = `${baseurl}/api/cen_cent_new`;


export const esso_group_owner_essogroupInput = `${baseurl}/api/owner_rack_cent/esso_group_input`;
export const essoOwner_get_rowvalue = `${baseurl}/api/owner_rack_cent/esso_row_value`;
export const esso_owner_saverowvalue = `${baseurl}/api/owner_rack_cent/upsert`;
export const esso_owner_cent = `${baseurl}/api/owner_rack_cent`;

export const ul_group_owner_ulgroupInput = `${baseurl}/api/ul_owner_rack_cent/ul_group_input`;
export const ulOwner_get_rowvalue = `${baseurl}/api/ul_owner_rack_cent/ul_row_value`;
export const ul_owner_saverowvalue = `${baseurl}/api/ul_owner_rack_cent/upsert`;
export const ul_owner_cent = `${baseurl}/api/ul_owner_rack_cent`;

export const love_group_lovegroup = `${baseurl}/api/love_group/love_group`;
export const love_group_lovegroupInput = `${baseurl}/api/love_group/love_group_input`;

export const love_get_rowvalue = `${baseurl}/api/love_cent/get_rowvalue`;
export const love_saverowvalue = `${baseurl}/api/love_cent/upsert`;


export const esso_rack = `${baseurl}/api/esso_rack`;
export const esso_rack_all = `${baseurl}/api/esso_rack/all`;
export const esso_cent_auto = `${baseurl}/api/loc_group_new/esso_group_input_auto`;
export const tcheck_upload = `${baseurl}/api/tcheck/upload`;
export const smenu = `${baseurl}/api/smenu`;
export const Create_retail_invoice = `${baseurl}/api/invoice/create_retail_invoice`;
export const Create_rack_invoice = `${baseurl}/api/invoice/create_rack_invoice`;

export const CreateRetailInvoice = `${baseurl}/api/invoice/create_retail_invoice`;
export const CreateRackInvoice = `${baseurl}/api/invoice/create_rack_invoice`;
export const CreateEssoInvoice = `${baseurl}/api/invoice/create_esso_invoice`;
export const CreateEssoOwnerInvoice = `${baseurl}/api/invoice/create_esso_owner_invoice`;
export const CreateEssoCustomizedInvoice = `${baseurl}/api/invoice/create_esso_customized_invoice`;

export const CreateCenInvoice = `${baseurl}/api/invoice/create_cen_invoice`;
export const CreateCenOwnerInvoice = `${baseurl}/api/invoice/create_cen_owner_invoice`;
export const CreateCenCustomizedInvoice = `${baseurl}/api/invoice/create_cen_customized_invoice`


export const CreateUttramarInvoice = `${baseurl}/api/invoice/create_uttramar_invoice`;
export const CreateUttramarOwnerInvoice = `${baseurl}/api/invoice/create_uttramar_owner_invoice`;
export const CreateUttramarCustomizedInvoice = `${baseurl}/api/invoice/create_uttramar_customized_invoice`;
export const CreateMonocodeInvoice = `${baseurl}/api/invoice/create_monycode_invoice`;
export const CreateTcheckInvoice = `${baseurl}/api/invoice/create_tcheck_invoice`;
export const retail_to_rack_Api = `${baseurl}/api/transactions/retailtorack`;
export const create_pricing_pdf = `${baseurl}/api/pricing/create_pricing_pdf`;
export const zero_discount = `${baseurl}/api/zero_discount`;

export const esso_cent = `${baseurl}/api/esso_cent`;
export const irv_cent = `${baseurl}/api/irv_cent`;
export const esso_cent_new = `${baseurl}/api/esso_cent_new`;
export const esso_cent_upload = `${baseurl}/api/esso_cent_new/esso_upload`;
export const love_cent = `${baseurl}/api/love_cent`;
export const esso_city_cent = `${baseurl}/api/esso_city_cent`;
export const esso_group_cent = `${baseurl}/api/esso_group_cent`;
export const love_corp_cent = `${baseurl}/api/love_corp_cent`;
export const esso_rack_cent = `${baseurl}/api/esso_rack_cent`;
export const esso_cent_wise_rack = `${baseurl}/api/esso_cent_wise_rack`;
export const love_rack_cent = `${baseurl}/api/love_rack_cent`;
export const owner_rack_cent = `${baseurl}/api/owner_rack_cent`;
export const rack_cent = `${baseurl}/api/rack_cent`;
export const esso_city = `${baseurl}/api/esso_city`;
export const esso_transactions = `${baseurl}/api/esso_transactions`;
export const esso_ultramar_petro = `${baseurl}/api/esso_ultramar_petro`;
export const invoice = `${baseurl}/api/invoice`;
export const invoice_detail = `${baseurl}/api/invoice_detail`;
export const loc_group = `${baseurl}/api/loc_group`;
export const loc_group_new = `${baseurl}/api/loc_group_new`;
export const love_group = `${baseurl}/api/love_group`;
export const menu = `${baseurl}/api/menu`;
export const moneycode_invoice_detail = `${baseurl}/api/moneycode_invoice_detail`;
export const multidate_pricing_excel = `${baseurl}/api/multidate_pricing_excel`;
export const oauth_tokens = `${baseurl}/api/oauth_tokens`;
export const owner_invoice_detail = `${baseurl}/api/owner_invoice_detail`;
export const permission = `${baseurl}/api/permission`;
export const petro_bvd = `${baseurl}/api/petro_bvd`;
export const petro_bvd_bkp = `${baseurl}/api/petro_bvd_bkp`;
export const petro_transactions = `${baseurl}/api/petro_transactions`;
export const pricing = `${baseurl}/api/pricing`;
export const rebate = `${baseurl}/api/rebate`;
export const retail_invoice = `${baseurl}/api/retail_invoice`;
export const retail_invoice_detail = `${baseurl}/api/retail_invoice_detail`;
export const retail_invoice_detail_new = `${baseurl}/api/retail_invoice_detail_new`;
export const retail_invoice_new = `${baseurl}/api/retail_invoice_new`;
export const send_email = `${baseurl}/api/send_email`;
export const ta_cent = `${baseurl}/api/ta_cent`;
export const ta_centValue = `${baseurl}/api/ta_cent/get_value`;
export const ta_corp_cent = `${baseurl}/api/ta_corp_cent`;
export const ta_group = `${baseurl}/api/ta_group`;
export const ta_location = `${baseurl}/api/ta_location`;
export const ta_rack_cent = `${baseurl}/api/ta_rack_cent`;
export const tcheck_invoice_detail = `${baseurl}/api/tcheck_invoice_detail`;
export const transactions_efs = `${baseurl}/api/transactions_efs`;
export const ul_cent = `${baseurl}/api/ul_cent`;
export const ul_group_cent = `${baseurl}/api/ul_group_cent`;
export const ul_loc_group = `${baseurl}/api/ul_loc_group`;
export const ul_owner_rack_cent = `${baseurl}/api/ul_owner_rack_cent`;
export const update_history = `${baseurl}/api/update_history`;
export const user_log = `${baseurl}/api/user_log`;
export const view_loc = `${baseurl}/api/view_loc`;
export const bulk_pricing_excel = `${baseurl}/api/bulk_pricing_excel`;



