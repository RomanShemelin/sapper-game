import React from "react";

import "./Display.scss";

interface DisplayProps {
  value: number;
}

export default function Display({ value }: DisplayProps) {
  return <div className={"Display"}>{value.toString().padStart(3, "0")}</div>;
}
