import React, { useState, useEffect } from "react";
import { Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { useNavigate, useLocation } from "react-router";

const BasicTabCard = ({ tabContent, title }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Read ?tab= from URL (optional)
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || (tabContent?.[0]?.id ?? "1");

  const [BasicTab, setBasicTab] = useState(String(initialTab));

  const handleTabClick = (e, tabId) => {
    e.preventDefault(); // stop href jump
    setBasicTab(String(tabId)); // make sure it's a string
    navigate(`?tab=${tabId}`, { replace: true });
  };

  return (
    <Col>
      <Nav className="mb-3" tabs>
        {tabContent?.map((tab) => (
          <NavItem key={tab.id}>
            <NavLink
              href="#"
              className={BasicTab === String(tab.id) ? "active" : ""}
              onClick={(e) => handleTabClick(e, tab.id)}
            >
              {tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={BasicTab}>
        {tabContent.map((tab) => (
          <TabPane className="mt-3" key={tab.id} tabId={String(tab.id)}>
            {tab.component}
          </TabPane>
        ))}
      </TabContent>
    </Col>
  );
};

export default BasicTabCard;
