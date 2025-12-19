import { H5 } from '../../../AbstractElements';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CardHeader } from 'reactstrap';
const HeaderCard = ({ title, span1, span2, mainClasses,download }) => {
  return (
    <Fragment>
      <CardHeader className={`${mainClasses ? mainClasses : ''}`}>
        <H5>{title}</H5>
        {span1 ? <span>{span1}</span> : ''}
        {span2 ? <span>{span2}</span> : ''}
        {span2 ? <span>{download}</span> : ''}
        
      </CardHeader>
    </Fragment>
  );
};

export default HeaderCard;
