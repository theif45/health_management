/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const main = css`
    top: 5%;
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

const mainTitleText = css`
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

const calculatorDetail = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px #dbdbdb;
    width: 75%;
    height: 160%;
`;

const calculatorContainer = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 5%;
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
const inputContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4%;
    width: 100%;
    height: 55%;
`;

const imgBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    box-shadow: 0px 5px 5px #dbdbdb;
    padding: 5px;
    width: 90%;
    height: 100%;
    background-color: #fafafa;
    overflow: hidden;
`;
const footer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    width: 90%;
    height: 30%;
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
    border-radius: 7px;
    padding: 5%;
    height: 30px;
    background-color: white;
    font-weight: 600;
    box-shadow: 0px 5px 5px #dbdbdb;
`;

const boxProporty = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`;

const calButton = css`
    margin-bottom: 10px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 10px #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
`;
const footerProporty = css`
    display: flex;
    flex-direction: column;
`;

const inputBox = css`
    width: 30%;
`;
const MyCalory = () => {
    const [calInfo, setCalInfo] = useState({
        age: "",
        height: "",
        weight: "",
        gender: "",
        active: "",
        purpose: "",
    });
    const [basalMetabolism, setBasalMetabolism] = useState(0);
    const [controlMeal, setControlMeal] = useState(0);
    const [carbohydrate, setCarbohydrate] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [calInfoResult, setCalInfoResult] = useState({
        basalMetabolism: 0,
        carbohydrate: 0,
        protein: 0,
        fat: 0,
    });

    const onchangeHandle = (e) => {
        const { name, value } = e.target;
        setCalInfo({ ...calInfo, [name]: value });
    };

    const radioClickHandle = (e) => {
        const { name, value } = e.target;
        if (name === "gender") {
            if (value === "0") {
                setBasalMetabolism(
                    Math.floor(
                        parseInt(calInfo.weight) +
                            13.4 * parseInt(calInfo.weight) +
                            4.8 * parseInt(calInfo.height) -
                            5.68 * parseInt(calInfo.age)
                    )
                );
            } else if (value === "1") {
                setBasalMetabolism(
                    Math.floor(
                        parseInt(calInfo.weight) +
                            9.25 * parseInt(calInfo.weight) +
                            3.1 * parseInt(calInfo.height) -
                            5.68 * parseInt(calInfo.age)
                    )
                );
            }
        } else if (name === "active") {
            if (value === "0") {
                setControlMeal(Math.floor(parseInt(basalMetabolism) * 1.2));
            } else if (value === "1") {
                setControlMeal(Math.floor(parseInt(basalMetabolism) * 1.4));
            } else {
                setControlMeal(Math.floor(parseInt(basalMetabolism) * 1.6));
            }
        } else if (name === "purpose") {
            if (value === "0") {
                setCarbohydrate(Math.floor((controlMeal * 0.4) / 4));
                setProtein(Math.floor((controlMeal * 0.4) / 4));
                setFat(Math.floor((controlMeal * 0.2) / 9));
            } else if (value === "1") {
                setCarbohydrate(Math.floor((controlMeal * 0.45) / 4));
                setProtein(Math.floor((controlMeal * 0.35) / 4));
                setFat(Math.floor((controlMeal * 0.2) / 9));
            } else {
                setCarbohydrate(Math.floor((controlMeal * 0.5) / 4));
                setProtein(Math.floor((controlMeal * 0.3) / 4));
                setFat(Math.floor((controlMeal * 0.2) / 9));
            }
        } else {
            setCalInfo({ ...calInfo, [name]: value });
        }
    };

    const calCulatorButtonClickHandle = () => {
        console.log(calInfo);
        if (calInfo.age === "" || calInfo.height === "" || calInfo.weight === "") {
            return;
        } else {
            setCalInfoResult({
                basalMetabolism,
                carbohydrate,
                protein,
                fat,
            });
            setCalInfo({
                age: "",
                height: "",
                weight: "",
                gender: "",
                active: "",
                purpose: "",
            });
        }
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radioButton) => {
            radioButton.checked = false;
        });
    };

    return (
        <div css={container}>
            <Header search={false}></Header>
            <div css={main}>
                <h1 css={mainTitleText}>Calorie</h1>
                <div css={calculatorContainer}>
                    <div css={calculatorDetail}>
                        <header css={header}>
                            <h1 css={titleText}>칼로리 계산기</h1>
                        </header>
                        <main css={inputContainer}>
                            <div css={imgBox}>
                                <div css={boxProporty}>
                                    <input
                                        type="number"
                                        placeholder="age"
                                        name="age"
                                        css={inputBox}
                                        onChange={onchangeHandle}
                                        value={calInfo.age}
                                        min="0"
                                    ></input>
                                    <label css={boxProporty}>세</label>
                                </div>
                                <div css={boxProporty}>
                                    <input
                                        type="number"
                                        placeholder="height"
                                        name="height"
                                        css={inputBox}
                                        onChange={onchangeHandle}
                                        value={calInfo.height}
                                        min="0"
                                    ></input>
                                    <label css={boxProporty}>cm</label>
                                </div>
                                <div css={boxProporty}>
                                    <input
                                        type="number"
                                        placeholder="weight"
                                        name="weight"
                                        css={inputBox}
                                        onChange={onchangeHandle}
                                        value={calInfo.weight}
                                        min="0"
                                    ></input>
                                    <label css={boxProporty}>kg</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value={0}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>남</label>
                                    <input
                                        type="radio"
                                        id="feMale"
                                        name="gender"
                                        value={1}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>여</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="low"
                                        name="active"
                                        value={0}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>활동량 적음</label>
                                    <input
                                        type="radio"
                                        id="nomal"
                                        name="active"
                                        value={1}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>활동량 보통</label>
                                    <input
                                        type="radio"
                                        id="over"
                                        name="active"
                                        value={2}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>활동량 많음</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="minus"
                                        name="purpose"
                                        value={0}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>체중 감소</label>
                                    <input
                                        type="radio"
                                        id="keep"
                                        name="purpose"
                                        value={1}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>체중 유지</label>
                                    <input
                                        type="radio"
                                        id="plus"
                                        name="purpose"
                                        value={2}
                                        onChange={radioClickHandle}
                                    ></input>
                                    <label>체중 증가</label>
                                </div>
                            </div>
                        </main>
                        <footer css={footer}>
                            <div css={footerProporty}>
                                <h2 css={infoDetail}>기초대사량</h2>
                                <h2 css={infoDetail}>{calInfoResult.basalMetabolism}Kcal</h2>
                                <h2 css={infoDetail}>하루 섭취 권장량</h2>
                                <h2 css={infoDetail}>
                                    탄수화물:{calInfoResult.carbohydrate}g 단백질:{calInfoResult.protein}g 지방:
                                    {calInfoResult.fat}g
                                </h2>
                            </div>
                        </footer>
                        <button css={calButton} onClick={calCulatorButtonClickHandle}>
                            계산하기
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyCalory;
