import { authInstance } from "../api/axios";
import { deleteRefreshToken, getRefreshToken, setRefreshToken } from "./token";
import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

// Refresh Token Rotation
export const refreshTokenRotation = () => {
  let accessToken: string | null = null;
  // accessToken 생성

  let expirationTime: number | null = null;
  // expirationTime 생성

  const setAccessToken = (at: string, et: number) => {
    // 접근 토큰 설정
    accessToken = at;
    expirationTime = et;
  };

  const deleteTokens = () => {
    // 초기화 후 리프레쉬 토큰 삭제
    accessToken = null;
    expirationTime = null;
    deleteRefreshToken();
  };

  const moveHome = () => {
    window.location.href = "/";
  };

  const isExpired = () => {
    const now = new Date().getTime();
    return (expirationTime as number) < now;
  };

  const getNewTokens = async () => {
    const refreshToken = getRefreshToken();
    // getRefreshToken으로 refreshToken 가져오기
    await authInstance
      .post("/auth/refresh-token", {
        refreshToken,
      })
      // refresh 요청, 토큰을 담아서
      .then((res) => {
        // 받은 응답으로 정보 저장
        const {
          data: { accessToken, expirationTime, refreshToken },
        } = res;
        setAccessToken(accessToken, expirationTime);
        setRefreshToken(refreshToken);
      })
      .catch(() => {
        // 안되면 로그인 만료되었다고 표현
        deleteTokens();
        alert("로그인이 만료 되었습니다.");
        moveHome();
      });
  };

  return {
    setAuthHeader: async function (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> {
      if (!accessToken || isExpired()) {
        await getNewTokens();
      }
      if (config !== undefined && config.headers !== undefined) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.error("axios config에 문제 발생");
      }
      return config;
    },
  };
};
