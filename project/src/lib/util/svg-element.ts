export function createSvgElement(
  name: string,
  parent: Element | null,
  attributes: { [key: string]: string } = {},
  styles: { [key: string]: string } = {}
): SVGElement {
  const element: SVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    name
  );

  Object.keys(attributes).forEach((key: string) => {
    const value = attributes[key];
    element.setAttribute(key, value);
  });

  Object.keys(styles).forEach((key: string) => {
    const value = styles[key];
    const style: CSSStyleDeclaration = element.style;
    style.setProperty(key, value);
  });

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}

export function createResponsiveSvg(
  parent: Element,
  viewBox: { x: number; y: number; width: number; height: number } = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  }
) {
  const styles = {
    width: '100%',
    height: '100%',
    display: 'inline-block',
    paddingBottom: '100%',
    verticalAlign: 'middle',
    overflow: 'hidden',
  };
  const attributes = {
    viewBox: `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`,
    preserveAspectRatio: 'xMidYMid meet',
  };

  return createSvgElement('svg', parent, attributes, styles);
}
