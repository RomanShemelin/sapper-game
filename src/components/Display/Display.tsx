import React from "react";

import styles from "./Display.module.scss";

interface DisplayProps {
  value: number;
}

export default function Display({ value }: DisplayProps) {
  return (
    <div className={styles.display}>{value.toString().padStart(3, "0")}</div>
  );
}
