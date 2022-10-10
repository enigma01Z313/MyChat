function b2a64(str) {
  const res = [];
  for (i = 0; i < str.length; i++) {
    res.push(str.charCodeAt(i));
  }
  return res.join("-");
}

function a2b64(str) {
  const arr = str.split("-");
  let res = "";
  for (i of arr) {
    res += String.fromCharCode(i);
  }
  return res;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}