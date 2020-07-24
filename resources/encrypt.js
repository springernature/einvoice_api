const crypto = require('crypto');
const fs = require('file-system');
const path = require('path');
const CryptoJs = require('crypto-js');

function encryptStringWithRsaPublicKey (toEncrypt, publicKey) {
    var key = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt({key:key, padding : crypto.constants.RSA_PKCS1_PADDING}, buffer);
    return encrypted.toString("base64");
};

function aesDecryption(encryptedText, secretKey, bParse) {
    try
    {
        const keyBytes = CryptoJs.enc.Base64.parse(secretKey.toString("base64")); 
        var oDecryptedData;
        var aDecryptWordArray = CryptoJs.AES.decrypt(encryptedText, keyBytes, {
            mode:CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        });
        if(!bParse){
            oDecryptedData = CryptoJs.enc.Base64.stringify(aDecryptWordArray);
        }else{
            oDecryptedData = JSON.parse(CryptoJs.enc.Utf8.stringify(aDecryptWordArray));   
        }
        return oDecryptedData;
    }
    catch (error)
    {
      throw error;
    }
};

function aesEncryption(jsonData, sek) {
    try
    {
        let data = JSON.stringify(jsonData);
        // Step1 - Convert data to WordAray
        let wdData = CryptoJs.enc.Utf8.parse(data)

        // Step2 - Get the word array of Sek
        const keyBytes = CryptoJs.enc.Base64.parse(sek.toString("base64"));
        
        // Step3 - Create AES encryptor and encrypt the data
        var aesEncryptor = CryptoJs.algo.AES.createEncryptor(keyBytes, {
            mode: CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        })
        var aEncryptWordArray = aesEncryptor.process(wdData);
        var aEncryptWordArray1 = aEncryptWordArray.concat(aesEncryptor.finalize());

        // Step4 - Convert the encoded data to base64 string
        return CryptoJs.enc.Base64.stringify(aEncryptWordArray1);
    }
    catch (error)
    {
      throw error;
    }
};

function aesDataDecryption(encryptedData, sek) {
    try
    {
        const keyBytes = CryptoJs.enc.Base64.parse(sek.toString("base64")); 
        var aDecryptWordArray = CryptoJs.AES.decrypt(encryptedData, keyBytes, {
            mode:CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        });
        var oDecryptedData = JSON.parse(CryptoJs.enc.Utf8.stringify(aDecryptWordArray));
        return oDecryptedData;
    }
    catch (error)
    {
      throw error;
    }
}


module.exports = {encryptStringWithRsaPublicKey, aesDecryption, aesEncryption, aesDataDecryption}