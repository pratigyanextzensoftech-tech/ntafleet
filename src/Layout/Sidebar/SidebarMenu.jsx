import React, { useContext, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'react-feather';
import CustomizerContext from '../../_helper/Customizer';
import SidebarMenuItems from './SidebarMenuItems';

const SidebarMenu = ({ setMainMenu, props, sidebartoogle, setNavActive, activeClass, width, mainmenu }) => {
  const { customizer } = useContext(CustomizerContext);
  const wrapper = customizer.settings.sidebar.type;
  const [margin, setMargin] = useState(0);
  const [showArrows, setShowArrows] = useState(true);

  useEffect(() => {
    // Hide arrows if width is larger than 1878
    if (width >= 1878) {
      setShowArrows(false);
    } else {
      setShowArrows(true);
    }
  }, [width]);

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
    } else {
      setMargin((margin) => margin - width);
    }
  };

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0);
    } else {
      setMargin((margin) => margin + width);
    }
  };

  return (
    <nav className="sidebar-main" id="sidebar-main">
      {showArrows && (
        <div className="left-arrow" onClick={scrollToLeft}>
          <ArrowLeft />
        </div>
      )}

      <div
        id="sidebar-menu"
        style={
          wrapper.split(' ').includes('horizontal-wrapper')
            ? { marginLeft: margin + 'px' }
            : { margin: '0px' }
        }
      >
        <ul className="sidebar-links custom-scrollbar">
          <li className="back-btn">
            <div className="mobile-back text-end">
              <span>{'Back'}</span>
              <i className="fa fa-angle-right ps-2" aria-hidden="true"></i>
            </div>
          </li>
          <SidebarMenuItems
            mainmenu={mainmenu}
            setMainMenu={setMainMenu}
            props={props}
            sidebartoogle={sidebartoogle}
            setNavActive={setNavActive}
            activeClass={activeClass}
          />
        </ul>
      </div>

      {showArrows && (
        <div className="right-arrow" onClick={scrollToRight}>
          <ArrowRight />
        </div>
      )}
    </nav>
  );
};

export default SidebarMenu;
