/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { MdExitToApp, MdSaveAlt } from "react-icons/md";

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

const title = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 10%;
`;

const titleText = css`
    display: flex;
    align-items: center;
    padding-left: 3%;
    width: 100%;
    font-size: 35px;
    font-weight: 600;
    color: #eea460;
    text-shadow: 2px 2px 2px #eea46050;
`;

const box = css`
    display: flex;
    align-items: center;
`;

const button = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
`;

const icon = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const passwordInfo = css`
    display: flex;
    flex-direction: column;
    color: #58595b;
    padding: 1%;
    width: 100%;
    height: 18%;
    gap: 10px;
`;

const passwordDetail = css`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 400;
    gap: 3px;
`;

const passwordLabel = css`
    margin-left: 5px;
`;

const passwordInput = css`
    border: 1px solid #dbdbdb;
    width: 100%;
    background-color: white;
    padding: 8px;
`;

const errorMsgPassword = (isPassword) => css`
    margin-left: 5px;
    font-size: 12px;
    color: ${isPassword ? "green" : "red"};
`;

const errorMsgPasswordConfirm = (isPasswordconfirm) => css`
    margin-left: 5px;
    font-size: 12px;
    color: ${isPasswordconfirm ? "green" : "red"};
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

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    // 초깃값
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    //오류메세지 저장
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    // 유효성 검사
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    console.log(searchParams.get("username"));

    // 비밀번호가 저장되는 것 구현중
    const savePassword = useMutation(
        async () => {
            return await axios.put(`http://localhost:8080/auth/forgot/password/change`, {
                username: searchParams.get("username"),
                password,
            });
        },
        {
            onSuccess: () => {
                alert("비밀번호 변경 완료");
                navigate("/auth/login");
            },
        }
    );

    // 비밀번호와 비밀번호 확인하는 정규식 구현중

    const onChangePasswordHandle = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            if (!passwordRegExp.test(value)) {
                setPasswordMessage("숫자+ 영문자 + 특수문자 조합으로 8자리이상 입력해주세요");
                setIsPassword(false);
            } else {
                setPasswordMessage("안전한 비밀번호입니다");
                setIsPassword(true);
            }
            setPassword(value);
        } else if (name === "passwordConfirm") {
            if (!(value === password)) {
                setPasswordConfirmMessage("비밀번호가 같지않습니다");
                setIsPasswordConfirm(false);
            } else {
                setPasswordConfirmMessage("비밀번호를 올바르게 입력하였습니다");
                setIsPasswordConfirm(true);
            }
            setPasswordConfirm(value);
        }
    };

    // 성공시에 mutate를 가지고 옴
    const onSuccessClickHandle = async () => {
        if (isPassword && isPasswordConfirm) {
            savePassword.mutate();
        }
    };
    return (
        <div css={container}>
            <header css={header}>
                <img css={mainLogo} src="/image/gymLogo.png" alt="" />
            </header>
            <main css={main}>
                <div css={title}>
                    <h1 css={titleText}>ForgotPassword</h1>
                    <div css={box}>
                        <div css={button} onClick={onSuccessClickHandle}>
                            <MdSaveAlt css={icon} />
                        </div>
                        <div css={button}>
                            <MdExitToApp css={icon} />
                        </div>
                    </div>
                </div>
                <div css={passwordInfo}>
                    <div css={passwordDetail}>
                        <lable css={passwordLabel}> 비밀번호</lable>
                        <input
                            css={passwordInput}
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            onChange={onChangePasswordHandle}
                            name="password"
                            value={password}
                        ></input>
                        <div css={errorMsgPassword(isPassword)}>{passwordMessage}</div>
                    </div>
                    <div css={passwordDetail}>
                        <lable css={passwordLabel}>비밀번호확인</lable>
                        <input
                            css={passwordInput}
                            type="password"
                            placeholder="비밀번호를 확인해주세요"
                            onChange={onChangePasswordHandle}
                            name="passwordConfirm"
                            value={passwordConfirm}
                        ></input>
                        <div css={errorMsgPasswordConfirm(isPasswordConfirm)}>{passwordConfirmMessage}</div>
                    </div>
                </div>
            </main>
            <footer css={footer}></footer>
        </div>
    );
};

export default ForgotPassword;
