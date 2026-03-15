const net = require("net");
const https = require("https");
async function http_delay_test(url){
    const startTime=  process.hrtime.bigint();
    const res = await fetch(url);
    console.log(
        Math.round(Number(process.hrtime.bigint() - startTime)/1e6)
    )
};
async function tcp_delay_test(host,port){
    const startTime=  process.hrtime.bigint();
    const socket = new net.Socket();
    function result(err){
        const end = process.hrtime.bigint();
        const delay = err || Math.round(Number(process.hrtime.bigint() - startTime)/1e6)
        console.log (delay);
        socket.destroy();
        return;
    }
    await new Promise((resolve,reject)=>{
        socket.connect(port,host,()=>{resolve(result())});
        socket.on("error",()=>reject(result(error)));
        socket.setTimeout(3000,()=>{
            reject(result(Error(`timeout`)))
        })

    })
    

};
http_delay_test("https://bing.com");
tcp_delay_test("baidu.com",443);
