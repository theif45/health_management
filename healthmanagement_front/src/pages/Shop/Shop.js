/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";
import { useNavigate } from "react-router-dom";

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
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const titleText = css`
    display: flex;
    align-items: center;
    padding-left: 3%;
    width: 100%;
    height: 10%;
    font-size: 35px;
    font-weight: 600;
    color: #eea460;
    text-shadow: 2px 2px 2px #eea46050;
`;

const siteContainer = css`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    max-height: 75%;
`;

const siteBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 50%;
    gap: 5px;
`;

const iconImg = css`
    width: 80%;
    height: 85%;
    cursor: pointer;
`;

const siteName = css`
    font-size: 18px;
`;

const Shop = () => {
    const onClickImg = (e) => {
        const { alt } = e.target;
        if (alt === "피키다이어트") {
            window.location.href = "https://pickydiet.co.kr/";
        } else if (alt === "잇츠리얼") {
            window.location.href = "https://eatsreal.co.kr/";
        } else if (alt === "미트리") {
            window.location.href = "https://metree.co.kr/index/";
        } else if (alt === "다신샵") {
            window.location.href = "http://dshop.dietshin.com/";
        }
    };

    return (
        <div css={container}>
            <Header search={false} />
            <main css={main}>
                <h1 css={titleText}>Shop</h1>
                <div css={siteContainer}>
                    <div css={siteBox}>
                        <img
                            css={iconImg}
                            src="https://play-lh.googleusercontent.com/v9UKSXpbVQ4PjPDtJJMkXc6pztgqE6lrjcljQyY_b7neSSnEZu-ZAG9RPrOiJLcJGR44"
                            alt="피키다이어트"
                            onClick={onClickImg}
                        />
                        <div css={siteName}>피키다이어트</div>
                    </div>

                    <div css={siteBox}>
                        <img
                            css={iconImg}
                            src="https://cdn.imweb.me/upload/S201904245cbfe8207ff26/5f08c224d4e81.png"
                            alt="잇츠리얼"
                            onClick={onClickImg}
                        />
                        <div css={siteName}>잇츠리얼</div>
                    </div>

                    <div css={siteBox}>
                        <img
                            css={iconImg}
                            src="https://play-lh.googleusercontent.com/ZaUXFvH49ZE9unhxMWXwzRlMMiRgaE_RKnur0YWjzFgrX_CB8JR8FlHQc9pGbmfDLpo=w240-h480-rw"
                            alt="미트리"
                            onClick={onClickImg}
                        />
                        <div css={siteName}>미트리</div>
                    </div>

                    <div css={siteBox}>
                        <img
                            css={iconImg}
                            src="https://st.kakaocdn.net/shoppingstore/store/20210608171306_2c5ae010320a4f52bf9e39efeb8fc7f7.jpg"
                            alt="다신샵"
                            onClick={onClickImg}
                        />
                        <div css={siteName}>다신샵</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Shop;
