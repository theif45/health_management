/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import Chart from "../../../components/Chart/Chart";

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

const chart = css`
    display: flex;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    max-height: 350px;
`;

const Dashboard = () => {
    const [userData, setUserData] = useState([{ id: "", data: [] }]);
    const [gymData, setGymData] = useState([{ id: "", data: [] }]);

    const userRegisterNumber = useQuery(["userRegisterNumber"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get("http://localhost:8080/admin/users/count", option);
        setUserData((prevState) => [
            {
                id: "users",
                data: [...prevState[0].data, ...response.data],
            },
        ]);
    });

    const gymRegisterNumber = useQuery(["gymRegisterNumber"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get("http://localhost:8080/admin/gyms/count", option);
        setGymData((prevState) => [
            {
                id: "gyms",
                data: [...prevState[0].data, ...response.data],
            },
        ]);
    });

    if (!userRegisterNumber.isLoading && !gymRegisterNumber.isLoading)
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
                            <div css={sectionMenuOn}>대시보드</div>
                        </div>
                        <div css={sidebarSection}>
                            <h2 css={sectionTitle}>회원 관리</h2>
                            <div css={sectionMenuOff}>유저 관리</div>
                            <div css={sectionMenuOff}>헬스장 관리</div>
                        </div>
                    </aside>
                    <div css={content}>
                        <h1 css={contentTitle}>대시보드</h1>
                        <div css={currentSituationBox}>
                            <h2 css={boxTitle}>유저 현황</h2>
                            <div css={chart}>
                                <Chart data={userData} color="#eda058" />
                            </div>
                        </div>
                        <div css={currentSituationBox}>
                            <h2 css={boxTitle}>헬스장 현황</h2>
                            <div css={chart}>
                                <Chart data={gymData} color="#82ca9d" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
};

export default Dashboard;
