/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Footer from "../../components/Main/Footer/Footer";
import Header from "../../components/Main/Header/Header";
import { useNavigate } from "react-router-dom";
import GymMainImg from "../../components/GymImgs/GymMainImg";
import { TiTrash } from "react-icons/ti";
import { BiPen } from "react-icons/bi";

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
    overflow-y: auto;
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
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
`;

const removeModifyButton = css`
    background-color: white;
    font-size: 15px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
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

const AddGymList = () => {
    const navigate = useNavigate();

    const principal = useQuery(["principal"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get("http://localhost:8080/account/principal", option);
        return response;
    });

    const addGyms = useQuery(
        ["addGyms"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };

            return await axios.get(`http://localhost:8080/account/users/${principal.data.data.userId}/gyms`, option);
        },
        {
            enabled: !!principal.data,
        }
    );

    const removeModifyOnClickHandle = () => {
        alert("업체에 문의하세요.");
    };

    if (!addGyms.isLoading && !principal.isLoading)
        return (
            <div css={container}>
                <Header search={false}></Header>
                <div css={main}>
                    <div css={gymListDetail}>
                        <div css={likeTitle}>나의 헬스장 목록</div>
                        {addGyms.data.data.map((addGym) => {
                            return (
                                <>
                                    <div css={cardContainer}>
                                        <header css={header}>
                                            <h1 css={titleText}>
                                                {addGym.gymName}
                                                <button css={removeModifyButton} onClick={removeModifyOnClickHandle}>
                                                    <BiPen />
                                                </button>
                                                <button css={removeModifyButton} onClick={removeModifyOnClickHandle}>
                                                    <TiTrash />
                                                </button>
                                            </h1>
                                        </header>
                                        <main
                                            css={cardMain}
                                            onClick={() => {
                                                navigate("/gym/" + addGym.gymId);
                                            }}
                                        >
                                            <GymMainImg gymId={addGym.gymId} />
                                        </main>
                                        <footer css={footer}>
                                            <h2 css={infoDetail}>위치: {addGym.gymAddress} </h2>
                                            <h2 css={infoDetail}>가격: (월) {addGym.gymPrice}&#8361;</h2>
                                            <h2 css={infoDetail}> ☎ {addGym.gymTel}</h2>
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

export default AddGymList;
