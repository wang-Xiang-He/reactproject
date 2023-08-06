import React, { useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  Breadcrumb,
  Button,
  Row,
  Col,
  Card,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
} from "@fortawesome/free-solid-svg-icons";


import "react-dual-listbox/lib/react-dual-listbox.css";

const Duallist = () => {
  const [selected, setSelected] = useState([{ value: "one" }]);
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    // Other options...
  ];

  const handleChange = (selected) => {
    setSelected(selected);
  };

  // Handle button click event: log selected items to console
  const handleLogSelectedItems = () => {
    console.log("所選項目:", selected);
  };

  return (
    <>
     <div className="mb-4 mb-lg-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Reports</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Reports</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>

        </div>
    <Row className="justify-content-md-center">
    <Card>

    <Card.Body>
      <DualListBox
        canFilter
        options={options}
        selected={selected}
        onChange={handleChange}
        preserveSelectOrder
        showOrderButtons
      />
      </Card.Body>
      <Row className="mt-3 align-items-center">
        <Button variant="primary" onClick={handleLogSelectedItems}>輸出所選項目</Button>
      </Row>
    </Card>
    </Row>

    </>
  );
};

export default Duallist;
