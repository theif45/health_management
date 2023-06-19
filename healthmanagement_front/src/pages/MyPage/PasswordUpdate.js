/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Footer from "../../components/Main/Footer/Footer";
import Header from "../../components/Main/Header/Header";
import { MdExitToApp, MdSaveAlt } from "react-icons/md";

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

const PasswordUpdate = () => {
    const navigate = useNavigate();
    // 초깃값
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    //오류메세지 저장
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    // 유효성 검사
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordconfirm, setIsPasswordConfirm] = useState(false);

    const principal = useQuery(["Principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/account/principal", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    });

    const userInfo = useQuery(
        ["UserInfo"],
        async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get(`http://localhost:8080/account/users/${principal.data.data.userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response;
        },
        {
            enabled: !!principal.data,
        }
    );

    // 비밀번호가 저장되는 것 구현중
    const savePassword = useMutation(
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            return await axios.put(
                `http://localhost:8080/account/users/password/update`,
                {
                    userId: principal.data.data.userId,
                    password,
                },
                option
            );
        },
        {
            onSuccess: () => {
                alert("비밀번호 변경 완료");
                navigate("/");
            },
        }
    );

    if (principal.isLoading || userInfo.isLoading) {
        return <div>Loading...</div>;
    }

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

    const onclickExitHandle = () => {
        navigate("/" + principal.data.data.userId + "/mypage");
    };

    // 성공시에 mutate를 가지고 옴
    const onsuccessClickHandle = async () => {
        if (isPassword && isPasswordconfirm) {
            savePassword.mutate();
        }
    };

    return (
        <div css={container}>
            <Header search={false} />
            <main css={main}>
                <div css={title}>
                    <h1 css={titleText}>ModifyPage</h1>
                    <div css={box}>
                        <div css={button} onClick={onsuccessClickHandle}>
                            <MdSaveAlt css={icon} />
                        </div>
                        <div css={button} onClick={onclickExitHandle}>
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
                        <div css={errorMsgPasswordConfirm(isPasswordconfirm)}>{passwordConfirmMessage}</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PasswordUpdate;
