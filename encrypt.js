const crypto = require('crypto');
const fs = require('file-system');
const path = require('path');
const CryptoJs = require('crypto-js');

function encryptStringWithRsaPublicKey (toEncrypt, publicKey, filepath) {
    if(filepath){
        var absolutePath = path.resolve(filepath);
        publicKey = fs.readFileSync(absolutePath, "utf8");
    }
    var key = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt({key:key, padding : crypto.constants.RSA_PKCS1_PADDING}, buffer);
    return encrypted.toString("base64");
};

function aesDecryption(encryptedText, appkey) {
    try
    {
        const keyBytes = CryptoJs.enc.Base64.parse(appkey.toString("base64")); 
        var aDecryptWordArray = CryptoJs.AES.decrypt(encryptedText, keyBytes, {
            mode:CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        });
        var decryptedMessage = CryptoJs.SHA256(aDecryptWordArray);
        return decryptedMessage.toString(CryptoJs.enc.Base64)
    }
    catch (error)
    {
        debugger;
      throw error;
    }
};


module.exports = {encryptStringWithRsaPublicKey,aesDecryption}