var cors = require('cors');
const axios = require('./resources/axios.js');
const express = require('express');
const app = express();
const encrypt = require('./resources/encrypt.js')
const crypto = require('crypto');
const getJSON = require('./configuration/getjson.js')
const config = require('./configuration/dataconfig'); 
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000; //Setting environment port or taking 7300 if port not available

app.get('/api', (req, res) => {
    res.status(200).json({
        Status: "Success",
        Message: "APIs are running... ",
    });
})

app.post('/api/auth', async (req, res) => {
    try {
        let aData = req.body;
        let aResponse = [];
        for (let i = 0; i < aData.length; i++) {
            let oData = aData[i];
            let authSchema = config.authSchema();
            let user = oData.USERNAME;
            let errorDtls = {
                errorFlag : false,
                key:""
            };
            let oResponse = {};
            oResponse.UserName = oData.USERNAME;

            //Validate all the data
            for (const key in authSchema) {
                if (authSchema.hasOwnProperty(key)) {
                    if(!oData[key]){
                        errorDtls.errorFlag = true;
                        errorDtls.key = key;
                        break;
                    }
                }
            }
            if(!errorDtls.errorFlag){
                oData.PUBLICKEY3 = oData.PUBLICKEY3 ? oData.PUBLICKEY3 : ""; 
                let sPublicKey = oData.PUBLICKEY1 ? oData.PUBLICKEY1 + oData.PUBLICKEY2 + oData.PUBLICKEY3 : null; 
                let sEncryptedPwd = encrypt.encryptStringWithRsaPublicKey(oData.PASSWORD, sPublicKey);
                let sAppKey = crypto.randomBytes(32);
                let sEncryptedAppKey = encrypt.encryptStringWithRsaPublicKey(sAppKey, sPublicKey);
                let oHeaders = {
                    "client_id": oData.CLIENT_ID,
                    "client_secret": oData.CLIENT_SECRET
                }
                let oPayload = {
                    "data": {
                        "UserName": oData.USERNAME,
                        "Password": sEncryptedPwd,
                        "AppKey": sEncryptedAppKey,
                        "ForceRefreshAccessToken": false
                    }
                }
                let { data } = await axios.post("/gstvital/v1.02/auth", oPayload, { headers: oHeaders });
                if(data.Data){
                    data.Data.Sek = encrypt.aesDecryption(data.Data.Sek, sAppKey, false);
                }
                oResponse.Response = data;
            } else{
                oResponse.Response = 'Value for '+errorDtls.key+' could not be found for user '+ user+'.'
            } 
            aResponse.push(oResponse); 
        }
        res.status(200).json({Responses: aResponse})
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.post('/api/irn/create', async (req, res) => {
    try {
        let oData = req.body,
            oHeader = req.headers,
            aResponse = [];
        for (let i = 0; i < oData.length; i++) {
            let reqData = oData[i];
            let mode = "CREATE";
            let oItem = getJSON.formatData(reqData, mode);
            let oResponse = {};
            let sEncryptedData = encrypt.aesEncryption(oItem, oHeader.sek);
            oResponse.doc_no = oItem.DocDtls.No;
            let oHeaders = {
                "client_id": oHeader.client_id,
                "client_secret": oHeader.client_secret,
                "Gstin": oHeader.gstin,
                "user_name": oHeader.user_name,
                "AuthToken": oHeader.authtoken
            };
            var oPayload = {
                "Data": sEncryptedData
            };
            let { data } = await axios.post("/gstcore/v1.02/Invoice", oPayload, { headers: oHeaders });
            oResponse.res = data;
            if (!data.ErrorDetails) {
                let oDecryptedData = encrypt.aesDecryption(data.Data, oHeader.sek, true);
                oResponse.StatusText = "The document has been successfully posted!";
                oResponse.res.Data = oDecryptedData;
            }else{
                oResponse.StatusText = "The request went in error at IRP portal. Check the error logs in ErrorDetails.";
            }
            aResponse.push(oResponse);
        }
        res.status(200).json({
            Message: aResponse,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.post('/api/irn/fetch', async (req, res) => {
    try {
        let aData = req.body,
        oHeader = req.headers,
        aResponse = [],
        oHeaders = {
            "client_id": oHeader.client_id,
            "client_secret": oHeader.client_secret,
            "Gstin": oHeader.gstin,
            "user_name": oHeader.user_name,
            "AuthToken": oHeader.authtoken
        };
        
    for (let i = 0; i < aData.length; i++) {
        let oData = aData[i];
        let sIrn = oData.IRN_NO,
            oResponse = {};
        oResponse.doc_no = oData.NO;
        const { data } = await axios.get('gstcore/v1.02/Invoice/irn/' + sIrn, { headers: oHeaders });
        oResponse.res = data;
        if (!data.ErrorDetails) {
            oDecryptedData = encrypt.aesDecryption(data.Data, oHeader.sek, true);
            oResponse.StatusText = "The Request was successful!";
            oResponse.res.Data = oDecryptedData;
        }else{
            oResponse.StatusText = "The request went in error at IRP portal. Check the error logs in ErrorDetails.";
        }
        aResponse.push(oResponse);
    }
        res.status(200).json({
            Message: aResponse,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})


app.post('/api/irn/cancel', async (req, res) => {
    try {
        let oData = req.body,
            oHeader = req.headers,
            aResponse = [];
        for (let i = 0; i < oData.length; i++) {
            let oItem = {};
            let oResponse = {};
            let sMode = "CANCEL"
            oResponse.doc_no = oData[i].NO;
            oItem = getJSON.formatData(oData[i], sMode)

            let sEncryptedData = encrypt.aesEncryption(oItem, oHeader.sek);
            let oHeaders = {
                "client_id": oHeader.client_id,
                "client_secret": oHeader.client_secret,
                "Gstin": oHeader.gstin,
                "user_name": oHeader.user_name,
                "AuthToken": oHeader.authtoken
            };
            var oPayload = {
                "Data": sEncryptedData
            };
            let { data } = await axios.post("/gstcore/v1.02/Invoice/Cancel", oPayload, { headers: oHeaders });
            oResponse.res = data;
            if (!data.ErrorDetails) {
                oDecryptedData = encrypt.aesDecryption(data.Data, oHeader.sek, true);
                oResponse.StatusText = "The IRN was successfully cancelled!";
                oResponse.res.Data = oDecryptedData;
            }else{
                oResponse.StatusText = "The request went in error at IRP portal. Check the error logs in ErrorDetails.";
            }
            aResponse.push(oResponse);
        }
        res.status(200).json({
            Message: aResponse,
        })
    } catch (error) {
        res.status(400).json({
            Status: "Error",
            Message: error,
        })
    }
})

app.post("/api/ewaybill/create", (req, res)=>{
    let aData = req.body,
    oHeader = req.headers,
    aResponse = [];

    for (let i = 0; i < aData.length; i++) {
        let oData = {};
        let oItem = {};
        let oResponse = {};
        
    }
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});