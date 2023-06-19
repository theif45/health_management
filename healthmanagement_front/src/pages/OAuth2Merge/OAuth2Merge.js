/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";

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

const titleContainer = css`
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    gap: 15px;
    height: 10%;
`;

const title = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
`;

const subTitleContainer = css`
    display: flex;
    flex-direction: column;
    padding: 1%;
    gap: 10px;
    height: 100%;
`;

const subtitle = css`
    font-size: 22px;
`;

const Input = css`
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

const merge = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2%;
    width: 100%;
    height: 100%;
`;

const mergeButton = css`
    margin: 0 5px;
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    background-color: #eda058;
    cursor: pointer;
`;

const OAuth2Merge = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const provider = searchParams.get("provider");
    const email = searchParams.get("email");
    const [mergeData, setMergeData] = useState({
        email: email,
        provider: provider,
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const providerMerge = useMutation(
        async () => {
            try {
                const response = await axios.put("http://localhost:8080/auth/oauth2/merge", mergeData);
                return response;
            } catch (error) {
                setErrorMessage(error.response.data.message);
                return error;
            }
        },
        {
            onSuccess: (response) => {
                if (response.status === 200) {
                    alert("계정 통합 완료!");
                    window.location.replace("/auth/login");
                }
            },
        }
    );

    const passwordChangeHandle = (e) => {
        setMergeData({ ...mergeData, [e.target.name]: e.target.value });
    };

    const submitClickHandle = () => {
        providerMerge.mutate();
    };

    const cancleClickHandle = () => {
        window.location.replace("/auth/login");
    };

    return (
        <div css={container}>
            <header css={header}>
                <img css={mainLogo} src="/image/gymLogo.png" alt="" />
            </header>
            <main css={main}>
                <div css={titleContainer}>
                    <h1 css={title}>계정 통합 안내</h1>
                    <div css={subTitleContainer}>
                        <h2 css={subtitle}>{email}는 이미 가입된 이메일입니다.</h2>
                        <h2 css={subtitle}>기존 계정과 {provider}계정을 통합하는 것에 동의 하십니까?</h2>
                        <input
                            css={Input}
                            type="password"
                            placeholder="기존 계정의 비밀번호를 입력하세요."
                            name="password"
                            onChange={passwordChangeHandle}
                        />
                        <div css={errorMsg}>{errorMessage}</div>
                    </div>
                </div>
            </main>
            <footer css={footer}>
                <div css={merge}>
                    <button css={mergeButton} onClick={submitClickHandle}>
                        동의
                    </button>
                    <button css={mergeButton} onClick={cancleClickHandle}>
                        취소
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default OAuth2Merge;
