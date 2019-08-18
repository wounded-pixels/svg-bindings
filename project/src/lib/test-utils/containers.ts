export const createResizableDiv = (
  minWidth: number = 200,
  minHeight: number = 200,
  width: number = 300,
  height: number = 300,
  maxWidth: number = 400,
  maxHeight: number = 400
): HTMLElement => {
  const div = document.createElement('div');
  div.style.minWidth = `${minWidth}px`;
  div.style.minHeight = `${minHeight}px`;
  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  div.style.maxWidth = `${maxWidth}px`;
  div.style.maxHeight = `${maxHeight}px`;
  div.style.border = `1px solid black`;
  div.style.resize = `both`;
  div.style.overflow = `hidden`;

  return div;
};
