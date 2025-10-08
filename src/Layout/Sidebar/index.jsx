import React, { Fragment, useState, useEffect, useContext } from "react";
import CustomizerContext from "../../_helper/Customizer";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import axios from "axios";
import { MenuApi } from "../../api";

const Sidebar = (props) => {
  const { addSidebarLayouts, toggleIcon } = useContext(CustomizerContext);
  const [mainmenu, setMainMenu] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  // ✅ Handle window resize to switch layouts dynamically
  const handleResize = () => {
    const currentWidth = window.innerWidth;
    setWidth(currentWidth);
    if (currentWidth > 991) {
      addSidebarLayouts("horizontal-wrapper");
    } else {
      addSidebarLayouts("compact-wrapper");
    }
  };



  // ✅ Fetch Menu API
  const MenuData = async () => {
    try {
      const resp = await axios.get(MenuApi);
      setMainMenu(resp.data);
    } catch (error) {
      console.log("Menu fetch cancelled", error);
    }
  };

  // ✅ useEffect to setup listeners and fetch data
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    MenuData();

    document.querySelector(".left-arrow")?.classList.add("d-none");

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Set active menu item based on URL
  useEffect(() => {
    const currentUrl = window.location.pathname;
    mainmenu.forEach((items) => {
      items.Items.forEach((item) => {
        if (item.path === currentUrl) return setNavActive(item);
        if (item.children) {
          item.children.forEach((subItem) => {
            if (subItem.path === currentUrl) return setNavActive(subItem);
            if (subItem.children) {
              subItem.children.forEach((subSubItem) => {
                if (subSubItem.path === currentUrl) return setNavActive(subSubItem);
              });
            }
          });
        }
      });
    });
  }, [mainmenu]);

  // ✅ Handle active classes
  const activeClass = () => {
    document.querySelector(".bg-overlay1")?.classList.add("active");
  };

  const setNavActive = (item) => {
    mainmenu.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
          document.querySelector(".bg-overlay1")?.classList.remove("active");
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
          document.querySelector(".sidebar-links")?.classList.add("active");
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            }
            return false;
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
  };

  const closeOverlay = () => {
    document.querySelector(".bg-overlay1")?.classList.remove("active");
    document.querySelector(".sidebar-links")?.classList.remove("active");
  };

  return (
    <Fragment>
      <div className="bg-overlay1" onClick={closeOverlay}></div>
      <div
        className={`sidebar-wrapper ${toggleIcon ? "close_icon" : ""}`}
        sidebar-layout="stroke-svg"
      >
        <SidebarLogo />
        <SidebarMenu
          setMainMenu={setMainMenu}
          mainmenu={mainmenu}
          props={props}
          setNavActive={setNavActive}
          activeClass={activeClass}
          width={width}
        />
      </div>
    </Fragment>
  );
};

export default Sidebar;
