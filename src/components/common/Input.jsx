export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="form-control">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
