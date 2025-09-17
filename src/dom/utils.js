function styleAsNumber(el, style) {
  return Number(getComputedStyle(el)[style][0]);
}

function getPaddingXY(el) {
  const top = styleAsNumber(el, 'paddingTop');
  const bottom = styleAsNumber(el, 'paddingTop');
  const left = styleAsNumber(el, 'paddingLeft');
  const right = styleAsNumber(el, 'paddingRight');
  return [left + right, top + bottom];
}

function getBorderXY(el) {
  const top = styleAsNumber(el, 'borderTopWidth');
  const bottom = styleAsNumber(el, 'borderBottomWidth');
  const left = styleAsNumber(el, 'borderLeftWidth');
  const right = styleAsNumber(el, 'borderRightWidth');
  return [left + right, top + bottom];
}

function outerXY(el) {
  const [bx, by] = getBorderXY(el);
  const [px, py] = getPaddingXY(el);
  return [bx + px, by + py]
}

export function getInnerSize(el) {
  const [outerX, outerY] = outerXY(el);
  const width = el.clientWidth - outerX;
  const height = el.clientHeight - outerY;
  return [width, height];
}
