/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRef, useState } from "react";
import { async } from "q";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Post from "./Post";
import Header from "../../../components/Main/Header/Header";
import Footer from "../../../components/Main/Footer/Footer";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

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

const mainTitleContainer = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px 30px 0px;
    width: 100%;
    height: 55px;
    background-color: white;
`;
const out = css`
    border: none;
    font-weight: 600;
    font-size: 17px;
    background-color: white;
    cursor: pointer;
`;

const title = css`
    right: 13px;
    position: relative;
    margin: 0px auto;
    color: #58595b;
    font-weight: bold;
    font-size: 17px;
    line-height: 24px;
`;

const mainContent = css`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.5%;
    align-items: center;
    width: 100%;
    height: 80%;
    gap: 18px;
`;

const sign = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    padding: 15px;
    width: 100%;
    height: 15%;
    gap: 10px;
    font-size: 15px;
    color: #58595b;
    background-color: #eda058;
`;

const inputBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`;

const inputTitle = css`
    padding-left: 5px;
    width: 100%;
    font-weight: normal;
    font-size: 15px;
    color: #96989c;
`;

const input = css`
    padding: 8px;
    border: 1px solid #e3e4e5;
    outline: none;
    letter-spacing: -0.2px;
    width: 100%;
    font-weight: normal;
    font-size: 15px;
    color: #58595b;
`;

const errorMsg = css`
    margin-left: 5px;
    font-size: 12px;
    color: red;
`;

const addressInput = css`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
`;

const addressButton = css`
    border: 1px solid #e3e4e5;
    width: 15%;
    background-color: #eda058;
    cursor: pointer;
`;

const imgInput = css`
    outline: none;
    letter-spacing: -0.2px;
    width: 100%;
    font-weight: normal;
    font-size: 15px;
    color: #58595b;
`;

const gymRegiste = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const registeButton = css`
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    background-color: #eda058;
    cursor: pointer;
