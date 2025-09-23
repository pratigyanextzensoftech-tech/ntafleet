import React, { Fragment } from "react";
import { CardFooter } from 'reactstrap'
import { Btn } from "../../../../AbstractElements";
import {add_user } from "../../../../Constant";

const FooterCard = () => {
    return (
        <Fragment>
            <CardFooter className="text-end">
                <Btn attrBtn={{ color: "primary", className: "m-r-15", type: "submit" }} >{add_user}</Btn>
            </CardFooter>
        </Fragment>
    )
}

export default FooterCard;