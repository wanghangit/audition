/**
 * 
 * @param {HTMLElement} dom 
 * @param {Object} oldProps 
 * @param {Object} newProps 
 */
export function setProps(dom, oldProps, newProps) {
  for (const key in oldProps) {
    if (key !== "children") {
      if(newProps.hasOwnProperty(key)){
        setProp(dom, key, newProps[key])
      }else{
        dom.removeAttribute(key)
      }
    }
  }
  for (const key in newProps) {
    if (key !== "children") {
      if(!oldProps.hasOwnProperty(key)){
        setProp(dom, key, newProps[key]);
      }
    }
  }
}

/**
 *
 * @param {HTMLElement} dom
 * @param {String} key
 * @param {*} value
 */
function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value;
  } else if (key === "style") {
    for (const styleName in value) {
      dom.style[styleName] = value[styleName];
    }
  } else {
    dom.setAttribute(key, value);
  }
}
