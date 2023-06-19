import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authenticationState } from "../../../store/atoms/AuthAtoms";

const AuthRoute = ({ path, element }) => {
    const navigate = useNavigate();
    const [authState, setAuthState] = useRecoilState(authenticationState);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserAndOwner, setIsUserAndOwner] = useState(false);

    const authenticated = useQuery(
        ["authenticated"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            return await axios.get("http://localhost:8080/auth/authenticated", option);
        },
        {
            enabled: !authState,
            onSuccess: (response) => {
                if (response.status === 200) {
                    if (response.data) {
                        setAuthState(true);
                    }
                }
            },
        }
    );

    const adminCheck = useQuery(
        ["adminCheck"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.get("http://localhost:8080/admin/authority", option);
            return response;
        },
        {
            enabled: authState && !isAdmin && !isUserAndOwner,
            onSuccess: (response) => {
                console.log(response);
                if (response.data === "ROLE_ADMIN") {
                    setIsAdmin(true);
                }
                if (response.data === "ROLE_USER" || response.data === "ROLE_OWNER") {
                    setIsUserAndOwner(true);
                }
            },
        }
    );

    // console.log(authenticated);
    // console.log(authState);
    // console.log(adminCheck);
    // console.log(isAdmin);
    // console.log(isUserAndOwner);
    const authPath = "/auth";
    const adminPath = "/admin";

    if (authenticated.isLoading || adminCheck.isLoading) {
        return <></>;
    }

    // 인증이 되지 않고 /auth인 페이지로 이동 시에는 그대로 이동

    // 인증이 되지 않고 /auth가 아닌 페이지로 이동 시
    if (!authState && !path.startsWith(authPath)) {
        // /admin 페이지로 이동 시 /admin/login페이지로 이동
        if (path === "/admin/login") {
            return element;
            // 나머지 페이지는 /auth/login 페이지로 이동
        }
        if (path.startsWith(adminPath)) {
            if (path !== "/admin/login") {
                navigate("/admin/login");
                return;
            }
        }
        navigate("/auth/login");
        return;
    }

    // 인증 되고 /auth 페이지로 이동 시에는 /으로 이동
    if (authState && path.startsWith(authPath)) {
        navigate("/");
        return;
    }

    // 인증 되고 /auth가 아닌 페이지로 이동 시
    if (authState && !path.startsWith(authPath)) {
        // /admin 페이지로 이동
        if (path.startsWith(adminPath)) {
            // 관리자 권한이 있으면
            if (isAdmin) {
                // /admin/login 페이지로 이동시 /admin/dashboard 페이지로 이동
                if (path === "/admin/login") {
                    navigate("/admin/dashboard");
                    return;
                }
                // /admin 페이지로 이동 시 그대로 이동
                return element;
            }
            // 관리자 권한이 없으면
            if (isUserAndOwner) {
                navigate("/");
                return;
            }
            // /admin 페이지가 아닌 곳으로 이동 시 그대로 이동
        }
        return element;
    }
    return element;
};

export default AuthRoute;
