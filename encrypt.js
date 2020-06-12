const crypto = require('crypto');
const fs = require('file-system');
const path = require('path');

function encryptStringWithRsaPublicKey (toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt({key:publicKey, padding : crypto.constants.RSA_PKCS1_PADDING}, buffer);
    return encrypted.toString("base64");
};

function decryptStringWithRsaPrivateKey(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {encryptStringWithRsaPublicKey,decryptStringWithRsaPrivateKey}