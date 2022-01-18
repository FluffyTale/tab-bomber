var mc = require('minecraft-protocol');
let nicks, ip;

ip = process.argv[2].split(':');
if(!ip[1]) ip[1] = 25565;

let version = '1.12.2';
require('fs').readFile("./version.txt", 'utf8', function(e,d) {
 if(e) return;
 console.log(`> Версия: ` + d)
 if(d) version = d;
});

require('fs').readFile("./nicks.txt", 'utf8', function(e,d) {
 if(e) throw e;
 nicks = d.replace(/\r/g,'').split('\n');
 if(nicks.length < 2) return console.log(`! nicks.txt заполни то`);
 
 join_bot(true);
});

process.on('uncaughtException', (err, origin) => {
 console.log(err);
});

async function join_bot(i) {
var username = nicks[0];
if(!username) return console.log(`! Boom`);

var client = mc.createClient({
 host: ip[0], port: ip[1],
 username: username, version: version
});

client.on('connect', () => {
 console.log(`> ${username} connected`);
});
if(i) client.on('disconnect', (packet) => { console.log(`> Disconnect with reason: ` + packet.reason) });

setTimeout(() => {
 nicks.splice(0,1)
 join_bot()
 }, 1000);
};
