var crypto = require('crypto-js');

var cryptoMethod = {

    encode: function(d) {
        let k, ena, enb, hashCode;
        hashCode = '64ad0e99145bab8e4f952843a71971e9becfd5aed7e7719e6420c03e3f88332f';

        return new Promise((resolve, reject) => {
            k = crypto.enc.Base64.parse(hashCode).toString();
            ena = crypto.TripleDES.encrypt(d, k);
            enb = crypto.Rabbit.encrypt(ena.toString(), k);
            resolve(enb.toString());
        }).catch(() => {
            throw reject;
            console.log('fallo en el encode');
        })
    },
    decode: function(d) {
        let k, dna, dnb;
        hashCode = '64ad0e99145bab8e4f952843a71971e9becfd5aed7e7719e6420c03e3f88332f';
        return new Promise((resolve, reject) => {
            // console.log(d);

            k = crypto.enc.Base64.parse(hashCode).toString();
            dnb = crypto.Rabbit.decrypt(d, k);
            dna = crypto.TripleDES.decrypt(dnb.toString(crypto.enc.Utf8), k);
            resolve(dna.toString(crypto.enc.Utf8));
        }).catch((reason) => {
            throw reason;
            console.log('fallo en el decode');
        })
    },
    decodeToken: function(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            cryptoMethod.decode(data).then(decode1 => {
                cryptoMethod.decode(decode1).then(decode2 => {
                    resolve(decode2);
                })
            })
        }).catch(reason => {
            console.log(reason + 'moco');

        })

    }
}

module.exports = {
    cryptoMethod
}