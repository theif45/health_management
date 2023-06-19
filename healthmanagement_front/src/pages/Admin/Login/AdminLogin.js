/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #444444;
`;

const main = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    background-color: #fff;
`;

const titleBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const title = css`
    width: 100%;
    max-width: 200px;
    object-fit: contain;
`;

const subTitle = css`
    font-size: 20px;
    font-weight: 600;
    color: #444444;
    margin-top: 10px;
`;

const loginInfo = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 30px;
`;

const inputBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
`;

const inputLabel = css`
    font-size: 16px;
    font-weight: 600;
`;

const input = css`
    margin-top: 3px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
`;

const button = css`
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    background-color: #eda058;
    cursor: pointer;
`;

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loginAdmin, setLoginAdmin] = useState({
        username: "",
        password: "",
    });
    const loginSubmit = useMutation(async () => {
        const option = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("http://localhost:8080/admin/login", loginAdmin, option);
            localStorage.setItem("accessToken", response.data);
            alert("로그인 성공!");
            navigate("/admin/dashboard");
        } catch (error) {
            alert("관리자 계정으로 로그인 해주세요.");
        }
    });

    const onchangeHandle = (e) => {
        const { name, value } = e.target;
        setLoginAdmin({ ...loginAdmin, [name]: value });
    };

    const loginClickHandle = () => {
        loginSubmit.mutate();
    };

    if (!loginSubmit.isLoading)
        return (
            <div css={container}>
                <main css={main}>
                    <div css={titleBox}>
                        <img css={title} src="/images/logo.png" alt="로고" />
                        <h2 css={subTitle}>Administration</h2>
                    </div>
                    <div css={loginInfo}>
                        <div css={inputBox}>
                            <label css={inputLabel} htmlFor="username">
                                ID
                            </label>
                            <input css={input} type="text" name="username" onChange={onchangeHandle} />
                        </div>
                        <div css={inputBox}>
                            <label css={inputLabel} htmlFor="password">
                                PW
                            </label>
                            <input css={input} type="password" name="password" onChange={onchangeHandle} />
                        </div>
                    </div>
                    <button css={button} onClick={loginClickHandle}>
                        Login
                    </button>
                </main>
            </div>
        );
};

export default AdminLogin;
