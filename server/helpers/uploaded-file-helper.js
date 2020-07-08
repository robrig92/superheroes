"use strict";
const fs = require('fs');
const path = require('path');
var appRoot = require('app-root-path');

const upload = async (filePath, file) => {
    const relativePath = filePath;
    const uploadsPath = path.join(appRoot.path, relativePath);
    await file.mv(uploadsPath);

    return relativePath;
}

const destroy = async (filePath) => {
    try {
        fs.unlinkSync(filePath);
    } catch (ex) {
        console.log(ex)
    }
}

module.exports = {
    upload,
    destroy
}
