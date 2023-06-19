/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";
import GymMainImg from "../../components/GymImgs/GymMainImg";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const main = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    height: 90%;
    background-color: white;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const cardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1%;
    margin-bottom: 6%;
    margin-top: 4%;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px #dbdbdb;
    width: 75%;
    height: 100%;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
`;

const gymListDetail = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    height: 400px;
`;

const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4%;
    width: 100%;
    height: 5%;
`;

const titleText = css`
    font-weight: 600;
`;

const cardMain = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4%;
    width: 100%;
    height: 55%;
`;

const imgBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 5px #dbdbdb;
    padding: 5px;
    width: 90%;
    height: 100%;
    background-color: #fafafa;
    overflow: hidden;
`;
const img = css`
    width: 100%;
    height: 100%;
`;

const footer = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: 600;
    font-size: 14px;
    width: 90%;
    height: 30%;
    padding-bottom: 5%;
`;

const infoDetail = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const like = css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    padding: 5%;
    height: 30px;
    background-color: white;
    font-weight: 600;
    box-shadow: 0px 5px 5px #dbdbdb;
`;

const likeTitle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3d3d3d;
    color: white;
    width: 100%;
    height: 10%;
`;

const LikeList = () => {
    const [refresh, setRefresh] = useState(false);
    const { userId } = useParams();
    console.log(userId);
    const navigate = useNavigate();

    const likeGyms = useQuery(["likeGyms"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        return await axios.get(`http://localhost:8080/account/users/${userId}/favorites`, option);
    });
    console.log(likeGyms);
    if (likeGyms.isLoading) {
        return <div>로딩중...</div>;
    }

    return (
        <div css={container}>
            <Header search={false}></Header>
            <div css={main}>
                <div css={gymListDetail}>
                    <div css={likeTitle}>관심목록</div>
                    {likeGyms.data.data.map((likeGym) => {
                        return (
                            <>
                                <div
                                    css={cardContainer}
                                    onClick={() => {
                                        navigate("/gym/" + likeGym.gymId);
                                    }}
                                >
                                    <header css={header}>
                                        <h1 css={titleText}>{likeGym.gymName}</h1>
                                    </header>
                                    <main css={cardMain}>
                                        <GymMainImg gymId={likeGym.gymId} />
                                    </main>
                                    <footer css={footer}>
                                        <h2 css={infoDetail}>위치: {likeGym.gymAddress} </h2>
                                        <h2 css={infoDetail}>가격: (월) {likeGym.gymPrice}&#8361;</h2>
                                        <h2 css={infoDetail}> ☎ {likeGym.gymTel}</h2>
                                    </footer>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LikeList;
