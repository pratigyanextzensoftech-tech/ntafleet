import React from "react";
import {   FaRegBuilding ,FaDollarSign ,FaRegCreditCard ,FaFlag ,FaUserSecret,FaRegCheckSquare  ,FaCogs ,FaQrcode ,FaQuestionCircle,FaSitemap,FaMoneyBillAlt } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { GrTransaction } from "react-icons/gr";
import { GiFuelTank } from "react-icons/gi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaTruck  } from "react-icons/fa6";
const iconMap = {
  dashboard: HiMiniComputerDesktop,
  discount: FaDollarSign,
  company: FaRegBuilding ,
  help: FaQuestionCircle,
  price:FaDollarSign,
  item:FaSitemap ,
  fuel:FaRegCreditCard ,
  transaction:GrTransaction,
    invoices:LiaFileInvoiceSolid,
report:FaFlag,
location:FaLocationDot,
setting:FaCogs,
tcheck:FaRegCheckSquare,
supply:FaUserSecret,
moneyCode:FaQrcode


};

const SidebarIcon = ({ icon, className = "sidebar-icon" }) => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default SidebarIcon;
