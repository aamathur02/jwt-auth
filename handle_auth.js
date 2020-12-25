import JSRSASign from "jsrsasign";

const generateJwt = (header, claims, key) => {
    const string_header = JSON.stringify(header);
    const string_claims = JSON.stringify(claims);

    const JWT = JSRSASign.jws.JWS.sign("HS512", string_header, string_claims, key)

    return JWT;
};

const decodeJwt = sJWS => {
    const split_JWT = sJWS.spit(".");

    const uHeader = JSRSASign.b64utos(split_JWT[0]);
    const uClaim = JSRSASign.b64utos(split_JWT[1]);

    const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

    return pClaim;
};


const validateJwt = (header, token, key) => {
    return JSRSASign.jws.JWS.verifyJWT(token,key, header);
};

module.exports = {
    generateJwt,
    decodeJwt,
    validateJwt
};

