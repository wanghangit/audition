function roat(arr, k) {
  var n = arr.length;
  k = k % n;
  var prev = arr.slice(n-k)
  var hou = arr.slice(0, n-k)
  return [...prev,...hou];
}

console.log(roat([1, 2, 3, 4, 5, 6, 7],3))