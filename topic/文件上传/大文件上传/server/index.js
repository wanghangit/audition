const http = require("http");
const fs_extra = require("fs-extra");
const path = require("path");
const multiparty = require("multiparty");

const UPLOAD_DIR = path.resolve(__dirname, "./upload");
const server = http
  .createServer((req, res) => {
    const url = req.url;
    if (/favicon.ico/.test(url)) {
      return;
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.status = 200;
      res.end();
      return;
    }
    handleUrl(url, req, res);
  })
  .listen(3000);

function handleUrl(url, req, res) {
  if (/upload/.test(url)) {
    upload(req, res);
  } else if (/merge/.test(url)) {
    merge(req, res);
  }
}

async function upload(req, res) {
  const multipartyForm = new multiparty.Form();
  multipartyForm.parse(req, async (err, fields, files) => {
    if (err) return;
    // console.log(`fields:`,fields)
    // console.log(`fies:`,files)
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = `${UPLOAD_DIR}/${filename}`;
    if (!fs_extra.existsSync(chunkDir)) {
      fs_extra.mkdirsSync(chunkDir);
    }
    await fs_extra.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received chunk");
  });
}

async function merge(req, res) {
  let getData = async () => {
    return new Promise(resolve => {
      let chunk = "";
      req.on("data", data => {
        chunk += data;
      });
      req.on("end", () => {
        resolve(JSON.parse(chunk));
      });
    });
  }
  let data = await getData();
  const filename = data.filename;
  const filepath = `${UPLOAD_DIR}/11${filename}`;
  await mergeFile(filepath, filename);
  res.end();
}

async function mergeFile(filepath, filename) {
  const chunkDir = `${UPLOAD_DIR}/${filename}`;
  const chunkPaths = await fs_extra.readdir(chunkDir);
  console.log(filepath)
  await fs_extra.writeFile(filepath, "");
  chunkPaths.forEach(chunkPath => {
    fs_extra.appendFileSync(filepath, fs_extra.readFileSync(`${chunkDir}/${chunkPath}`));
    fs_extra.unlinkSync(`${chunkDir}/${chunkPath}`);
  });
  fs_extra.rmdirSync(chunkDir); // 合并后删除保存切片的
}
