import { BinaryTrieNode, Result } from "./create-binary-trie";
import { ipToInt } from "./ip-convert-to-int";


  export function lookupBinaryTire(trie: BinaryTrieNode, ip: string): Result | null {
    let ipInt = ipToInt(ip);
    let node = trie;
    let results: Result[] = [];
  
    for (let i = 31; i >= 0; i--) {
      const bit = (ipInt >> i) & 1;
      if (!node.children[bit]) break;
      node = node.children[bit];
      if (node.results.length) {
        results = node.results;
      }
    }
    
    switch(results.length){
        case 0:
            return null
        case 1: 
            return results[0]
        default:
            let desiredResult: Result = results[0]
            let minCidrLen = Number.MAX_SAFE_INTEGER
            for(const result of results){
                if(result.cidrLen < minCidrLen) {
                    desiredResult = result
                    minCidrLen = result.cidrLen
                }
            } 
            return desiredResult

    }

  }