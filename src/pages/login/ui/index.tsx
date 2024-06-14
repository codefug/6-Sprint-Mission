import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <div>
      안녕 난 로그인 화면
      <Link to="/signup">난 회원가입</Link>
    </div>
  );
}
