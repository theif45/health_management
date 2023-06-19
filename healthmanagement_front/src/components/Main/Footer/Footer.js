/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { BiLike, BiShoppingBag } from "react-icons/bi";
import { HiHome, HiMap } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { RiCalculatorFill } from "react-icons/ri";

const footer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5%;
    background-color: white;
`;

const pageButton = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2%;
    width: 40%;
    height: 100%;
`;

const pageLocation = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1%;
    gap: 5px;
    height: 100%;
    background-color: white;
    color: #dbdbdb;
    cursor: pointer;
    &:hover {
        text-shadow: 0px 0px 10px #dbdbdb;
        opacity: 0.5;
    }
    &:active {
        background-color: #fafafa;
    }
`;
const pageLocationIcon = css`
    font-size: 22px;
    height: 100%;
`;

const pageLocationName = css`
    font-size: 14px;
    height: 100%;
`;

const Footer = () => {
    const navigate = useNavigate();

    const onClickMain = () => {
        navigate("/");
    };

    const onClickMyCalory = () => {
        navigate("/myCalory");
    };

    const onClickMap = () => {
        navigate("/location/gyms");
    };

    const onClickShop = () => {
        navigate("/shop");
    };

    return (
        <footer css={footer}>
            <div css={pageButton}>
                <div css={pageLocation} onClick={onClickMain}>
                    <HiHome css={pageLocationIcon} />
                    <div css={pageLocationName}>홈</div>
                </div>
                <div css={pageLocation} onClick={onClickMyCalory}>
                    <RiCalculatorFill css={pageLocationIcon} />
                    <div css={pageLocationName}>칼로리 계산</div>
                </div>
                <div css={pageLocation} onClick={onClickMap}>
                    <HiMap css={pageLocationIcon} />
                    <div css={pageLocationName}>내 주변 헬스장</div>
                </div>
                <div css={pageLocation} onClick={onClickShop}>
                    <BiShoppingBag css={pageLocationIcon} />
                    <div css={pageLocationName}>쇼핑하기</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
