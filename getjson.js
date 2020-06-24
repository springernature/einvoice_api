
function documentSchema() {
    return {
        "Version": null,
        "TranDtls": {
            "TaxSch": null,
            "SupTyp": null,
            "RegRev": null,
            "EcmGstin": null
        },
        "DocDtls": {
            "Typ": null,
            "No": null,
            "Dt": null
        },
        "SellerDtls": {
            "Gstin": null,
            "LglNm": null,
            "TrdNm": null,
            "Addr1": null,
            "Addr2": null,
            "Loc": null,
            "Pin": null,
            "State": null,
            "Ph": null,
            "Em": null
        },
        "BuyerDtls": {
            "Gstin": null,
            "LglNm": null,
            "TrdNm": null,
            "Pos": null,
            "Addr1": null,
            "Addr2": null,
            "Loc": null,
            "Pin": null,
            "State": null,
            "Ph": null,
            "Em": null
        },
        "DispDtls": {
            "Nm": null,
            "Addr1": null,
            "Addr2": null,
            "Loc": null,
            "Pin": null,
            "Stcd": null
        },
        "ShipDtls": {
            "Gstin": null,
            "LglNm": null,
            "TrdNm": null,
            "Addr1": null,
            "Addr2": null,
            "Loc": null,
            "Pin": null,
            "Stcd": null
        },
        "ValDtls": {
            "AssVal": 0,
            "IgstVal": 0,
            "CgstVal": 0,
            "SgstVal": 0,
            "CesVal": 0,
            "StCesVal": 0,
            "RndOffAmt": 0,
            "TotInvVal": 3200.4
        },
        "ExpDtls": {
            "ShipBNo": null,
            "ShipBDt": null,
            "Port": null,
            "RefClm": null,
            "ForCur": null,
            "CntCode": null
        },
        "EwbDtls": null,
        "ItemList": [],
    }
}

function itemListSchema() {
    return {
        "SlNo": null,
        "PrdDesc": null,
        "IsServc": null,
        "HsnCd": null,
        "Barcde": null,
        "Qty": null,
        "FreeQty": null,
        "Unit": null,
        "UnitPrice": 0,
        "TotAmt": 0,
        "Discount": 0,
        "PreTaxVal": 0,
        "AssAmt": 0,
        "GstRt": 0,
        "IgstAmt": 0,
        "CgstAmt": 0,
        "SgstAmt": 0,
        "CesRt": 0,
        "CesAmt": 0,
        "CesNonAdvlAmt": 0,
        "StateCesRt": 0,
        "StateCesAmt": 0,
        "StateCesNonAdvlAmt": 0,
        "OthChrg": 0,
        "TotItemVal": 0,
        "BchDtls": null
    }
}

