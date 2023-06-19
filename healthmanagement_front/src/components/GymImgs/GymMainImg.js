/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const img = css`
    width: 100%;
    height: 100%;
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

const GymMainImg = (gymId) => {
    const [gymMainImgUrl, setGymMainImgUrl] = useState();

    const getImgs = useQuery(["getImgs", gymId], async () => {
        const option = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        const response = await axios.get(`http://localhost:8080/gyms/${gymId.gymId}/images`, option);
        console.log(response);

        setGymMainImgUrl("http://localhost:8080/image/post/" + response.data[0].tempName);
        console.log(response.data[0].tempName);
        return response;
    });

    return (
        <div css={imgBox}>
            <img css={img} src={gymMainImgUrl} />
        </div>
    );
};

export default GymMainImg;
