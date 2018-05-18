const fs = require('fs');

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
    });
});

const writeFile = (path, data, opts = 'utf8') =>
    new Promise((res, rej) => {
        fs.writeFile(path, data, opts, (err) => {
        if (err) rej(err)
        else res()
    })
});

async function readJson(path) {
    let str =  await readFile(path);
    return JSON.parse(str.toString());
}

async function writeJson(path, data) {
    return await writeFile(path, JSON.stringify(data));
}

function existsSync(path){
    return fs.existsSync(path);
}

function createDirSync(path){
    return fs.mkdirSync(path);
}

module.exports = {
    readJson,
    writeJson,
    existsSync,
    createDirSync
}