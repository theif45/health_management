/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import GymList from "../../components/Gym/GymList/GymList";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
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

const mainImgContainer = css`
    width: 100%;
    height: 50%;
    margin-bottom: 4%;
`;

const mainImg = css`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const mentCss = css`
    padding-left: 5%;
    padding-bottom: 2%;
    width: 100%;
    max-height: 20px;
    font-family: "Courier New", Courier, monospace;
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
    color: #2b3a52;
`;

const gymListContainer = css`
    display: flex;
    flex-wrap: wrap;
    padding: 0% 2%;
    width: 100%;
`;

const gymListBottom = css`
    width: 100%;
    height: 2%;
`;

const Main = () => {
    const [refresh, setRefresh] = useState(false);
    const [gyms, setGyms] = useState([]);

    const lastGymRef = useRef();
    useEffect(() => {
        const observerService = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setRefresh(true);
                }
            });
        };
        const observer = new IntersectionObserver(observerService, {
            threshold: 0.5,
        });
        observer.observe(lastGymRef.current);
    }, []);

    return (
        <div css={container}>
            <Header refresh={refresh} setRefresh={setRefresh} gyms={gyms} setGyms={setGyms} search={true} />
            <main css={main}>
                <div css={mainImgContainer}>
                    <img
                        css={mainImg}
                        src="https://www.da-gym.co.kr/_next/image?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fstone-i-dagym-centers%2Fimages%2Fevents%2F2305_dagym_mobile.png&w=1920&q=75"
                    />
                </div>
                <div css={mentCss}> 여긴 어때요?</div>
                <div css={gymListContainer}>
                    {gyms.length > 0 ? gyms.map((gym) => <GymList key={gym.gymId} gym={gym}></GymList>) : ""}
                    <div css={gymListBottom} ref={lastGymRef}></div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Main;
