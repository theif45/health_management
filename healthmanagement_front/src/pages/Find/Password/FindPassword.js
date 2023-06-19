/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

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
    cursor: pointer;
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

const titleContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    height: 80px;
`;

const title = css`
    font-size: 30px;
    font-weight: 600;
`;

const subtitle = css`
    font-size: 14px;
    height: 40px;
`;

const inputContainer = css`
    display: flex;
    flex-direction: column;
    color: #58595b;
    padding: 1%;
    height: 20%;
    min-height: 150px;
    gap: 10px;
`;

const input = css`
    width: 100%;
    background-color: white;
    border: 1px solid #dbdbdb;
    padding: 12px;
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

const find = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2%;
    width: 100%;
    height: 100%;
`;

const findButton = css`
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    border-radius: 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    background-color: #eda058;
    cursor: pointer;
`;

const FindPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();

    const sendMail = useMutation(async () => {
        const response = await axios.post("http://localhost:8080/mail/send", { email });
        if (!response.data == "4" || "2" || "3") {
            alert("메일을 발송하였습니다.");
        } else {
            alert("메일 발송을 실패하였습니다.");
        }
        const token = response.data;
        return response;
    });

    const sendMailClickhandle = () => {
        sendMail.mutate();
    };

    const emailInputHandle = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div css={container}>
            <header css={header}>
                <img css={mainLogo} src="/image/gymLogo.png" alt="" onClick={() => navigate("/auth/login")} />
            </header>
            <main css={main}>
                <div css={titleContainer}>
                    <h1 css={title}>비밀번호 찾기</h1>
                    <h2 css={subtitle}>비밀번호는 이메일 인증을 통해 찾으실 수 있습니다.</h2>
                </div>
                <div css={inputContainer}>
                    <input
                        css={input}
                        type="email"
                        onChange={emailInputHandle}
                        placeholder="이메일을 입력해 주세요."
                        name="email"
                    />
                </div>
            </main>
            <footer css={footer}>
                <div css={find}>
                    <button css={findButton} onClick={sendMailClickhandle}>
                        전송
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default FindPassword;
