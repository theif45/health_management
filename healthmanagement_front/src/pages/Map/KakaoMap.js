/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import Header from "../../components/Main/Header/Header";
import Footer from "../../components/Main/Footer/Footer";

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
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

const mapStyle = css`
    width: 100%;
    height: 100%;
`;

const myLocationCircle = css`
    width: 20px;
    height: 20px;
`;

const OverLay = css`
    position: relative;
    text-align: center;
    bottom: 50px;
    max-width: 150px;
    height: 26px;
    padding: 4px 10px;
    border-radius: 20px;
    background-color: #58595b;
    cursor: pointer;
`;

const mapMarkerOverLay = css`
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: white;
    &::after {
        content: "";
        position: absolute;
        top: 26px;
        right: 50%;
        border-width: 5px;
        border-style: solid;
        transform: translateX(50%);
        border-color: #58595b transparent transparent;
    }
`;

const KaKaoMap = () => {
    const { kakao } = window;
    const [state, setState] = useState({
        center: { lat: 33.450701, lng: 126.570667 },
        errMsg: null,
        isLoading: true,
    });
    const [myCenter, setMyCenter] = useState("");
    const [nearLatLngNames, setNearLatLngNames] = useState([]);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    const searchAddrFromCoords = (coords, callback) => {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.lng, coords.lat, callback);
    };

    const fetchNearbyGymAddress = useQuery(
        ["searchNearbyAddress"],
        async () => {
            const option = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                params: {
                    myAddress: myCenter,
                },
            };
            try {
                const response = await axios.get("http://localhost:8080/gyms/locations", option);
                setNearLatLngNames([]);
                response.data.gymData.forEach((gym) => {
                    geocoder.addressSearch(gym.gymAddress, (result, status) => {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                            const { Ma, La } = new kakao.maps.LatLng(result[0].y, result[0].x);
                            // 결과값으로 받은 위치를 상태에 저장합니다
                            setNearLatLngNames((prevState) => [
                                ...prevState,
                                { lat: Ma, lng: La, gymName: gym.gymName },
                            ]);
                        }
                    });
                });
                console.log(response);
                return response;
            } catch (error) {
                return error;
            }
        },
        {
            enabled: !state.isLoading && !!myCenter,
            onSuccess: (response) => {
                // useQuery가 한번 실행되고 다시 enable을 false로 변경하여 요청을 막아서 반복되지 않도록 함
                setState({
                    ...state,
                    isLoading: true,
                });
            },
        }
    );

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }));
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                    }));
                }
            );
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState((prev) => ({
                ...prev,
                errMsg: "geolocation을 사용할수 없어요..",
                isLoading: false,
            }));
        }
    }, []);

    if (!state.isLoading) {
        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(state.center, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address_name.split(" ")[1] + " " + result[0].address_name.split(" ")[2];
                setMyCenter(address);
            }
        });
    }

    if (fetchNearbyGymAddress.isLoading) {
        return <></>;
    }

    return (
        <div css={container}>
            <Header search={false} />
            <main css={main}>
                <Map css={mapStyle} center={state.center} level={3} maxLevel={5}>
                    <CustomOverlayMap position={state.center}>
                        <div css={myLocationCircle}>
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="15" cy="15" r="15" fill="#F83838">
                                    <animate
                                        attributeName="opacity"
                                        from="0.2"
                                        to="0.5"
                                        dur="1s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                                <g>
                                    <circle cx="15" cy="15" r="4.75" fill="white" />
                                    <circle cx="15" cy="15" r="4" fill="#F83838" />
                                </g>
                            </svg>
                        </div>
                    </CustomOverlayMap>
                    {nearLatLngNames.map((nearLatLngName, index) => (
                        <>
                            <MapMarker
                                key={index}
                                position={nearLatLngName}
                                image={{
                                    src: "images/health.png",
                                    size: {
                                        width: 24,
                                        height: 35,
                                    },
                                }}
                            />
                            <CustomOverlayMap position={nearLatLngName}>
                                <div css={OverLay}>
                                    <div css={mapMarkerOverLay}>
                                        {state.errMsg ? state.errMsg : nearLatLngName.gymName}
                                    </div>
                                </div>
                            </CustomOverlayMap>
                        </>
                    ))}
                </Map>
            </main>
            <Footer />
        </div>
    );
};

export default KaKaoMap;
