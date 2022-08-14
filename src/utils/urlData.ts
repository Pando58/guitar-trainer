export const path = window.location.pathname
  .split("/")
  .filter((i) => i !== "")
  .slice(1);
