// {
//   PLACEHOLDERLISTFORREGISTER.map((v, index) => (
//     <ItemInput name={v[0]} placeHolder={v[1]} type={v[2]} key={index} />
//   ));
// }
import { KeyboardEventHandler } from "react";
import "./ItemInput.scss";

interface ItemInputProps {
  className: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>;
}

export function ItemInput({
  className = "styled",
  name,
  placeholder,
  type,
  onChange,
  onKeyDown,
  value,
}: ItemInputProps) {
  return (
    <div className="ItemInput__card">
      <h2 className="ItemInput__subtitle">{value}</h2>
      <div>
        {type !== "textarea" ? (
          <input
            className={`ItemInput ItemInput--small ${className}`}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
          />
        ) : (
          <textarea
            className={`ItemInput ItemInput--big ${className}`}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
          ></textarea>
        )}
      </div>
    </div>
  );
}
