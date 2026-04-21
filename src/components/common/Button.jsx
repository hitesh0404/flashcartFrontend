export default function Button({ children, variant = "primary", ...rest }) {
  const className = `btn btn-${variant}`;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
