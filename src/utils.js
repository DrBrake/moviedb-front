export const getAppWidth = () => {
  return parseInt(
    window
      .getComputedStyle(document.getElementById("app"))
      .getPropertyValue("width")
  );
};
