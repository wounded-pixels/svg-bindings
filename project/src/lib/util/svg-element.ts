export function createSvgElement(
  name: string,
  attributes: { [key: string]: string | null } = {},
  parent: Element | null = null
): SVGElement {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.keys(attributes).forEach((key: string) => {
    const value = attributes[key];
    if (value !== null) {
      element.setAttribute(key, value);
    }
  });

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}
