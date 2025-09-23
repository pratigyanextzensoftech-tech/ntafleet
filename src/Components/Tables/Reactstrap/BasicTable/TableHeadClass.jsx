import React, { Fragment, useState } from 'react';
import { Col, Card, CardHeader, Table } from 'reactstrap';
import { FirstName, Id, LastName, TableHeadOptions, TableHeadspan, thead, theadlight, theadtext, tomake, Username } from '../../../../Constant';
import { H3 } from '../../../../AbstractElements';
import { Captiontabledata } from '../../../../Data/Table/bootstraptabledata';
import { IoIosSettings } from "react-icons/io";
import style from './TableHeadClass.module.css'
const TableHeadClass = ({tableHeading,heading,icon}) => {
    const [data, setData] = useState(Captiontabledata);

  const handleChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };
    return (
        <Fragment>
            <Col >
                <Card>
                    <CardHeader>
                        <h3 className={style.heading}>{heading}</h3>
                        <span>{TableHeadspan} <code>{'.bg-*'}</code>{'and'}  <code>{theadlight}</code> {tomake} <code>{thead}</code> {theadtext}</span>
                    </CardHeader>
                    <div className="card-block row">
                        <Col sm="12">
                            <div className="table-responsive">
                                <Table>
                                    <thead className={`table-dark ${style.tableHeading}`}>
                                        <tr>
                                            {tableHeading.map((item)=>(
                                            <th scope="col">{item}</th>

                                            ))}
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input  className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                             <th>
                                                <input className='form-control' type="search"/>
                                            </th>
                                        </tr>
                                        {
                                            Captiontabledata.slice(0, 3).map((item) =>
                                                <tr key={item.id}>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>

                                                    <td>{item.phone}</td>
                                                    <td>{item.company}</td>
                                                    <td>{item.added_by}</td>
 <td>
          <select className="form-control">
            <option value="yes" selected={item.company_login === "yes"}>
              Yes
            </option>
            <option value="no" selected={item.company_login === "no"}>
              No
            </option>
          </select>
        </td>
 <td>
              <select
                className="form-control"
                value={item.status}
                onChange={(e) =>
                  handleChange(item.id, "status", e.target.value)
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </td>
                                                    <td>
                                                        <div className=' d-flex  align-items-center gap-3 '>
                                                            <span className={style.settingIcon}>{icon} </span>
                                                            <button className="btn btn-primary">
                                                       Action
                                                        </button>
                                                            </div></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </div>
                </Card>
            </Col>
        </Fragment>
    );
};

export default TableHeadClass;