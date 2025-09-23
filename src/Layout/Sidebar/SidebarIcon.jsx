import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import textLogo from "../../assets/images/logo/textLogo.webp"
import CustomizerContext from '../../_helper/Customizer';

const SidebarIcon = () => {
  const { layoutURL } = useContext(CustomizerContext);
  return (
    <div className="logo-icon-wrapper">
      <Link  to={`${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`}>
        <img
          className="img-fluid"
          src={textLogo}
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default SidebarIcon;