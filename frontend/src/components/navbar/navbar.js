import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Tantrum Sunless Tanning Scheduler</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink href="/managerView">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/employee">Employees</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/location">Locations</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/calendar">Calendar</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/requests">Requested Days Off</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;