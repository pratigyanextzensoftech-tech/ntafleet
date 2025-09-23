import React from "react";
import { FaHome, FaTags, FaBuilding, FaQuestionCircle,FaSitemap,FaMoneyBillAlt } from "react-icons/fa";
import { MdPriceChange,MdReport } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { GiFuelTank } from "react-icons/gi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaTruck  } from "react-icons/fa6";
const iconMap = {
  dashboard: FaHome,
  discount: FaTags,
  company: FaBuilding,
  help: FaQuestionCircle,
  price:MdPriceChange,
  item:FaSitemap ,
  fuel:GiFuelTank,
  transaction:GrTransaction,
    invoices:LiaFileInvoiceSolid,
report:MdReport,
location:FaLocationDot,
setting:IoIosSettings,
tcheck:BsFillPatchCheckFill,
supply:FaTruck,
moneyCode:FaMoneyBillAlt


};

const SidebarIcon = ({ icon, className = "sidebar-icon" }) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default SidebarIcon;
