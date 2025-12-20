import { H5 } from "../../../AbstractElements";
import React, { Fragment } from "react";
import { CardHeader } from "reactstrap";

const HeaderCard = ({
  title,
  span1,
  span2,
  mainClasses,
  download,
  downloadHeading,
}) => {
  return (
    <Fragment>
      <CardHeader
        className={`d-flex justify-content-between align-items-center ${
          mainClasses ? mainClasses : ""
        }`}
      >
        {/* LEFT SIDE */}
        <div>
          <H5 className="mb-0">{title}</H5>
          {span1 && <span>{span1}</span>}
          {span2 && <span>{span2}</span>}
        </div>

        {/* RIGHT SIDE */}
        {download && (
          <button
            className="btn text-white"
            style={{
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
            }}
          >
            <i className="fa fa-download me-1"></i>
            {downloadHeading}
          </button>
        )}
      </CardHeader>
    </Fragment>
  );
};

export default HeaderCard;
