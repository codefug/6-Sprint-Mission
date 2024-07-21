// {
//   PLACEHOLDERLISTFORREGISTER.map((v, index) => (
//     <ItemInput name={v[0]} placeHolder={v[1]} type={v[2]} key={index} />
//   ));
// }
import { forwardRef, KeyboardEventHandler } from "react";
import "./ItemInput.scss";

interface ItemInputProps {
  className?: string;
  placeholder: string;
  type: string;
  name?: string;
  id: string;
  value: string;
  registerData: object;
}

interface ItemTextAreaProps {
  className?: string;
  name: string;
  id: string;
  placeholder: string;
  type: string;
  value: string;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export function ItemInput({
  className = "styled",
  placeholder,
  name = "",
  type,
  id,
  registerData,
  value,
}: ItemInputProps) {
  return (
    <div className="ItemInput__card">
      <label id={id} className="ItemInput__subtitle">
        {value}
      </label>
      <div>
        <input
          className={`ItemInput ItemInput--small ${className}`}
          placeholder={placeholder}
          {...registerData}
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
      id,
      placeholder,
      onKeyDown,
      value,
    }: ItemTextAreaProps,
    ref
  ) => {
    return (
      <div className="ItemInput__card">
        <label className="ItemInput__subtitle" id={id}>
          {value}
        </label>
        <div>
          <textarea
            className={`ItemInput ItemInput--big ${className}`}
            name={name}
            placeholder={placeholder}
            ref={ref}
            onKeyDown={onKeyDown}
          ></textarea>
        </div>
      </div>
    );
  }
);
