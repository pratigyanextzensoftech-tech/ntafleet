import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SvgIcon from "../../Components/Common/Component/SvgIcon";
import CustomizerContext from "../../_helper/Customizer";
import SidebarIcon from "../../Components/Common/Component/SideBarIcon";
const SidebarMenuItems = ({ setMainMenu, mainmenu, sidebartoogle, setNavActive, activeClass }) => {
  // const { layout } = useContext(CustomizerContext);
  // const layout1 = localStorage.getItem("sidebar_layout") || layout;

  const id = window.location.pathname.split("/").pop();
  const layoutId = id;
  const { t } = useTranslation();

  const toggletNavActive = (clickedItem) => {
    const newMenu = mainmenu?.map((menuGroup) => ({
      ...menuGroup,
      Items: menuGroup.Items.map((menuItem) => ({
        ...menuItem,
        active:
          menuItem === clickedItem
            ? !menuItem.active
            : menuItem.children?.some(
                (child) =>
                  child === clickedItem ||
                  child.children?.some((grandChild) => grandChild === clickedItem)
              ) || false,
        children: menuItem.children
          ? menuItem.children.map((childItem) => ({
              ...childItem,
              active:
                childItem === clickedItem
                  ? !childItem.active
                  : childItem.children?.some(
                      (grandChild) => grandChild === clickedItem
                    ) || false,
              children: childItem.children
                ? childItem.children.map((grandChild) => ({
                    ...grandChild,
                    active:
                      grandChild === clickedItem
                        ? !grandChild.active
                        : grandChild.active || false,
                  }))
                : childItem.children,
            }))
          : menuItem.children,
      })),
    }));

    setMainMenu(newMenu);
  };

  return (
    <>
      {mainmenu.map((Item, i) => (
        <Fragment key={i}>
          <li className="sidebar-main-title">
            <div>
              <h6 className="lan-1">{t(Item.menutitle)}</h6>
            </div>
          </li>
          {Item.Items.map((menuItem, i) => (
            <li className="sidebar-list" key={i}>
              {menuItem.type === "sub" && (
                <a
                  href="javascript"
                  className={`sidebar-link sidebar-title ${menuItem.active ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggletNavActive(menuItem);
                  }}
                >
                     {/* <i className={menuItem.icon}></i> */}
                          <SidebarIcon  icon={menuItem.icon} />
                  {/* <SvgIcon className="stroke-icon" iconId={`stroke-${menuItem.icon}`} />
                  <SvgIcon className="fill-icon" iconId={`fill-${menuItem.icon}`} /> */}
                  <span>{t(menuItem.title)}</span>
                  {menuItem.badge && <label className={menuItem.badge}>{menuItem.badgetxt}</label>}
                  <div className="according-menu">
                    {menuItem.active ? <i className="fa fa-angle-down"></i> : <i className="fa fa-angle-right"></i>}
                  </div>
                </a>
              )}

              {menuItem.type === "link" && (
                <Link
                  to={`${menuItem.path}/${layoutId}`}
                  className="sidebar-link sidebar-title link-nav"
                  onClick={() => toggletNavActive(menuItem)}
                >
                                       {/* <i className={menuItem.icon}></i> */}
                  {/* <SvgIcon className="stroke-icon" iconId={`stroke-${menuItem.icon}`} />
                  <SvgIcon className="fill-icon" iconId={`fill-${menuItem.icon}`} /> */}
                  <span>{t(menuItem.title)}</span>
                  {menuItem.badge && <label className={menuItem.badge}>{menuItem.badgetxt}</label>}
                </Link>
              )}

              {menuItem.children && (
                <ul className={`sidebar-submenu ${menuItem.active ? "show" : ""}`}>
                  {menuItem.children.map((childrenItem, index) => (
                    <li key={index}>
                      {childrenItem.type === "sub" && (
                        <a
                          href="javascript"
                          className={`sidebar-link ${childrenItem.active ? "active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggletNavActive(childrenItem);
                          }}
                        >
                          {t(childrenItem.title)}
                          <span className="sub-arrow">
                            <i className="fa fa-chevron-right"></i>
                          </span>
                          <div className="according-menu">
                          {childrenItem.active 
  ? <i className="fas fa-angle-down"></i> 
  : <i className="fas fa-angle-right"></i>
}

                          </div>
                        </a>
                      )}

                      {childrenItem.type === "link" && (
                        <Link
                          to={`${childrenItem.path}/${layoutId}`}
                          className={`sidebar-link ${childrenItem.active ? "active" : ""}`}
                          onClick={() => toggletNavActive(childrenItem)}
                        >
                          {t(childrenItem.title)}
                        </Link>
                      )}

                      {childrenItem.children && (
                        <ul className={`nav-sub-childmenu submenu-content ${childrenItem.active ? "show" : ""}`}>
                          {childrenItem.children.map((childrenSubItem, key) => (
                            <li key={key}>
                              {childrenSubItem.type === "link" && (
                                <Link
                                  to={`${childrenSubItem.path}/${layoutId}`}
                                  className={`sidebar-link ${childrenSubItem.active ? "active" : ""}`}
                                  onClick={() => toggletNavActive(childrenSubItem)}
                                >
                                  {t(childrenSubItem.title)}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default SidebarMenuItems;
