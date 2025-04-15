"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupBinaryTire = lookupBinaryTire;
const ip_convert_to_int_1 = require("./ip-convert-to-int");
function lookupBinaryTire(trie, ip) {
    let ipInt = (0, ip_convert_to_int_1.ipToInt)(ip);
    let node = trie;
    let results = [];
    for (let i = 31; i >= 0; i--) {
        const bit = (ipInt >> i) & 1;
        if (!node.children[bit])
            break;
        node = node.children[bit];
        if (node.results.length) {
            results = node.results;
        }
    }
    switch (results.length) {
        case 0:
            return null;
        case 1:
            return results[0];
        default:
            let desiredResult = results[0];
            let minCidrLen = Number.MAX_SAFE_INTEGER;
            for (const result of results) {
                if (result.cidrLen < minCidrLen) {
                    desiredResult = result;
                    minCidrLen = result.cidrLen;
                }
            }
            return desiredResult;
    }
}
