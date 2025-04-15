import * as readline from "readline"
import { generateBinaryTrie } from "./utils/create-binary-trie";
import { lookupBinaryTire } from "./utils/lookup-binary-trie";


async function main() {
    const binaryTrie = await generateBinaryTrie('ranges.txt'); 
    const reader = readline.createInterface({
            input: process.stdin
    })
    console.log("please enter your ip and press enter:  ")
    reader.question('', (ip) => {
        const result = lookupBinaryTire(binaryTrie, ip);
        if(!result){
            console.log("sorry, no result found")
        }else {
            console.log("lookup result: ", {
                range: result.range,
                isp: result.isp,
                as: result.as,
                country: result.country
            })
        }
        reader.close();
      });
}
  
main();
  