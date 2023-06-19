/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
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

const loginInfo = css`
    display: flex;
    flex-direction: column;
    color: #58595b;
    padding: 1%;
    height: 20%;
    min-height: 150px;
    gap: 10px;
`;

const loginDetail = css`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 400;
    gap: 3px;
`;

const loginLabel = css`
    margin-left: 5px;
`;

const loginInput = css`
    width: 100%;
    background-color: white;
    border: 1px solid #dbdbdb;
    padding: 8px;
`;

const errorMsg = css`
    margin-left: 5px;
    font-size: 12px;
    color: red;
`;

const find = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 2%;
    font-size: 12px;
    height: 2%;
    gap: 2%;
`;

const findUsernamePassword = css`
    color: #96989c;
    cursor: pointer;
`;

const moreLogin = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 25%;
    padding: 2%;
    gap: 5px;
`;

const loginImg = css`
    width: 40%;
    cursor: pointer;
    object-fit: contain;
`;

const signUpContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5%;
`;

const signUp = css`
    font-size: 14px;
    height: 20px;
    cursor: pointer;
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

const login = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2%;
    width: 100%;
    height: 100%;
`;

const loginButton = css`
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    background-color: #eda058;
    cursor: pointer;
`;

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        username: "",
        password: "",
    });

    const findIdClickHandle = () => {
        navigate("/auth/forgot/username");
    };

    const findPasswordClickHandle = () => {
        navigate("/auth/forgot/password");
    };

    const signUpClickHandle = () => {
        navigate("/auth/register");
    };

    const successLogin = () => {
        setErrorMessage({
            username: "",
            password: "",
        });
        alert("로그인 성공!");
        navigate("/");
    };

    const errorLogin = (error) => {
        console.log(error);
        setErrorMessage({
            username: "",
            password: "",
            ...error.response.data.errorData,
        });
    };

    const loginSubmit = useMutation(async () => {
        const option = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/login",
                JSON.stringify({ ...loginUser }),
                option
            );
            localStorage.setItem("accessToken", response.data);
            successLogin();
        } catch (error) {
            errorLogin(error);
            alert("아이디 및 비밀번호를 확인해주세요");
        }
    });

    const onchangeHandle = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    };

    const naverAuthLoginClickHandle = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    };

    const kakaoAuthLoginClickHandle = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    };

    const googleAuthLoginClickHandle = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    if (!loginSubmit.isLoading)
        return (
            <div css={container}>
                <header css={header}>
                    <img css={mainLogo} src="/image/gymLogo.png" alt="" />
                </header>
                <main css={main}>
                    <div css={loginInfo}>
                        <div css={loginDetail}>
                            <label css={loginLabel}>아이디</label>
                            <input
                                css={loginInput}
                                type="text"
                                placeholder="아이디를 입력해 주세요."
                                onChange={onchangeHandle}
                                name="username"
                            />
                            <div css={errorMsg}>{errorMessage.username}</div>
                        </div>
                        <div css={loginDetail}>
                            <label css={loginLabel}>비밀번호</label>
                            <input
                                css={loginInput}
                                type="password"
                                placeholder="영문, 숫자, 특수문자 포함 8~16자를 입력해 주세요."
                                onChange={onchangeHandle}
                                name="password"
                            />
                            <div css={errorMsg}>{errorMessage.password}</div>
                        </div>
                    </div>
                    <div css={find}>
                        <div css={findUsernamePassword} onClick={findIdClickHandle}>
                            아이디찾기
                        </div>
                        <div css={findUsernamePassword} onClick={findPasswordClickHandle}>
                            비밀번호찾기
                        </div>
                    </div>
                    <div css={moreLogin}>
                        <img
                            css={loginImg}
                            src="../../images/naverLogin.png"
                            alt="naver"
                            onClick={naverAuthLoginClickHandle}
                        />
                        <img
                            css={loginImg}
                            src="../../images/kakaoLogin.png"
                            alt="kakao"
                            onClick={kakaoAuthLoginClickHandle}
                        />
                        <img
                            css={loginImg}
                            src="../../images/googleLogin.png"
                            alt="google"
                            onClick={googleAuthLoginClickHandle}
                        />
                    </div>
                    <div css={signUpContainer}>
                        <div css={signUp} onClick={signUpClickHandle}>
                            회원가입
                        </div>
                    </div>
                </main>
                <footer css={footer}>
                    <div css={login}>
                        <button
                            css={loginButton}
                            onClick={() => {
                                loginSubmit.mutate();
                            }}
                        >
                            로그인
                        </button>
                    </div>
                </footer>
            </div>
        );
};

export default Login;
