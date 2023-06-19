/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import React from "react";
import ReactModal from "react-modal";

const modalStyles = {
    content: {
        display: "flex",
        flexDirection: "column",
        width: "75%",
        height: "75%",
        margin: "auto",
        webkitOverflowScrolling: "touch",
    },
};

const imgs = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const GymImgsModal = ({ getImgs, isOpen, onRequestClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Example Modal" style={modalStyles}>
            {getImgs.data.data.map((img) => {
                return (
                    <>
                        <div css={imgs}>
                            <img src={"http://localhost:8080/image/post/" + img.tempName} />
                        </div>
                    </>
                );
            })}
        </ReactModal>
    );
};

export default GymImgsModal;
