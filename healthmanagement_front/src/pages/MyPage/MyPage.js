/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { IoPersonRemoveOutline } from "react-icons/io5";
import axios from "axios";
import { BiCheck } from "react-icons/bi";
import Footer from "../../components/Main/Footer/Footer";
import Header from "../../components/Main/Header/Header";
import { useRecoilState } from "recoil";
import { authenticationState } from "../../store/atoms/AuthAtoms";

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
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const titleText = css`
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

const mypagecontainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const userInfo = css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 15%;
    background-color: white;
`;

const user = css`
    display: flex;
    align-items: center;
    padding: 0 3% 3%;
    width: 100%;
    gap: 10px;
`;

const imgbox = css`
    display: flex;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    background-color: orange;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 25px #dbdbdb;
    }
`;

const usernameAndEmail = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const username = css`
    display: flex;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.2px;
    height: 25px;
`;

const email = css`
    display: flex;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.2px;
    height: 25px;
`;

const sideContainer = css`
    display: flex;
    flex-direction: column;
`;

const buttonArea = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3% 3%;
    border-bottom: 1px solid #dbdbdb;
    width: 100%;
    height: 50px;
    background-color: white;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const title = css`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const Icon = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
`;

const Name = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 16px;
    font-weight: 600;
`;

const nowButton = css`
    display: flex;
    font-size: 30px;
`;

const memberWd = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 100%;
    height: 100px;
    font-weight: 600;
    background-color: white;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`;

const img = css`
    width: 100%;
    overflow: hidden;
    &:hover {
        opacity: 0.8;
    }
`;

const imageStoredCheckButton = css`
    background-color: white;
    border: 1px solid #dbdbdb;
    cursor: pointer;
    &:hover {
        box-shadow: 1px 1px 25px #dbdbdb;
    }
`;

const fileInput = css`
    display: none;
`;

const MyPage = () => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);

    const [imgFile, setImgFile] = useState();
    const [profileImgURL, setProfileImgURL] = useState();
    const [storedButtonIsOpen, setStoredButtonIsOpen] = useState(false);

    const fileRef = useRef();

    const principal = useQuery(
        ["principal"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.get("http://localhost:8080/account/principal", option);
            return response;
        },
        {
            onSuccess: (response) => {
                setProfileImgURL("http://localhost:8080/image/profile/" + response.data.profile);
            },
        }
    );

    const profileImgSubmit = useMutation(
        async () => {
            const formData = new FormData();
            formData.append("profileImgFile", imgFile);

            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "multipart/form-data",
                },
            };
            const response = await axios.post("http://localhost:8080/account/user/mypage/profile", formData, option);
            return response;
        },
        {
            onSuccess: () => {
                principal.refetch();
            },
        }
    );

    const profileImgChangeHandle = () => {
        fileRef.current.click();
    };

    const profileImgFileChangeHandle = (e) => {
        setImgFile(e.target.files[0]);

        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            setProfileImgURL(event.target.result);
        };

        fileReader.readAsDataURL(e.target.files[0]);
        e.target.value = null;
    };

    // 회원탈퇴
    const userDeletehandle = useMutation(
        async (userId) => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.delete(`http://localhost:8080/account/users/${userId}`, option);
            return response;
        },
        {
            onSuccess: (response) => {
                if (response.status === 200) {
                    alert("회원탈퇴 완료");
                    localStorage.clear();
                    setAuthState(false);
                    navigate("/auth/login");
                }
            },
            onError: (error) => {
                alert("회원탈퇴 실패");
            },
        }
    );

    const modifyClickHandle = () => {
        navigate("/" + principal.data.data.userId + "/mypage/modify");
    };

    const bookMarkClickHandle = () => {
        navigate("/gym/" + principal.data.data.userId + "/like/list");
    };

    const passwordulHandle = () => {
        navigate("/" + principal.data.data.userId + "/mypage/passwordupdate");
    };

    const deleteClickHandle = () => {
        if (window.confirm("확인을 누르면 회원정보가 삭제됩니다")) {
            userDeletehandle.mutate(principal.data.data.userId);
        } else {
            return;
        }
    };

    const storedButtonOpenHandle = () => {
        setStoredButtonIsOpen(true);
    };

    const storedButtonCloseHandle = () => {
        setStoredButtonIsOpen(false);
    };

    console.log(principal.data);

    if (!principal.isLoading)
        return (
            <div css={container}>
                <Header search={false} />
                <main css={main}>
                    <h1 css={titleText}>MyPage</h1>
                    <div css={mypagecontainer}>
                        <div css={userInfo}>
                            <div css={user}>
                                <div css={imgbox} onClick={profileImgChangeHandle}>
                                    <img src={profileImgURL} css={img} />
                                    <input
                                        type="file"
                                        css={fileInput}
                                        ref={fileRef}
                                        onChange={profileImgFileChangeHandle}
                                        onClick={storedButtonOpenHandle}
                                    />
                                </div>
                                {storedButtonIsOpen === true ? (
                                    <button
                                        css={imageStoredCheckButton}
                                        onClick={() => {
                                            profileImgSubmit.mutate();
                                            storedButtonCloseHandle();
                                        }}
                                    >
                                        <BiCheck />
                                    </button>
                                ) : (
                                    ""
                                )}
                                <div css={usernameAndEmail}>
                                    <div css={username}>{principal.data.data.username}</div>
                                    <div css={email}>{principal.data.data.email}</div>
                                </div>
                            </div>
                        </div>
                        <div css={sideContainer}>
                            <div css={buttonArea} onClick={modifyClickHandle}>
                                <div css={title}>
                                    <BiUserCircle css={Icon} />
                                    <div css={Name}>정보 수정</div>
                                </div>
                                <AiOutlineDoubleRight css={nowButton} />
                            </div>
                            <div css={buttonArea} onClick={passwordulHandle}>
                                <div css={title}>
                                    <TbPassword css={Icon} />
                                    <div css={Name}>비밀번호 변경</div>
                                </div>
                                <AiOutlineDoubleRight css={nowButton} />
                            </div>
                            <div css={buttonArea} onClick={bookMarkClickHandle}>
                                <div css={title}>
                                    <FaRegStar css={Icon} />
                                    <div css={Name}>관심목록</div>
                                </div>
                                <AiOutlineDoubleRight css={nowButton} />
                            </div>
                            <div css={buttonArea} onClick={deleteClickHandle}>
                                <div css={title}>
                                    <IoPersonRemoveOutline css={Icon} />
                                    <div css={Name}>회원 탈퇴</div>
                                </div>
                                <AiOutlineDoubleRight css={nowButton} />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
};

export default MyPage;
