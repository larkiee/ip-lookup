import * as fs from "fs";
import * as readline from 'readline';
import { ipToInt } from "./ip-convert-to-int";

export type Result = {
    range: string;
    isp: string;
    as: number;
    country: string;
    cidrLen: number;
};

export type BinaryTrieNode = {
    children: [BinaryTrieNode?, BinaryTrieNode?];
    results: Result[];
  };


    export async function generateBinaryTrie(filePath: string): Promise<BinaryTrieNode> {
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({ input: fileStream });
    
      const binaryTrie: BinaryTrieNode = { children: [], results: [] };
    
      for await (const line of rl) {
        if (!line.trim()) continue;
        const [range, isp, as, country] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
        const [ipStr, cidrStr] = range.split("/")
        const ip = ipToInt(ipStr)
        const cidrLen = Number.parseInt(cidrStr)
        let node = binaryTrie
        for(let i = 31; i >= 32 - cidrLen; i--){
            const bit = (ip >> i) & 1
            if(!node.children[bit]) {
                node.children[bit] = {children: [], results: []}
            }
            node = node.children[bit]
        }
        node.results.push({
            range,
            isp,
            as: Number.parseInt(as),
            country,
            cidrLen
        })
      }
    
      return binaryTrie;
    }