function parseParam(url) {
  let res = {};
  if (typeof url !== "string") {
    console.error("url is not a string");
    return res;
  }
  const index = url.indexOf("?");
  if (index === -1) {
    return res;
  }
  const search = url.slice(index + 1);
  search.split("&").forEach((v) => {
    let [key, value] = v.split("=");
    value = decodeURIComponent(value);
    if (/^\d+/.test(value)) {
      value = Number(value);
    }
    if (!res[key]) {
      res[key] = value;
    } else if (
      res[key] &&
      Object.prototype.toString.call(res[key]) !== "[object Array]"
    ) {
      res[key] = [res[key], value];
    } else {
      res[key].push(value);
    }
  });
  return res;
}

var url = "https://www.baidu.com/s?wd=object.create()&rsv_spt=1&rsv_spt=2&rsv_iqid=0xec5de0ec0008480f&issp=1&f=3&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&rsv_dl=ts_3&oq=%25E6%258E%2598%25E9%2587%2591&rsv_btype=t&inputT=11237&rsv_t=73aeZuX14DZTI3KA5iO3A2BnC53j%2FzRgxxwlrKYdiBGovzVHSmoOhSUMyCo%2BtZHXsOLK&rsv_pq=c1609aef0008d917&rsv_sug3=31&rsv_sug1=26&rsv_sug7=100&rsv_sug2=0&prefixsug=Object.create&rsp=3&rsv_sug4=11237"
console.log(parseParam(url))