class BigFile {
  constructor(files, size) {
    this.files = files;
    this.name = files.name;
    this.size = size;
    this.data = [];
    this.cutFile();
  }
  cutFile() {
    let len = this.files.size;
    let chunkSize = Math.ceil(len / this.size);
    let cur = 0;
    while (cur < len) {
      this.data.push({ file: this.files.slice(cur, (cur = cur + chunkSize)) });
    }
  }
  upload(url) {
    this.requestList = this.data
      .map(({file}, index) => {
        return {
          chunk: file,
          hash: this.name + "-" + index
        };
      })
      .map(({ chunk, hash }) => {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", this.name);
        return formData;
      })
      .map(data => {
        return request({
          url,
          data: data
        });
      });
    Promise.all(this.requestList)
      .then(res => {
        return request({
          url: "http://localhost:3000/merge",
          headers: {
            "content-type": 'application/json'
          },
          data: JSON.stringify({
            filename: this.name
          })
        });
      })
      .then(res => {
        console.log(res)
      });
    console.log(this.requestList);
  }
}

function request({ url, method = "POST", data, onProgress = e => e, headers = {} }) {
  return new Promise(resolve => {
    const ajax = new XMLHttpRequest();
    ajax.open(method, url);
    Object.keys(headers).forEach(key => {
      ajax.setRequestHeader(key, headers[key]);
    });
    ajax.send(data);
    ajax.upload.onprogress = onProgress
    ajax.onload = function(result) {
      resolve(result);
    };
  });
}

window.onload = function() {
  const $file = document.querySelector(".file");
  const $btn = document.querySelector(".btn");
  const files = null;
  const url = "http://localhost:3000/upload";
  $file.addEventListener("input", function(e) {
    console.log(e);
    const bigFile = new BigFile(e.target.files[0], 10);
    bigFile.upload(url);
  });
};
