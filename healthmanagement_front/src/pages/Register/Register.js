/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

const header = css`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 5%;
    background-color: white;
`;

const mainLogo = css`
    height: 100%;
`;

const main = css`
    position: relative;
    top: 5%;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 85%;
    background-color: white;
`;

const registerInfo = css`
    display: flex;
    flex-direction: column;
    color: #58595b;
    padding: 1%;
    height: 68.5%;
    gap: 10px;
`;

const registerDetail = css`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 400;
    gap: 3px;
`;

const registerLabel = css`
    margin-left: 5px;
`;

const registerInput = css`
    border: 1px solid #dbdbdb;
    width: 100%;
    background-color: white;
    padding: 8px;
`;

const errorMsg = css`
    margin-left: 5px;
    font-size: 12px;
    color: red;
`;

const radioList = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const radio = css`
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const radioUserTypeCheck = css`
    display: flex;
    justify-content: space-between;
    width: 140px;
`;

const footer = css`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 10%;
    bottom: 0;
    background-color: white;
`;

const register = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2%;
    width: 100%;
    height: 100%;
`;

const registerButton = css`
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    background-color: #eda058;
    cursor: pointer;
`;

const Register = () => {
    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        userType: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        birthDate: "",
    });

    const successRegister = () => {
        setErrorMessage((prevErrorMessage) => ({
            ...prevErrorMessage, // 이전오류
            username: "",
            password: "",
            name: "",
            email: "",
            phone: "",
            birthDate: "",
        }));
        alert("회원가입 성공!");
        navigate("/auth/login");
    };

    const errorRegister = (error) => {
        const { errorData } = error.response.data;
        setErrorMessage((prevErrorMessage) => ({
            ...prevErrorMessage,
            ...errorData,
        }));
    };

    const registerSubmit = useMutation(async () => {
        const option = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            await axios.post("http://localhost:8080/auth/register", JSON.stringify({ ...registerUser }), option);
            successRegister();
        } catch (error) {
            errorRegister(error);
        }
    });

    const onchangeHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser((prevRegisterUser) => ({
            ...prevRegisterUser,
            [name]: value,
        }));
    };

    const userTypeClickHandle = (e) => {
        setRegisterUser((prevRegisterUser) => ({
            ...prevRegisterUser,
            [e.target.name]: e.target.value,
        }));
    };

    // if (!registerSubmit.isLoading)
    return (
        <div css={container}>
            <header css={header}>
                <img css={mainLogo} src="/image/gymLogo.png" alt="" />
            </header>
            <main css={main}>
                <div css={registerInfo}>
                    <div css={registerDetail}>
                        <label css={registerLabel}>아이디</label>
                        <input
                            css={registerInput}
                            type="text"
                            placeholder="아이디를 입력해 주세요."
                            name="username"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.username}</div>
                    </div>
                    <div css={registerDetail}>
                        <label css={registerLabel}>비밀번호</label>
                        <input
                            css={registerInput}
                            type="password"
                            placeholder="영문, 숫자, 특수문자 포함 8~16자를 입력해 주세요."
                            name="password"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.password}</div>
                    </div>
                    <div css={registerDetail}>
                        <label css={registerLabel}>이름</label>
                        <input
                            css={registerInput}
                            type="text"
                            placeholder="이름을 입력해 주세요."
                            name="name"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.name}</div>
                    </div>
                    <div css={registerDetail}>
                        <label css={registerLabel}>이메일</label>
                        <input
                            css={registerInput}
                            type="email"
                            placeholder="이메일을 입력해 주세요."
                            name="email"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.email}</div>
                    </div>
                    <div css={registerDetail}>
                        <label css={registerLabel}>생년월일</label>
                        <input
                            css={registerInput}
                            type="text"
                            placeholder="생년월일을 입력해 주세요. (ex: 1900-01-01)"
                            name="birthDate"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.birthDate}</div>
                    </div>
                    <div css={registerDetail}>
                        <label css={registerLabel}>전화번호</label>
                        <input
                            css={registerInput}
                            type="tel"
                            placeholder="전화번호를 입력해 주세요. (ex: 010-1234-5678)"
                            name="phone"
                            onChange={onchangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage.phone}</div>
                    </div>
                    <div css={registerDetail}>
                        <div css={radioList}>
                            <div css={radio}>
                                <div css={registerLabel} style={{ height: 20 }}>
                                    사용자
                                </div>
                                <div css={radioUserTypeCheck}>
                                    <div>
                                        <input
                                            type="radio"
                                            id="user"
                                            name="userType"
                                            value={0}
                                            onClick={userTypeClickHandle}
                                        />
                                        <label htmlFor="user">user</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="owner"
                                            name="userType"
                                            value={1}
                                            onClick={userTypeClickHandle}
                                        />
                                        <label htmlFor="owner">owner</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer css={footer}>
                <div css={register}>
                    <button
                        css={registerButton}
                        onClick={() => {
                            registerSubmit.mutate();
                        }}
                    >
                        회원가입
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Register;
