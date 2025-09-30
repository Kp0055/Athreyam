import React from "react";

const Button = ({ text, customClass }: { text: string; customClass: string }) => (
  <button className={`p-2 w-60 rounded-full mt-2 ${customClass}`}>{text}</button>
);

export default Button;
