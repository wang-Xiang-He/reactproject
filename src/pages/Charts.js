import React, { useState, useEffect } from "react";
import {
  Pagination,
  Breadcrumb,
  Button,
  ButtonGroup,
  Row,
  Col,
  InputGroup,
  Form,
  Image,
  Dropdown,
  Card,
  Table,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faCog,
  faCheck,
  faSearch,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import ApexChart from "react-apexcharts"; // 引入 ApexChart

// import users from '../data/users';

const Charts = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); // 預設每頁顯示 5 筆使用者
  const [searchKeyword, setSearchKeyword] = useState(""); // 搜尋關鍵字

  useEffect(() => {
    fetch("http://localhost:3001/people")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUsersData(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 計算總頁數
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  // 取得所有使用者資料再進行搜尋
  const getCurrentUsers = () => {
    let filteredUsers = usersData;

    if (searchKeyword) {
      filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const usersToDisplay = filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

    // 加入索引
    const usersWithIndexes = usersToDisplay.map((user, index) => ({
      ...user,
      index: indexOfFirstUser + index + 1,
    }));

    return usersWithIndexes;
  };

  // 分頁切換
  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 每頁顯示數量的選項
  const pageOptions = [3, 5, 8, 10];

  const handleUsersPerPageChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setUsersPerPage(selectedValue);
    setCurrentPage(1); // 重置當前頁碼為 1
  };

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1); // 重置當前頁碼為 1
  };

  // 兩條線的數據
  const seriesLineChart = [
    {
      name: "Clients",
      data: [120, 160, 200, 470, 420, 150, 470, 750, 650, 190, 140],
      // color: '#FF5733' // 指定 Clients 線的顏色
    },
    {
      name: "Sales",
      data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550],
      // color: '#3366FF' // 指定 Sales 線的顏色
    },
  ];

  // 線性圖表的選項
  const optionsLineChart = {
    labels: [
      "01 Sept",
      "02 Sept",
      "03 Sept",
      "04 Sept",
      "05 Sept",
      "06 Sept",
      "07 Sept",
      "08 Sept",
      "09 Sept",
      "10 Sept",
      "11 Sept",
    ],
    theme: {
      mode: "light", // 使用亮色主題
    },
    markers: {
      size: 6, // 設置圖示的大小
      strokeWidth: 2, // 設置圖示的邊框寬度
      // strokeColors: ["transparent"], // 設置圖示的邊框顏色
      hover: {
        size: 8, // 設置圖示的大小（懸停時）
      },
    },
  };

  const seriesAreaChart = [
    {
      name: "Series A",
      data: [30, 40, 25, 50, 49, 60, 70, 91, 125],
    },
  ];

  // 區域圖的選項
  const optionsAreaChart = {
    chart: {
      type: "area",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  // 新增的資訊
  const additionalInfoData = [
    {
      title: "即時發電功率(kW)",
      value: "77.35",
    },
    {
      title: "日瓩發電量(kWh/kWp)",
      value: "3.583",
    },
    {
      title: "今日總發電量(MWh)",
      value: "1.39",
    },
    {
      title: "本月總發電量(MWh)",
      value: "3.47",
    },
    {
      title: "本月降低碳排 公斤 Co2",
      value: "1,769.89",
    },
    {
      title: "本月減少伐木 株 樹木",
      value: "268.16",
    },
    {
      title: "本月等同造林 公頃 面積",
      value: "0.17",
    },
    {
      title: "本月可使用 24小時 30W燈泡",
      value: "4,829.44",
    },
  ];

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
          <Breadcrumb.Item active>Users List</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Charts</h4>
        <p className="mb-0">Your web analytics dashboard template.</p>

        <Row className="justify-content-between align-items-center">
          <Col xs={9} lg={5} className="d-flex">
            <InputGroup className="me-2 me-lg-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchKeyword}
                onChange={handleSearchInputChange}
              />
            </InputGroup>
            <Form.Select
              onChange={handleUsersPerPageChange}
              value={usersPerPage}
              className="w-25"
            >
              {pageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={3} lg={8} className="text-end">
            <Dropdown as={ButtonGroup} className="me-2">
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  {/* <FontAwesomeIcon icon={faSlidersH} /> */}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  {/* <FontAwesomeIcon icon={faCog} /> */}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10{" "}
                  <span className="icon icon-small ms-auto">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      {/* 新增圖表元件 */}
      <Row className="justify-content-md-center">
        <Col xs={12} md={12}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Your Line Chart</h5>
              <ApexChart
                type="area"
                height={360}
                series={seriesAreaChart}
                options={optionsAreaChart}
              />
              <Row className="mt-4">
                {additionalInfoData.slice(0, 4).map((info) => (
                  <Col xs={6} md={3} key={info.title} border="1px solid #dee2e6">
                    <p className="mb-2">{info.title}</p>
                    <p>{info.value}</p>
                  </Col>
                ))}
              </Row>
              <Row className="mt-4">
                {additionalInfoData.slice(4).map((info) => (
                  <Col xs={6} md={3} key={info.title} border="1px solid #dee2e6">
                    <p className="mb-2">{info.title}</p>
                    <p>{info.value}</p>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs={12} md={12}>
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Your Line Chart</h5>
              <ApexChart
                type="line"
                height={360}
                series={seriesLineChart}
                options={optionsLineChart}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Charts;
