/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";
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

const modifyInfo = css`
    display: flex;
    flex-direction: column;
    color: #58595b;
    padding: 1%;
    width: 100%;
    height: 45%;
    gap: 10px;
`;

const modifyDetail = css`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 400;
    gap: 3px;
`;

const modifyLabel = css`
    margin-left: 5px;
`;

const modifyInput = css`
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

const errorMsgPhone = (isPhone) => css`
    margin-left: 5px;
    font-size: 12px;
    color: ${isPhone ? "green" : "red"};
`;

const errorMsgEmail = (isEmail) => css`
    margin-left: 5px;
    font-size: 12px;
    color: ${isEmail ? "green" : "red"};
`;

const ModifyPage = () => {
    const navigate = useNavigate();
    const [changeuser, setChangeUser] = useState({});

    //초깃값

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // 오류메세지 저장

    const [nameMessage, setNameMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");

    //유효성 검사

    const [isName, setIsName] = useState(true);
    const [isPhone, setIsPhone] = useState(true);

    const principal = useQuery(["Principal"], async () => {
        const response = await axios.get("http://localhost:8080/account/principal", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response;
    });

    const userInfo = useQuery(
        ["UserInfo"],
        async () => {
            const response = await axios.get(`http://localhost:8080/account/users/${principal.data.data.userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response;
        },
        {
            enabled: !!principal.data,
            onSuccess: (response) => {
                setPhone(response.data.phone);
                setName(response.data.name);
            },
        }
    );
    //회원정보가 저장되는 것 구현중
    const saveinfo = useMutation(
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            return await axios.put(
                `http://localhost:8080/account/users/${principal.data.data.userId}`,
                {
                    username: principal.data.data.username,
                    phone,
                    name,
                },
                option
            );
        },
        {
            onSuccess: () => {
                alert("회원정보 변경완료");
                navigate("/");
            },
        }
    );

    if (principal.isLoading || userInfo.isLoading) {
        return <div>Loading...</div>;
    }

    const onclickExitHandle = () => {
        navigate("/" + principal.data.data.userId + "/mypage");
    };

    // 휴대전화 수정
    const onchangePhone = (e) => {
        const currentPhone = e.target.value;
        setPhone(currentPhone);
        const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("전화번호를 형식에 맞춰 작성해주세요. (ex: 010-1234-5678)");
            setIsPhone(false);
        } else {
            setPhoneMessage("사용가능합니다.");
            setIsPhone(true);
        }
        setChangeUser({ ...changeuser, phone: currentPhone });
    };

    // 이메일 정보수정
    const onchangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        const nameRegExp = /^[가-힣]{2,7}$/;

        if (!nameRegExp.test(currentName)) {
            setNameMessage("이름은 2~7자 사이의 한글이어야 합니다.");
            setIsName(false);
        } else {
            setNameMessage("사용가능합니다.");
            setIsName(true);
        }
        setChangeUser({ ...changeuser, name: currentName });
    };

    const onsuccessClickHandle = () => {
        if (isName && isPhone) {
            saveinfo.mutate();
        }
    };

    // 회원정보 수정시 저장구현완료
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
                <div css={modifyInfo}>
                    <div css={modifyDetail}>
                        <lable css={modifyLabel}>아이디</lable>
                        <input css={modifyInput} value={userInfo.data.data.username} disabled />
                        <div css={errorMsg}>변경할 수 없습니다.</div>
                    </div>
                    <div css={modifyDetail}>
                        <lable css={modifyLabel}>이름</lable>
                        <input
                            css={modifyInput}
                            type="text"
                            placeholder="이름을 입력해 주세요"
                            onChange={onchangeName}
                            name="name"
                            value={name}
                        ></input>
                        <div css={errorMsgEmail(isName)}>{nameMessage}</div>
                    </div>
                    <div css={modifyDetail}>
                        <lable css={modifyLabel}>이메일</lable>
                        <input css={modifyInput} value={userInfo.data.data.email} disabled />
                        <div css={errorMsg}>변경할 수 없습니다.</div>
                    </div>
                    <div css={modifyDetail}>
                        <lable css={modifyLabel}>전화번호</lable>
                        <input
                            css={modifyInput}
                            type="text"
                            placeholder="전화번호를 입력해 주세요. (ex: 010-1234-5678)"
                            onChange={onchangePhone}
                            name="phone"
                            value={phone}
                        />
                        <div css={errorMsgPhone(isPhone)}>{phoneMessage}</div>
                    </div>
                    <div css={modifyDetail}>
                        <lable css={modifyLabel}>생년월일</lable>
                        <input css={modifyInput} value={userInfo.data.data.birthDate} disabled />
                        <div css={errorMsg}>변경할 수 없습니다.</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ModifyPage;
