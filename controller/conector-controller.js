'use strict'
var cryptoUtil = require('../util/cryptojs-util');
var conf = require('../configuracion.json');
var urls = require('../urls.json');
var apiRest= require('../api-rest.json');
var _ = require('lodash');
var request = require('request');
var kapp = process.env.kapp;
function authenticate(req,res){
    let header = req.headers;
    let body = req.body;
    //console.log({ kData: body.k });
    cryptoUtil.cryptoMethod.decode(body.k).then(dec => {
        console.log({decData:dec});
        let j=JSON.parse(dec);
        console.log({jsonData:j});
        
        
        let sysIndex = _.findIndex(conf.apps, function (o) { return o.key == j.k; });
        console.log({header:header,sysIndex:sysIndex,jk:j.k});
        if (sysIndex != -1) {

            if (conf.apps[sysIndex].origin == header.origin) {
                console.log('origen pass');
                //solicitando token
                cryptoUtil.cryptoMethod.encode(JSON.stringify({keyApp:kapp})).then(enc=>{
                    request.post(apiRest.host+apiRest.token, { form: { data: enc } }, (err, httpResponse, body) => {
                        //console.log({resApiRest:httpResponse,bodyMantecol:body});
                        console.log({body:body});
                        
                        if(body!=undefined){
                            let j=JSON.parse(body);
                            
                            if(j.success==true){
                                
                                console.log('enviando data a la app');
                                let strg=JSON.stringify({d:true,dat:{t:j.token,data:null},u:urls})
                                cryptoUtil.cryptoMethod.encode(strg).then(twoenct=>{
                                    console.log('enviado respuesta a app');
                                    res.json({
                                        d:true,dat:twoenct
                                    })
                                }) 
                            }else{
                                let strg=JSON.stringify({d:false,dat:{t:null,data:null},u:null})
                                cryptoUtil.cryptoMethod.encode(strg).then(twoenct=>{
                                    console.log('enviado respuesta a app');
                                    res.json({
                                        d:true,dat:twoenct
                                    })
                                }) 
                            }
                        }

                       
                        
                      })
                })
                

            } else {
                res.json({
                    d: false
                })
            }


        } else {
            res.json({
                d: false
            })
        }
    })
}

function peticion(req,res){
    let body = req.body.k;
    cryptoUtil.cryptoMethod.decode(body).then(dec => {
    console.log({peticionRealizada:dec});
    let jData = JSON.parse(dec);
    console.log({jItemPeticion:jData.data.d});
        console.log({jDataJSon:jData});
    request.post(apiRest.host+jData.data.d.u, { form: { token: jData.data.d.m, data: jData.data.d.c,IdentificadorApp:jData.k } }, (err, httpResponse, body) => {
        console.log({dataApi:body});

        if(body!=undefined){
            let j= JSON.parse(body);
            
                if(j.success==true){
                   
                        res.json({
                            d:true,dat:j.d
                        })
               
                    console.log('el josias es un gordo');
                }else{
                    res.json({
                        d:true,dat:null
                    })
                }
        }else{
            res.json({
                d:true,dat:null
            })
        }
      


    })
   
    })
}

var conector = {

    authenticate:authenticate,
    peticion:peticion

}

module.exports = conector;