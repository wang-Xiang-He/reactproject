import React, { useState, useEffect } from "react";
import { Pagination, Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
// import users from '../data/users';

const Users = () => {
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

        const usersToDisplay = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePaginationChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <>
            <div className="mb-4 mb-lg-0">
                <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                    <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Users List</Breadcrumb.Item>
                </Breadcrumb>
                <h4>Users List</h4>
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
                        <Form.Select onChange={handleUsersPerPageChange} value={usersPerPage} className="w-25">
                            {pageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col xs={3} lg={8} className="text-end">
                        <Dropdown as={ButtonGroup} className="me-2">
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    {/* <FontAwesomeIcon icon={faSlidersH} /> */}
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    {/* <FontAwesomeIcon icon={faCog} /> */}
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col xl={12}>
                    <Card border="light">
                        <Card.Body>
                            <Table hover className="user-table align-items-center">
                                <thead>
                                    <tr>
                                        <th className="border-bottom">Index</th>
                                        <th className="border-bottom">Name</th>
                                        <th className="border-bottom">Email</th>
                                        <th className="border-bottom">Position</th>
                                        <th className="border-bottom">User Created at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getCurrentUsers().map((u) => (
                                        <tr key={u.id}>
                                            <td>{u.index}</td>
                                            <td>
                                                <Card.Link className="d-flex align-items-center">
                                                    <Image src={u.image} className="user-avatar rounded-circle me-3" />
                                                    <div className="d-block">
                                                        <span className="fw-bold">{u.name}</span>
                                                    </div>
                                                </Card.Link>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    <div className="small text-gray">{u.email}</div>
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">
                                                    <div className="small text-gray">{u.POSITION}</div>
                                                </span>
                                            </td>
                                            <td>
                                                <span className="fw-normal">{u.CREATED_AT}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            <Pagination size="md" className="mt-3">
                                {paginationItems}
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Users;
