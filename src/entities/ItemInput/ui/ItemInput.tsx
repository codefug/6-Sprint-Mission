// {
//   PLACEHOLDERLISTFORREGISTER.map((v, index) => (
//     <ItemInput name={v[0]} placeHolder={v[1]} type={v[2]} key={index} />
//   ));
// }
import { forwardRef, KeyboardEventHandler } from "react";
import "./ItemInput.scss";

interface ItemInputProps {
  className?: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ItemTextAreaProps {
  className?: string;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export function ItemInput({
  className = "styled",
  name,
  placeholder,
  type,
  onChange,
  value,
}: ItemInputProps) {
  return (
    <div className="ItemInput__card">
      <h2 className="ItemInput__subtitle">{value}</h2>
      <div>
        <input
          className={`ItemInput ItemInput--small ${className}`}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          type={type}
        />
      </div>
    </div>
  );
}

export const ItemTextArea = forwardRef<HTMLTextAreaElement, ItemTextAreaProps>(
  (
    {
      className = "styled",
      name,
      placeholder,
      onKeyDown,
      value,
    }: ItemTextAreaProps,
    ref
  ) => {
    return (
      <div className="ItemInput__card">
        <h2 className="ItemInput__subtitle">{value}</h2>
        <div>
          <textarea
            className={`ItemInput ItemInput--big ${className}`}
            name={name}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            ref={ref}
          ></textarea>
        </div>
      </div>
    );
  }
);
