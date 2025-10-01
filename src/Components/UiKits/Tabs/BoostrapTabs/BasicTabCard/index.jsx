import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import HeaderCard from '../../../../Common/Component/HeaderCard';
import { useNavigate } from 'react-router';

const BasicTabCard = ({tabContent,title}) => {
  const [BasicTab, setBasicTab] = useState('1');
  const navigate = useNavigate();
  const handleTabClick = (tabId) => {
    setBasicTab(tabId);
    navigate(`?tab=${tabId}`);   // Update URL without refreshing
  };
  return (
    <Col>
      <Nav className='mb-3' tabs>
        {tabContent?.map((tab) => (
          <NavItem key={tab.id}>
            <NavLink
              href="#javascript"
              className={BasicTab === tab.id ? 'active' : ''}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {/* <Card className='shadow-lg'>
        <CardBody> */}
          <HeaderCard title={title} />
            <TabContent activeTab={BasicTab}>
            {tabContent.map((tab) => (
              <TabPane className='mt-3 ' key={tab.id} tabId={tab.id}>
                {tab.component}
              </TabPane>
            ))}
          </TabContent>
        {/* </CardBody>
      </Card> */}


    </Col>
  );
};

export default BasicTabCard;
