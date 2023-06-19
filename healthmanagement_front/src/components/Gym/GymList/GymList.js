/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const cardContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2% 2.5%;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px #dbdbdb;
    width: 45%;
    height: 350px;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
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
    width: 70%;
    font-weight: 600;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const main = css`
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

const GymList = ({ gym }) => {
    const navigate = useNavigate();
    const [gymMainImgUrl, setGymMainImgUrl] = useState();

    const clickHandle = () => {
        navigate("/gym/" + gym.gymId);
    };

    const getImgs = useQuery(["getImgs", gym.gymId], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get(`http://localhost:8080/gyms/${gym.gymId}/images`, option);

        setGymMainImgUrl("http://localhost:8080/image/post/" + response.data[0].tempName);

        return response;
    });

    if (!getImgs.isLoading)
        return (
            <>
                <div css={cardContainer} onClick={clickHandle}>
                    <header css={header}>
                        <h1 css={titleText}>{gym.gymName}</h1>
                    </header>
                    <main css={main}>
                        <div css={imgBox}>
                            <img css={img} src={gymMainImgUrl} />
                        </div>
                    </main>
                    <footer css={footer}>
                        <h2 css={infoDetail}>위치: {gym.gymAddress} </h2>
                        <h2 css={infoDetail}>가격: (월) {gym.gymPrice}&#8361;</h2>
                        <div css={like}>추천: {gym.likeCount}</div>
                    </footer>
                </div>
            </>
        );
};

export default GymList;