`;

const postList = css`
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
`;

const FacilityReq = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    const navigate = useNavigate();
    const [registerGym, setRegistserGym] = useState({
        gymName: "",
        gymTel: "",
        businessNumber: "",
        gymPrice: "",
        registDate: currentDate,
    });
    const [enroll_company, setEnroll_company] = useState({
        gymAddress: "",
    });

    const [errorMessage, setErrorMessage] = useState({
        gymName: "",
        gymTel: "",
        businessNumber: "",
        gymPrice: "",
    });

    const [popup, setPopup] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [imgFiles, setImgFiles] = useState([]);
    const fileId = useRef(1);

    const successRegister = () => {
        setErrorMessage({
            gymName: "",
            gymTel: "",
            businessNumber: "",
            gymPrice: "",
        });
        alert("헬스장 등록 성공!");
        navigate("/");
    };

    const errorRegister = (error) => {
        setErrorMessage({
            gymName: "",
            gymTel: "",
            businessNumber: "",
            gymPrice: "",
            ...error.response.data.errorData,
        });
    };

    const registerHandleSubmit = useMutation(async () => {
        const gymInfoOption = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post(
                "http://localhost:8080/gyms/register",
                JSON.stringify({ ...registerGym, ...enroll_company }),
                gymInfoOption
            );
            console.log(response);

            const gymId = response.data;

            if (gymId !== null) {
                const formData = new FormData();
                formData.append("gymId", gymId);

                imgFiles.forEach((imgFile) => {
                    formData.append("imgFiles", imgFile.file);
                });

                formData.forEach((value, key) => {
                    console.log("key" + key + ",value" + value);
                });

                const gymImgOption = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Context-Type": "multipart/form-data",
                    },
                };
                await axios.post("http://localhost:8080/gyms/images/register", formData, gymImgOption);
                successRegister();
            }
        } catch (error) {
            errorRegister(error);
            console.log(error);
        }
    });

    const handleClick = () => {
        window.location.href = "/";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistserGym({ ...registerGym, [name]: value });
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setEnroll_company({ ...enroll_company, [name]: value });
    };

    const isOpenClickHandle = () => {
        setIsOpen(!isOpen);
    };

    const handleComplete = () => {
        setPopup(!popup);
    };

    const addFileHandle = (e) => {
        const newImgFiles = [];

        for (const file of e.target.files) {
            const fileData = {
                id: fileId.current,
                file,
            };

            fileId.current += 1;
            newImgFiles.push(fileData);
        }

        setImgFiles([...imgFiles, ...newImgFiles]);
        e.target.value = null;
    };

    const removeFileHandle = (e) => {
        setImgFiles([...imgFiles.filter((imgFile) => imgFile.id !== parseInt(e.target.value))]);
    };

    return (
        <div css={container}>
            <Header search={false} />
            <main css={main}>
                <div css={mainTitleContainer}>
                    <button css={out} onClick={handleClick}>
                        <AiOutlineArrowLeft />
                    </button>
                    <h1 css={title}>시설등록요청</h1>
                </div>
                <div css={mainContent}>
                    <div css={sign}>
                        <h3>파트너가 되고 싶은 사장님이신가요?!</h3>
                        <h3>매출부터 운영까지, 모두의짐이 함께 고민합니다. 지금 모두의짐의 파트너센터가 되어보세요</h3>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>운동시설 이름</label>
                        <input
                            css={input}
                            type="name"
                            placeholder="헬스장 이름을 입력해주세요."
                            onChange={handleChange}
                            name="gymName"
                        />
                        <div css={errorMsg}>{errorMessage.gymName}</div>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>주소</label>
                        <div css={addressInput}>
                            <input
                                css={input}
                                type="text"
                                placeholder="주소를 검색해주세요"
                                onChange={handleAddressChange}
                                name="gymAddress"
                                value={enroll_company.gymAddress}
                                disabled
                            />
                            <button css={addressButton} onClick={handleComplete}>
                                주소 찾기
                            </button>
                        </div>
                        {popup && <Post company={enroll_company} setcompany={setEnroll_company}></Post>}
                        <div css={errorMsg}></div>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>전화번호</label>
                        <input
                            css={input}
                            type="text"
                            placeholder="전화번호를 입력해주세요. (ex: 010-1234-5678 or 0505-1234-5678)"
                            onChange={handleChange}
                            name="gymTel"
                        />
                        <div css={errorMsg}>{errorMessage.gymTel}</div>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>사업자등록번호</label>
                        <input
                            css={input}
                            type="text"
                            placeholder="사업자등록번호를 입력해주세요. (ex: 123-45-67890)"
                            onChange={handleChange}
                            name="businessNumber"
                        />
                        <div css={errorMsg}>{errorMessage.businessNumber}</div>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>가격</label>
                        <input
                            css={input}
                            type="text"
                            placeholder="이용 가격을 입력해주세요."
                            onChange={handleChange}
                            name="gymPrice"
                        />
                        <div css={errorMsg}>{errorMessage.gymPrice}</div>
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>등록일</label>
                        <input css={input} type="text" defaultValue={currentDate} name="registDate" disabled={true} />
                    </div>
                    <div css={inputBox}>
                        <label css={inputTitle}>이미지(※대표사진을 가장 상단에 배치해주세요) </label>
                        <div css={imgInput}>
                            <input
                                type="file"
                                multiple={true}
                                onChange={addFileHandle}
                                onClick={isOpenClickHandle}
                                accept={".jpg,.png"}
                            />
                            <ul css={postList}>
                                {imgFiles.map((imgFile) => (
                                    <li key={imgFile.id}>
                                        {imgFile.file.name}{" "}
                                        <button value={imgFile.id} onClick={removeFileHandle}>
                                            삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div css={gymRegiste}>
                        <button css={registeButton} onClick={() => registerHandleSubmit.mutate()}>
                            등록하기
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FacilityReq;