function fieldMapping() {
    return {
        "TRNS_DTLS": "TranDtls",
        "TAX_SCH": "TaxSch",
        "SUP_TYP": "SupTyp",
        "REG_REV": "RegRev",
        "ECM_GSTIN": "EcmGstin",
        "DOC_DTLS": "DocDtls",
        "TYP": "Typ",
        "NO": "No",
        "DT": "Dt",
        "SELLER_DTLS": "SellerDtls",
        "GSTIN": "Gstin",
        "LGL_NM": "LglNm",
        "TRD_NM": "TrdNm",
        "ADDR1": "Addr1",
        "ADDR2": "Addr2",
        "LOC": "Loc",
        "PIN": "Pin",
        "STATE": "State",
        "PH": "Ph",
        "EM": "Em",
        "BUYER_DTLS": "BuyerDtls",
        "DISP_DTLS": "DispDtls",
        "NM": "Nm",
        "STCD": "Stcd",
        "SHIP_DTLS": "ShipDtls",
        "VAL_DTLS": "ValDtls",
        "ASS_VAL": "AssVal",
        "IGST_VAL": "IgstVal",
        "CGST_VAL": "CgstVal",
        "SGST_VAL": "SgstVal",
        "CES_VAL": "CesVal",
        "ST_CES_VAL": "StCesVal",
        "RND_OFF_AMT": "RndOffAmt",
        "TOT_INV_VAL": "TotInvVal",
        "EXP_DTLS": "ExpDtls",
        "SHIP_BNO": "ShipBNo",
        "SHIP_BDT": "ShipBDt",
        "PORT": "Port",
        "REF_CLM": "RefClm",
        "FOR_CUR": "ForCur",
        "CNT_CODE": "CntCode",
        "EWB_DTLS": "EwbDtls",
        "ITEM_LIST": "ItemList",
        "SL_NO": "SlNo",
        "PRD_DESC": "PrdDesc",
        "IS_SERVC": "IsServc",
        "HSN_CD": "HsnCd",
        "BARCDE": "Barcde",
        "QTY": "Qty",
        "FREE_QTY": "FreeQty",
        "UNIT": "Unit",
        "UNIT_PRICE": "UnitPrice",
        "TOT_AMT": "TotAmt",
        "DISCOUNT": "Discount",
        "PRE_TAX_VAL": "PreTaxVal",
        "ASS_AMT": "AssAmt",
        "GST_RT": "GstRt",
        "IGST_AMT": "IgstAmt",
        "CGST_AMT": "CgstAmt",
        "SGST_AMT": "SgstAmt",
        "CES_RT": "CesRt",
        "CES_AMT": "CesAmt",
        "CES_NON_ADVL_AMT": "CesNonAdvlAmt",
        "STATE_CES_RT": "StateCesRt",
        "STATE_CES_AMT": "StateCesAmt",
        "STATE_CES_NON_ADVL_AMT": "StateCesNonAdvlAmt",
        "OTH_CHRG": "OthChrg",
        "TOT_ITEM_VAL": "TotItemVal",
        "BCH_DTLS": "BchDtls",
        "VERSION":"Version",
        "POS":"Pos"

        // "TRANS_ID": "",
        // "TRANS_NAME": "",
        // "TRANS_MODE": "",
        // "DISTANCE": "",
        // "TRANS_DOC_NO": "",
        // "TRANS_DOC_DT": "",
        // "VEH_NO": "",
        // "VEH_TYPE": ""
    }
}

function formatData(oData) {
    let oDocSchema = this.documentSchema();
    let oMapping = this.fieldMapping();
    let sSubMapping, sMapping;
    let oItemListSchema ={};
    for (const key in oData) {
        console.log(key);
        if (oData.hasOwnProperty(key)) {
            let item = oData[key];
            sMapping = oMapping[key];
            if(Object.prototype.toString.call(item) ==="[object Object]"){
                console.log(key + " & " + sMapping);
                for (const itemKey in item) {
                    if (item.hasOwnProperty(itemKey)) {
                        sSubMapping = oMapping[itemKey]
                        console.log(itemKey + " & " + sSubMapping);
                        oDocSchema[sMapping][sSubMapping] = item[itemKey] ? item[itemKey] : oDocSchema[sMapping][sSubMapping];
                    }
                }
            }else if(Object.prototype.toString.call(item)==="[object Array]"){
                for (let i = 0; i < item.length; i++) {
                    let oRow = item[i];
                    oItemListSchema = this.itemListSchema()
                    for (const rowKey in oRow) {
                        if (oRow.hasOwnProperty(rowKey)) {
                            sSubMapping = oMapping[rowKey]
                            console.log(rowKey + " & " + sSubMapping);
                            oItemListSchema[sSubMapping] = oRow[rowKey] ? oRow[rowKey] : oItemListSchema[sSubMapping];
                            
                        }
                    }
                    oDocSchema[sMapping].push(oItemListSchema);
                }
            }
            else{
                oDocSchema[sMapping] = item ? item : oDocSchema[sMapping] ;
            }
        }
    }
    return oDocSchema;
}

module.exports = { formatData, documentSchema, itemListSchema, fieldMapping }