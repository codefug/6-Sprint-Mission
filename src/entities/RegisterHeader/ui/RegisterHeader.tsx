import { Button } from "../../../shared/ui/Button";

import "./RegisterHeader.scss";

export function RegisterHeader({ active }) {
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
