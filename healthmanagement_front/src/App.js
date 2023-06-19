import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import Main from "./pages/Main/Main";
import MyPage from "./pages/MyPage/MyPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FindId from "./pages/Find/Id/FindId";
import FindPassword from "./pages/Find/Password/FindPassword";
import AuthRoute from "./components/Routes/AuthRoute/AuthRoute";
import ModifyPage from "./pages/MyPage/ModifyPage";
import PasswordUpdate from "./pages/MyPage/PasswordUpdate";
import FacilityReq from "./pages/MyPage/FacilityReq/FacilityReq";
import GymDetail from "./pages/GymDetail/GymDetail";
import LikeList from "./pages/LikeList/LikeList";
import KaKaoMap from "./pages/Map/KakaoMap";
import MyCalory from "./pages/MyCalory/MyCalory";
import OAuth2Register from "./pages/Register/OAuth2Register";
import OAuth2Login from "./pages/Login/OAuth2Login";
import AddGymList from "./pages/AddGymList/AddGymList";
import OAuth2Merge from "./pages/OAuth2Merge/OAuth2Merge";
import Shop from "./pages/Shop/Shop";
import ForgotPassword from "./pages/Find/Password/ForgotPassword";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import GymManagement from "./pages/Admin/GymManagement/GymManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";

function App() {
    return (
        <>
            <Global styles={Reset} />
            <Routes>
                <Route path="/auth/login" element={<AuthRoute path="/auth/login" element={<Login />} />} />
                <Route
                    path="/auth/oauth2/login"
                    element={<AuthRoute path={"/auth/oauth2/login"} element={<OAuth2Login />} />}
                />
                <Route path="/auth/register" element={<AuthRoute path="/auth/register" element={<Register />} />} />
                <Route
                    path="/auth/oauth2/register"
                    element={<AuthRoute path={"/auth/oauth2/register"} element={<OAuth2Register />} />}
                />
                <Route
                    path="/auth/oauth2/merge"
                    element={<AuthRoute path={"/auth/oauth2/merge"} element={<OAuth2Merge />} />}
                />
                <Route
                    path="/auth/forgot/username"
                    element={<AuthRoute path="/auth/forgot/username" element={<FindId />} />}
                />
                <Route
                    path="/auth/forgot/password"
                    element={<AuthRoute path="/auth/forgot/password" element={<FindPassword />} />}
                />
                <Route
                    path="/auth/forgot/password/change"
                    element={<AuthRoute path="/auth/forgot/password/change" element={<ForgotPassword />} />}
                />
                <Route path="/" element={<AuthRoute path="/" element={<Main />} />} />
                <Route path="/:userId/mypage" element={<AuthRoute path="/:userId/mypage" element={<MyPage />} />} />
                <Route
                    path="/:userId/mypage/modify"
                    element={<AuthRoute path="/:userId/mypage/modify" element={<ModifyPage />} />}
                />
                <Route
                    path="/:user/mypage/passwordupdate"
                    element={<AuthRoute path="/:user/mypage/passwordupdate" element={<PasswordUpdate />} />}
                />
                <Route path="/gym/:gymId" element={<AuthRoute path="/gym" element={<GymDetail />} />} />
                <Route
                    path="/:userId/upload/mygym"
                    element={<AuthRoute path="/:userId/upload/mygym" element={<FacilityReq />} />}
                />
                <Route path="/:userId/mygyms" element={<AuthRoute path="/:userId/mygyms" element={<AddGymList />} />} />
                <Route path="/myCalory" element={<AuthRoute path="/myCalory" element={<MyCalory />} />} />
                <Route
                    path="/gym/:userId/like/list"
                    element={<AuthRoute path="/gym/:userId/like/list" element={<LikeList />} />}
                />
                <Route path="/location/gyms" element={<AuthRoute path="/location/gyms" element={<KaKaoMap />} />} />
                <Route path="/shop" element={<AuthRoute path="/shop" element={<Shop />} />} />
                <Route path="/admin/login" element={<AuthRoute path="/admin/login" element={<AdminLogin />} />} />
                <Route
                    path="/admin/dashboard"
                    element={<AuthRoute path="/admin/dashboard" element={<Dashboard />} />}
                />
                <Route path="/admin/gyms" element={<AuthRoute path="/admin/gyms" element={<GymManagement />} />} />
                <Route path="/admin/users" element={<AuthRoute path="/admin/users" element={<UserManagement />} />} />
            </Routes>
        </>
    );
}

export default App;
