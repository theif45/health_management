/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";
import GymImgs from "../../components/GymImgs/GymImgs";
const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;
const gymImg = css`
    width: 750px;
`;
const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: white;
    position: fixed;
`;

const main = css`
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

const detailName = css`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    height: 60px;
`;
const gymName = css`
    color: gray;
    font-size: 25px;
`;
const gymAddress = css`
    color: gray;
    font-size: 15p;
`;
const likeCount = css`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-color: white;
`;
const likeIcon = css`
    border: 1px solid white;
    background-color: white;
    font-size: 20px;
    cursor: pointer;
`;

const GymDetail = () => {
    const { gymId } = useParams();
    const queryClient = useQueryClient();
    const [gymMainImgUrl, setGymMainImgUrl] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getGym = useQuery(["getGym"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get(`http://localhost:8080/gyms/${gymId}`, option);
        return response;
    });

    const getImgs = useQuery(["getImgs"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get(`http://localhost:8080/gyms/${gymId}/images`, option);
        setGymMainImgUrl("http://localhost:8080/image/post/" + response.data[0].tempName);
        return response;
    });

    const getLikeCount = useQuery(["getLikeCount"], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        const response = await axios.get(`http://localhost:8080/gyms/${gymId}/likes`, option);
        return response;
    });

    const getLikeStatus = useQuery(["getLikeStatus"], async () => {
        const option = {
            params: {
                userId: queryClient.getQueryData("principal").data.userId,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get(`http://localhost:8080/gyms/${gymId}/favorites`, option);
        return response;
    });

    const setLike = useMutation(
        async () => {
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            return await axios.post(
                `http://localhost:8080/account/users/favorites/${gymId}`,
                JSON.stringify({
                    userId: queryClient.getQueryData("principal").data.userId,
                }),
                option
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getLikeCount");
                queryClient.invalidateQueries("getLikeStatus");
            },
        }
    );

    const disLike = useMutation(
        async () => {
            const option = {
                params: {
                    userId: queryClient.getQueryData("principal").data.userId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            return await axios.delete(`http://localhost:8080/account/users/favorites/${gymId}`, option);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getLikeCount");
                queryClient.invalidateQueries("getLikeStatus");
            },
        }
    );

    if (!getGym.isLoading)
        return (
            <div css={container}>
                <Header search={false} />
                <main css={main}>
                    <img src={gymMainImgUrl} onClick={handleOpenModal} css={gymImg} />
                    {isModalOpen === true ? (
                        <GymImgs getImgs={getImgs} isOpen={isModalOpen} onRequestClose={handleCloseModal} />
                    ) : (
                        ""
                    )}
                    <div css={detailName}>
                        <h1 css={gymName}>{getGym.data.data.gymName}</h1>
                        <h1 css={gymAddress}>{getGym.data.data.gymAddress}</h1>
                        <div css={likeCount}>
                            {getLikeStatus.isLoading ? (
                                ""
                            ) : getLikeStatus.data.data === 0 ? (
                                <button
                                    css={likeIcon}
                                    onClick={() => {
                                        setLike.mutate();
                                    }}
                                >
                                    ♡
                                </button>
                            ) : (
                                <button
                                    css={likeIcon}
                                    onClick={() => {
                                        disLike.mutate();
                                    }}
                                >
                                    ♥
                                </button>
                            )}
                            {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
};

export default GymDetail;
