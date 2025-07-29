import React from "react";
import "../../sass/components/formContainer.scss";
interface propFormContainer {
  children: string[] | string | React.JSX.Element | React.JSX.Element[];
}

export default function FormContainer({ children }: propFormContainer) {
  return <div className="formContainer">{children}</div>;
}
