import { H5 } from "../../../AbstractElements";
import React, { Fragment } from "react";
import { CardHeader } from "reactstrap";

const HeaderCard = ({
  title,
  span1,
  span2,
  onClick,
  mainClasses,
  download,
  file,
  fileHeading,
  downloadHeading,
  ShowdwonloadCsv,
  downloadCsv,
  loadData,
  ShowloadData,
  renderDropdown
}) => {
  return (
    <Fragment>
   <CardHeader className={`d-flex align-items-center ${mainClasses || ""}`}>
  
  {/* LEFT SIDE */}
  <div>
    <H5 className="mb-0">{title}</H5>
    {span1 && <span>{span1}</span>}
    {span2 && <span>{span2}</span>}
  </div>

  {/* RIGHT SIDE */}
  <div className="ms-auto d-flex gap-2">
    {downloadHeading && (
      <button className="btn text-white" onClick={onClick}>
        <i className="fa fa-download me-1"></i>
        {downloadHeading}
      </button>
    )}
    {renderDropdown && renderDropdown()}

    {file && (
      <button className="btn text-white" onClick={onClick}>
        <i className="fa fa-file-excel-o me-1"></i>
        {fileHeading}
      </button>
    )}

    {ShowdwonloadCsv && (
      <button className="btn text-white bg-secondary" onClick={onClick}>
        <i className="fa fa-file-excel-o me-1"></i>
        {downloadCsv}
      </button>
    )}

    {ShowloadData && (
      <button className="btn text-white bg-primary" onClick={onClick}>
        <i className="fa fa-refresh me-1"></i>
        {loadData}
      </button>
    )}
  </div>

</CardHeader>

    </Fragment>
  );
};

export default HeaderCard;
