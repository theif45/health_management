/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { BiUser, BiSearch } from "react-icons/bi";
import SearchBar from "../../SearchBar/SearchBar";
import { useNavigate } from "react-router";
import SideBar from "../../SideBar/SideBar";

const header = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5%;
    background-color: white;
`;

const headerButton = css`
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2%;
    width: 40%;
    background-color: white;
`;

const mainLogo = css`
    height: 100%;
    cursor: pointer;
`;

const headerIcon = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
`;

const Header = ({ gyms, setGyms, refresh, setRefresh, search }) => {
    const navigate = useNavigate();
    const [isSideBarOpen, setIsSideBarOpen] = useState();
    const [isSearchBarOpen, setIsSearchBarOpen] = useState();

    const sideBarClickHandle = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    const searchBarClickHandle = () => {
        setIsSearchBarOpen(!isSearchBarOpen);
    };

    const mainClickHandle = () => {
        window.location.href = "/";
    };
    return (
        <>
            <header css={header}>
                <div css={headerButton}>
                    <div css={headerIcon} onClick={sideBarClickHandle}>
                        <BiUser />
                    </div>
                    <img css={mainLogo} src="/images/logo.png" alt="" onClick={mainClickHandle} />
                    {search ? (
                        <div css={headerIcon} onClick={searchBarClickHandle}>
                            <BiSearch />
                        </div>
                    ) : (
                        <div style={{ width: 22 }}></div>
                    )}
                </div>
                <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
                {search ? (
                    <SearchBar
                        isSearchBarOpen={isSearchBarOpen}
                        gyms={gyms}
                        setGyms={setGyms}
                        refresh={refresh}
                        setRefresh={setRefresh}
                    />
                ) : (
                    <></>
                )}
            </header>
        </>
    );
};

export default Header;
