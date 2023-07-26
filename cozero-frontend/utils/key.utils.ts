export const onEnterPressed = (e: KeyboardEvent, callback: Function) => {
  if (e.key === "Enter") {
    callback();
  }
};
export const onEscapePressed = (e: KeyboardEvent, callback: Function) => {
  if (e.key === "Escape") {
    callback();
  }
};
