import React, { useContext } from "react";
import { Grid } from "react-feather";
import { Link } from "react-router-dom";
import CustomizerContext from "../../_helper/Customizer";
import { Image } from "../../AbstractElements";
import NtaIcon from "../../assets/images/logo/textLogo.webp";

const SidebarLogo = () => {
  const { mixLayout, toggleSidebar, toggleIcon, layout, layoutURL } = useContext(CustomizerContext);

  const openCloseSidebar = () => {
    toggleSidebar(!toggleIcon);
  };

  const layout1 = localStorage.getItem("sidebar_layout") || layout;

  return (
    <div className='logo-wrapper'>
      {layout1 !== "compact-wrapper dark-sidebar" && layout1 !== "compact-wrapper color-sidebar" && mixLayout ? (
        <Link className='w-100 h-100' to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
          <Image attrImage={{ className: "img-fluid d-inline", src: `${NtaIcon}`, alt: "", width:"200px" }} />
        </Link>
      ) : (
        <Link  to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
          <Image attrImage={{ className: "img-fluid d-inline", src: `${require("../../assets/images/logo/textLogo.webp")}`, alt: "", width:"200px" }} />
        </Link>
      )}
      <div className='back-btn' onClick={() => openCloseSidebar()}>
        <i className='fa fa-angle-left'></i>
      </div>
      <div className='toggle-sidebar' onClick={openCloseSidebar}>
        <Grid className='status_toggle middle sidebar-toggle' />
      </div>
    </div>
  );
};

export default SidebarLogo;
