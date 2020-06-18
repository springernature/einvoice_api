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

function aesEncryption(jsonData, sek) {
    try
    {
        console.log(sek);
        const data = JSON.stringify(jsonData);
        const keyBytes = CryptoJs.enc.Base64.parse(sek.toString("base64")); 
        // var aEncryptWordArray = CryptoJs.AES.encrypt(data, keyBytes, {
        //     mode:CryptoJs.mode.ECB,
        //     padding:CryptoJs.pad.Pkcs7
        // });
        var aesEncryptor = CryptoJs.algo.AES.createEncryptor(keyBytes, {
            mode: CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        })

        var aEncryptWordArray = aesEncryptor.process(data);
        // var aEncryptWordArray1 = aesEncryptor.finalize();
        var aEncryptWordArray1 = aEncryptWordArray.concat(aesEncryptor.finalize());
        console.log(CryptoJs.enc.Base64.stringify(aEncryptWordArray))
        debugger;
        return CryptoJs.enc.Base64.stringify(aEncryptWordArray);
    }
    catch (error)
    {
        debugger;
      throw error;
    }
};


module.exports = {encryptStringWithRsaPublicKey,aesDecryption, aesEncryption}