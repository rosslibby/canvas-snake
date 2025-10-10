function styleAsNumber(
  el: HTMLElement,
  style: keyof CSSStyleDeclaration,
) {
  const value = getComputedStyle(el)[style as keyof CSSStyleDeclaration]

  if (Array.isArray(value)) {
    return Number(value[0])
  } else {
    return Number(value)
  }
}

function getPaddingXY(el: HTMLElement) {
  const top = styleAsNumber(el, 'paddingTop');
  const bottom = styleAsNumber(el, 'paddingTop');
  const left = styleAsNumber(el, 'paddingLeft');
  const right = styleAsNumber(el, 'paddingRight');
  return [left + right, top + bottom];
}

function getBorderXY(el: HTMLElement) {
  const top = styleAsNumber(el, 'borderTopWidth');
  const bottom = styleAsNumber(el, 'borderBottomWidth');
  const left = styleAsNumber(el, 'borderLeftWidth');
  const right = styleAsNumber(el, 'borderRightWidth');
  return [left + right, top + bottom];
}

function outerXY(el: HTMLElement) {
  const [bx, by] = getBorderXY(el);
  const [px, py] = getPaddingXY(el);
  return [bx + px, by + py]
}

export function getInnerSize(el: HTMLElement) {
  const [outerX, outerY] = outerXY(el);
  const width = el.clientWidth - outerX;
  const height = el.clientHeight - outerY;
  return [width, height];
}
