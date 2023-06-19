import ReactModal from "react-modal";
import React, { useState } from "react";

const MyModal = ({ isOpen, onRequestClose }) => {
    return (
        <ReactModal
            isOpen={isOpen} // 모달 창이 열릴지 여부를 state값으로 설정해줍니다.
            onRequestClose={onRequestClose} // 모달 창을 닫을 때 실행할 함수를 props로 전달합니다.
            contentLabel="Example Modal" // 스크린 리더기에 의해 읽히는 레이블입니다.
        >
            <h2>Modal Title</h2>
            <p>Modal</p>
            <button onClick={onRequestClose}>Close Modal</button>
        </ReactModal>
    );
};

export default MyModal;
