import { getToken } from "@/shared/api";
import { setCookie } from "@/shared/lib/login";

export default function LoginPage() {
  const handleClick = () => {
    (async () => {
      const token = await getToken();
      setCookie("accessToken", token.accessToken, { secure: true });
    })();
  };
  return <button onClick={handleClick}>로그인 완성</button>;
}
