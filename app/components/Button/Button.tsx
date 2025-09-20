import React from "react";
type Props = {
  value: string;
  className: string;
  typeBtn: "button" | "submit" | "reset";
};

const Button = ({ value, className, typeBtn }: Props) => {
  return (
    <button type={typeBtn} className={className}>
      {value}
    </button>
  );
};

export default Button;
