import { KeyboardEvent } from "react";

export enum KeyboardKeys {
  ENTER = "Enter",
  ESCAPE = "Escape",
}

export function onKeyPressed(
  e: KeyboardEvent<any>,
  key: KeyboardKeys,
  callback: Function
) {
  if (e.key === key) callback();
}
