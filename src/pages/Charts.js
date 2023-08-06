import React, { useState, useEffect } from "react";
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
import ApexChart from "react-apexcharts"; // 引入 ApexChart

import "react-dual-listbox/lib/react-dual-listbox.css";

// import users from '../data/users';

const Charts = () => {


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
      title: "本月降低碳排Co2 (公斤)",
      value: "1,769.89",
    },
    {
      title: "本月減少伐木樹木 (株)",
      value: "268.16",
    },
    {
      title: "本月等同造林面積 (公頃)",
      value: "0.17",
    },
    {
      title: "本月可使用30W燈泡 (24小時 )",
      value: "4,829.44",
    },
  ];

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    // 其他選項...
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

        </div>
        {/* 新增圖表元件 */}
        <Row className="justify-content-md-center">
          <Col xs={12} md={12}>
            <Card border="light" className="shadow-sm mb-4 ">
              <Card.Header className="bg-secondary text-center">
                <h5 className="mb-0">Your Line Chart</h5>
              </Card.Header>
              <Card.Body>
                <ApexChart
                  type="area"
                  height={360}
                  series={seriesAreaChart}
                  options={optionsAreaChart}
                />

                <Row className="mt-4 align-items-center">
                  {additionalInfoData.slice(0, 4).map((info) => (
                    <Col
                      xs={6}
                      md={3}
                      key={info.title}
                      className="border  p-3 text-center"
                    >
                      <p className="mb-2 fw-bold">{info.title}</p>
                      <p>{info.value}</p>
                    </Col>
                  ))}
                </Row>
                <Row className=" align-items-center">
                  {additionalInfoData.slice(4).map((info) => (
                    <Col
                      xs={6}
                      md={3}
                      key={info.title}
                      className="border  p-3 text-center"
                    >
                      <p className="mb-2 fw-bold">{info.title}</p>
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
              <Card.Header className="bg-secondary text-center">
                <h5 className="mb-0">Your Line Chart</h5>
              </Card.Header>
              <Card.Body>
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
