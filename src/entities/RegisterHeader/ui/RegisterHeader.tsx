import { Button } from "../../../shared/ui/Button";

import "./RegisterHeader.scss";
interface RegisterPage {
  active: boolean;
}

export function RegisterHeader({ active }: RegisterPage) {
  return (
    <header className="RegisterHeader">
      <h1>상품 등록하기</h1>
      <Button
        active={active}
        value="등록"
        classNames={["button--blue", "button--small"]}
      />
    </header>
  );
}
