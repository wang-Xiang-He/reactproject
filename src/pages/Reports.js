import React, { useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import {
  Modal, 
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
  const [selected, setSelected] = useState([]);
  const options = [
    { label: "北區案場", value: "北區案場" },
    { label: "中區案場", value: "中區案場" },
    { label: "南區案場", value: "南區案場" },
    // Other options...
  ];

  const handleChange = (selected) => {
    setSelected(selected);
  };

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleLogSelectedItems = () => {
    if (selected.length === 0) {
      setErrorText("請選擇至少一個選項");
      setErrorModalVisible(true);
      return;
    }
    console.log("所選項目:", selected);
  
    const requestData = { selected_values: selected };
  
    fetch("https://fastapi-server-phjl.onrender.com/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        if (response.ok) {
          console.log("已成功發送選項到服務器");
          console.log(response);
          return response.blob(); // 將響應體作為 Blob 對象返回
        } else {
          console.error("服務器響應異常:", response.statusText);
          setErrorText("服務器響應異常: " + response.statusText);
          setErrorModalVisible(true);
        }
      })
      .then(blob => {
        // 創建一個鏈接並設置文件名，觸發下載
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error("發送選項時出現錯誤:", error);
        setErrorText("發送選項時出現錯誤: " + error);
        setErrorModalVisible(true);
      });
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
          <p className="mb-0">Your web analytics reports.</p>

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
        <Button variant="primary" onClick={handleLogSelectedItems}>下載</Button>
      </Row>
    </Card>
    </Row>
    <Modal
        as={Modal.Dialog}
        centered
        show={errorModalVisible}
        onHide={() => setErrorModalVisible(false)}
      >
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setErrorModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Duallist;
