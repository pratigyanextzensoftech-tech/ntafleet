import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
import { FaCog } from 'react-icons/fa';

export const LoginDropdown = ({ current }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prev => !prev);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="secondary">
                {current}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Yes</DropdownItem>
                <DropdownItem>No</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export const StatusDropdown = ({ current }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prev => !prev);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret color="secondary">
                {current}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Active</DropdownItem>
                <DropdownItem>Inactive</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export const ActionDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prev => !prev);

    return (
       <div className="d-flex align-items-center">
            {/* Settings Icon Button */}
            <Button color="primary" className="me-2 py-1 px-2" size="sm">
                <FaCog />
            </Button>

            {/* Action Dropdown */}
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="info" size="sm">
                    Actions
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                    <DropdownItem>View</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};
