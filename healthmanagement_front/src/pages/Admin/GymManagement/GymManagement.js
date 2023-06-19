/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff;
`;

const header = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: #444444;
`;

const title = css`
    margin-left: 10px;
    width: 100%;
    max-width: 150px;
    object-fit: contain;
`;

const subTitle = css`
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #919493;
`;

const main = css`
    display: flex;
    width: 100%;
    height: calc(100% - 10%);
`;

const sidebar = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    height: 100%;
    background-color: #f5f5f5;
`;

const welcomeMessage = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #91949350;
    width: 80%;
    height: 100%;
    max-height: 90px;
    font-size: 22px;
    font-weight: 600;
`;

const sidebarSection = css`
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 20px;
    border-bottom: 2px solid #91949350;
    width: 80%;
    height: 100%;
    max-height: 170px;
`;

const sectionTitle = css`
    height: calc(100% / 3);
    font-size: 20px;
    font-weight: 600;
`;

const sectionMenuOn = css`
    height: calc(100% / 4);
    font-size: 18px;
    color: #eda058;
    font-weight: 600;
    cursor: pointer;
`;

const sectionMenuOff = css`
    height: calc(100% / 4);
    font-size: 18px;
    cursor: pointer;
`;

const content = css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;

const contentTitle = css`
    height: 35px;
    font-size: 35px;
    font-weight: 600;
    color: #eda058;
`;

const currentSituationBox = css`
    display: flex;
    flex-direction: column;
`;

const boxTitle = css`
    font-size: 20px;
    padding: 10px;
    height: 20px;
`;

const listBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-left: 60px;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    max-height: 600px;
`;

const thead = css`
    height: 50px;
    font-size: 20px;
    font-weight: 600;
`;

const tr = css`
    height: 50px;
    font-size: 16px;
`;

const thAndTd = css`
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
`;

const thAndTdNo = css`
    ${thAndTd}
    width: 40px;
`;

const thAndTdGymNameAndPhone = css`
    ${thAndTd}
    width: 200px;
`;

const thAndTdAddress = css`
    ${thAndTd}
    width: 300px;
`;

const thAndTdBusinessNumber = css`
    ${thAndTd}
    width: 160px;
`;

const thAndTdRegisteDateAndUsername = css`
    ${thAndTd}
    width: 150px;
`;

const pagination = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const GymManagement = () => {
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isChange, setIsChange] = useState(false);
    const [gyms, setGyms] = useState([]);

    const pageChangeHandle = (e, value) => {
        setCurrentPage(value);
        setGyms([]);
        setIsChange(true);
    };

    const getTotalGymPage = useQuery(["getTotalGymPage"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        try {
            const response = await axios.get("http://localhost:8080/admin/gyms/page", option);
            setTotalPage(response.data);
        } catch (error) {
            console.log(error);
        }
    });

    const getGyms = useQuery(
        ["getGyms"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                    page: currentPage,
                },
            };
            try {
                const response = await axios.get("http://localhost:8080/admin/gyms", option);
                console.log(response);
                setGyms((prevState) => [...prevState, ...response.data]);
            } catch (error) {
                console.log(error);
            }
        },
        {
            enabled: isChange,
            onSuccess: () => {
                setIsChange(false);
            },
        }
    );

    useEffect(() => {
        setGyms([]);
        getGyms.refetch();
    }, []);

    if (!getTotalGymPage.isLoading && !getGyms.isLoading)
        return (
            <div css={container}>
                <header css={header}>
                    <img css={title} src="/images/logo.png" alt="로고" />
                    <h1 css={subTitle}>Administration</h1>
                </header>
                <main css={main}>
                    <aside css={sidebar}>
                        <h2 css={welcomeMessage}>환영합니다. 관리자!</h2>
                        <div css={sidebarSection}>
                            <h2 css={sectionTitle}>현황</h2>
                            <div css={sectionMenuOff}>대시보드</div>
                        </div>
                        <div css={sidebarSection}>
                            <h2 css={sectionTitle}>회원 관리</h2>
                            <div css={sectionMenuOff}>유저 관리</div>
                            <div css={sectionMenuOn}>헬스장 관리</div>
                        </div>
                    </aside>
                    <div css={content}>
                        <h1 css={contentTitle}>헬스장 관리</h1>
                        <div css={currentSituationBox}>
                            <h2 css={boxTitle}>등록된 헬스장</h2>
                            <div css={listBox}>
                                <table>
                                    <thead css={thead}>
                                        <tr>
                                            <th css={thAndTdNo}>no</th>
                                            <th css={thAndTdGymNameAndPhone}>헬스장 이름</th>
                                            <th css={thAndTdAddress}>주소</th>
                                            <th css={thAndTdGymNameAndPhone}>전화번호</th>
                                            <th css={thAndTdBusinessNumber}>사업자 번호</th>
                                            <th css={thAndTdRegisteDateAndUsername}>등록날짜</th>
                                            <th css={thAndTdRegisteDateAndUsername}>등록아이디</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gyms.map((gym, index) => {
                                            return (
                                                <tr key={index} css={tr}>
                                                    <td css={thAndTd}>{gym.gymId}</td>
                                                    <td css={thAndTd}>{gym.gymName}</td>
                                                    <td css={thAndTd}>{gym.gymAddress}</td>
                                                    <td css={thAndTd}>{gym.gymTel}</td>
                                                    <td css={thAndTd}>{gym.businessNumber}</td>
                                                    <td css={thAndTd}>{gym.registeDate}</td>
                                                    <td css={thAndTd}>{gym.username}</td>
                                                </tr>
                                            );
                                        })}
                                        {gyms.length < 10 &&
                                            Array.from({ length: 10 - gyms.length }, (_, i) => (
                                                <tr key={`empty-${i}`} css={tr}>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                <Pagination
                                    css={pagination}
                                    count={totalPage}
                                    showFirstButton
                                    showLastButton
                                    page={currentPage}
                                    onChange={pageChangeHandle}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
};

export default GymManagement;
