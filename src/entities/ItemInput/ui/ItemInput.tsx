// {
//   PLACEHOLDERLISTFORREGISTER.map((v, index) => (
//     <ItemInput name={v[0]} placeHolder={v[1]} type={v[2]} key={index} />
//   ));
// }
import "./ItemInput.scss";

export function ItemInput({
  className = "styled",
  name,
  placeholder,
  type,
  onKeyPress = null,
  onChange = null,
  value,
}) {
  const props = onKeyPress
    ? { name, placeholder, type, onKeyPress, onChange }
    : { name, placeholder, type, onChange };

  return (
    <div className="ItemInput__card">
      <h2 className="ItemInput__subtitle">{value}</h2>
      <div>
        {type !== "textarea" ? (
          <input
            className={`ItemInput ItemInput--small ${className}`}
            {...props}
          />
        ) : (
          <textarea
            className={`ItemInput ItemInput--big ${className}`}
            {...props}
          ></textarea>
        )}
      </div>
    </div>
  );
}
