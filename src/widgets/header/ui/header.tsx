import "./header.scss";
import "/src/shared/style/link.scss";
import logoUrl from "/src/shared/asset/headerLogo.png";
// import { Button } from "/src/shared/ui/Button";
import { Link } from "react-router-dom";
import loginUrl from "/src/shared/asset/login.png";
import { Button } from "@/shared/ui/Button";

export const Header = ({ isLogin, onLogin }: HeaderProps) => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header--wrap">
          <div className="header__logo">
            <img
              src={logoUrl}
              alt="Panda Market Main Logo"
              className="header__logo-image"
            />
            <Link to="/" className="link header__text">
              판다마켓
            </Link>
          </div>
          <div className="header__nav--wrap">
            <Link
              to="/freeBoard"
              className="link header__nav header__nav--not-active"
            >
              자유게시판
            </Link>
            <Link to="/market" className="link header__nav header__nav--active">
              중고마켓
            </Link>
          </div>
        </div>
        {isLogin ? (
          <img src={loginUrl} />
        ) : (
          // <Link to="/login" className="link">
          <Button
            classNames={["button--small", "button--blue", "button"]}
            onClick={() => {
              onLogin(true);
            }}
            value="로그인"
          />
          // </Link>
        )}
      </div>
    </header>
  );
};
