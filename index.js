const AbortController = require('abort-controller');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const lineReader = require('line-reader');

//replace token with bot token
const token = '';
const request = require('request');

//replace bearer with packetstream api key
const bearer = '';

//const proxy = `https://wireproxies:${passAuth}@proxy.packetstream.io:31111`;

const myInfo = {
    'method' : 'GET',
    'url' : 'https://reseller.packetstream.io/reseller/my_info',
    'headers' : {
        'Authorization' : bearer
    }
};


const checkSub = {
    'method': 'GET',
    'url': 'https://reseller.packetstream.io/reseller/sub_users/view_all',
    'headers': {
      'Authorization': bearer
    }
};

const footer = 'https://media.discordapp.net/attachments/781381191248642068/806775043199336448/wirepfp.png?width=676&height=676';


const channel01 = bot.channels.cache.find('735983998295212092');

const user = './users.txt';
const subs = './username.txt';

const PREFIX = '!';

const ADMIN = '?';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

function timeoutPromise(ms, promise) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('timeout'))
        }, ms);
        promise.then(
            (res) => {
            clearTimeout(timeoutId);
            resolve(res);
        },
        (err) => {
            clearTimeout(timeoutId);
            reject(err);
        })
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
  

bot.on('ready', () =>{
    console.log('Wire Proxies On.');
})

bot.on('message', async msg => {
    if (msg.channel.id !== '735983704379228161') return;
    const channel01 = bot.channels.cache.find(channel => channel.id === '735983704379228161');
    if(!coins[msg.author.id]){
        coins[msg.author.id] = {
            name: msg.author.username,
            coins: 0
        };
    }

    let addCoin = 1;
    if(msg.attachments.first()){
        coins[msg.author.id] = {
            name: msg.author.username,
            coins: coins[msg.author.id].coins + addCoin
        };
        msg.react('<:wirewoah:782077415060144148>');
    }
    if(msg.content.includes('twitter.com/')){
        coins[msg.author.id] = {
            name: msg.author.username,
            coins: coins[msg.author.id].coins + 2
        };
        msg.react('<:wirewoah:782077415060144148>');
    }

    fs.writeFile('./coins.json', JSON.stringify(coins), (err) => {
        if (err) console.log(err);
    })
    msg.attachments.forEach(a => {
        fs.writeFileSync(`./${a.name}`, a.file); // Write the file to the system synchronously.
    });
})

bot.on('message', async msg=>{
    if (msg.content.indexOf(PREFIX) !== 0) return;
    let args = msg.content.substring(PREFIX.length).split(" ");
    if(!coins[msg.author.id]){
        coins[msg.author.id] = {
            name: msg.author.username,
            coins: 0
        };
    }

    switch(args[0]){
        case 'help': 
            embed = new Discord.MessageEmbed()
                .setColor('#99FF99')
                .addFields(
                    {
                        name: '__**Commands:**__', value: '!help' 
                        + '\n!login <proxy username> <proxy auth>' 
                        + '\n!gen <amount> <region>' 
                        + '\n!usage'
                        + '\n!rewards - Displays rewards'
                        + '\n!success //@user'
                        + '\n!redeem'
                    }
                )
                .setTimestamp()
                .setFooter('Wire Proxies', footer)
            msg.channel.send(embed);
        break;
        case 'login':
            //logs in as sub user
            while(args.length<3){
                msg.author.send('Please retry. !login <username> <proxy auth>');
                return;
            }
            let login = args[1];
            let pass = args[2];
            var a = false;
            var b = false;
            var c = false;
            var d = false;
            request(checkSub, function (error, response) {
                if (error) throw new Error(error);
                fs.writeFile('./active.txt', response.body, function(err, result) {
                    if(err) console.log('error', err);
                  });
                });

            fs.readFile(user, function (err, data) {
                if (err) throw err;
                if(data.includes(msg.author.id)){
                    a = true;
                }
                if(data.includes(pass)){
                    b = true;
                }

                fs.readFile('./active.txt', function (err, data) {
                    if (err) throw err;
                    if(data.includes(login)){
                        c = true;
                    }
                    if(data.includes(pass)){
                        d = true;
                    }
                

            if(c === true && d ===true){
            if(a !== true){
                if(b !== true){
                    fs.appendFile(user, msg.author.id + '\n', function(err, result) {
                        if(err) console.log('error', err);
                      });
                    fs.appendFile(subs, login+':'+pass + '\n', function(err, result) {
                        if(err) console.log('error', err);
                      });
                    msg.author.send('You have been successfully logged in.');
                }
                else{
                    msg.author.send('This login is already in use.');
                    return;
                }
            }
            else{
                msg.author.send('You already have access.')
                return;
            }
        }
        else{
            msg.author.send('Error login not found. Please try again.');
            return;
        }
        
    });
});
        break;
        case 'gen':
            //generates proxies with region
            let num = args[1];
            let region = args[2];
            var loctype = '';
            var fulllist = [];
            var a = false;
            var index = 0;
            var q = [];
            var arr1 = [];
            var pas = [];
            fs.readFile(user, function(err, data) {
                if(err) throw err;
                q = data.toString().split("\n");

            fs.readFile(subs, function(err, data) {
                if(err) throw err;
                arr1 = data.toString().split("\n");


            for(i = 0;i < q.length;i++){
                if(msg.author.id === q[i]){
                    a = true;
                    index = i;
                }
            }
            if(a==true){
                if(region =='us'){
                    loctype = 'UnitedStates';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region =='uk'){
                    loctype = 'UnitedKingdom';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region =='nl'){
                    loctype = 'Netherlands';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region =='au'){
                    loctype = 'Australia';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region =='cz'){
                    loctype = 'Czechia';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'ph'){
                    loctype = 'Philippines';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'it'){
                    loctype = 'Italy';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'bg'){
                    loctype = 'Belgium';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'sz'){
                    loctype = 'Switzerland';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'de'){
                    loctype = 'Germany';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'es'){
                    loctype = 'Spain';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'fr'){
                    loctype = 'France';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'gr'){
                    loctype = 'Greece';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'ie'){
                    loctype = 'Ireland';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'nz'){
                    loctype = 'NewZealand';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'pt'){
                    loctype = 'Portugal';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'se'){
                    loctype = 'Sweden';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'in'){
                    loctype = 'India';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
                if(region == 'sg'){
                    loctype = 'Singapore';
                    for(x = 1; x < num; x++){
            
                        sessidnum = getRandomInt(999999999)
                        sessid = "Zen" + sessidnum
      
                        fulllist.push("px.wireproxies.com:31112:" + arr1[index] + "_country-" + loctype + "_session-" + sessid);
                    }
                }
/*Belgium
Switzerland
Germany
Spain
France
Greece
Ireland
New Zealand
Portugal
Sweden
India
Singapore*/

                fs.writeFile('./proxylist.txt', fulllist.join("\n"), function(err, result) {
                    if(err) console.log('error', err);
                });

                proxylist = new Discord.MessageAttachment('./proxylist.txt');
                msg.author.send(proxylist);
                fulllist = [];
                q = [];
                arr1 = [];
                pas = [];
            }
            else{
                msg.author.send("You don't have access to this command.");
                return;
            }
        });});
        break;
        case 'usage':
            //displays amount of data used
            var a = false;
            var index = 0;
            var q = [];
            var arr1 = [];
            fs.readFile(user, function(err, data) {
                if(err) throw err;
                q = data.toString().split("\n");

            fs.readFile(subs, function(err, data) {
                if(err) throw err;
                arr1 = data.toString().split("\n");


            for(i = 0;i < q.length;i++){
                if(msg.author.id === q[i]){
                    a = true;
                    index = i;
                }
            }
            if(a === true){
            bal1 = {
                'method': 'POST',
                'url': 'https://reseller.packetstream.io/reseller/sub_users/view_single',
                'headers': {
                  'Authorization': bearer
                },
                body: "{\"username\": \"" + arr1[index].substring(0,arr1[index].length - 17) + "\"}"
              
              };
                var x = "";
              request(bal1, function (error, response) {
                if (error) throw new Error(error);
                    const data = JSON.parse(response.body);
                    var body = data.data;
                    x = body.balance;
                    Data = x/100.0;
                embed = new Discord.MessageEmbed()
                .setColor('#99FF99')
                .addFields(
                    {
                        name: '__**Data:**__', value: "You have `" + Data + "GB` remaining."
                    }
                )
                .setTimestamp()
                .setFooter('Wire Proxies', footer)
                msg.channel.send(embed);
                q = [];
                arr1 = [];
                });
            }else{
                msg.author.send("You don't have access to this command.");
              
        }
    });});
        break;
        case 'pools':
            embed = new Discord.MessageEmbed()
                .setColor('#99FF99')
                .addFields(
                    {
                        name: '__**Current Available Pools:**__', value: 'us: United States '+
                        '\nuk: United Kingdom '
                        +'\nnl: Netherlands '
                        +'\nau: Australia '
                        +'\ncz: Czechia '
                        +'\nph: Philippines '
                        +'\nit: Italy'
                        +'\nbg: Belgium'
                        +'\nsz: Switzerland'
                        +'\nde: Germany'
                        +'\nes: Spain'
                        +'\nfr: France'
                        +'\ngr: Greece'
                        +'\nir: Ireland'
                        +'\nnz: New Zealand'
                        +'\npt: Portugal'
                        +'\nse: Sweden'
                        +'\nin: India'
                        +'\nsp: Singapore'
                    }
                )
                .setTimestamp()
                .setFooter('Wire Proxies', footer)
            msg.channel.send(embed);
        break;
        case 'success':
                    let coins = require('./coins.json');
                    if(!coins[msg.author.id]){
                        coins[msg.author.id] = {
                            name: msg.author.username, 
                            coins: 0
                        };
                    }
                    var uCoins = 0;
                    if(!args[1]){
                        uCoins = coins[msg.author.id].coins;
                        embed = new Discord.MessageEmbed()
                            .setColor('#99FF99')
                            .setTitle('__**Success Counter:**__')
                            .addFields(
                                {
                                    name: '<:wirewoah:782077415060144148> **' + msg.author.username + ': ' + uCoins + '** <:wirewoah:782077415060144148>', value: 'You can use your points to redeem rewards. Do !rewards to display reward list.'
                                }
                                )
                            .setTimestamp()
                            .setFooter('Inferno Labs | bot by XenSan', footer);
                        msg.channel.send(embed);
                    }
                    else{
                        user2 = msg.mentions.users.first();
                        if(!coins[user2.id]){
                            coins[user2.id] = {
                                name: user2.username, 
                                coins: 0
                            };
                        }
                        uCoins = coins[user2.id].coins;
                        embed = new Discord.MessageEmbed()
                        .setColor('#99FF99')
                        .setTitle('__**Success Counter:**__')
                        .addFields(
                            {
                                name: '<:wirewoah:782077415060144148> **' + user2.username + ': ' + uCoins + '** <:wirewoah:782077415060144148>', value: "Displaying another user's success."
                            }
                        )
                        .setTimestamp()
                        .setFooter('Wire Proxies', footer)
                    msg.channel.send(embed);
                    }
                break;
                case 'rewards':
                    if(!coins[msg.author.id]){
                        coins[msg.author.id] = {
                            name: msg.author.username,
                            coins: 0
                        };
                    }
                    embed = new Discord.MessageEmbed()
                        .setColor('#99FF99')
                        .addFields(
                            {
                                name: '<:wirewoah:782077415060144148> **Current Rewards:**', value: '**1.** 5 Points - Random reward (Percentages below)'
                                + '\n25% 1GB Armored Resi'
                                + '\n10% 2GB Armored Resi'
                                + '\n5% 50 DC on next restock'
                                + '\n3% 100 DC on next restock'
                                + '\n2% 25 Weekly ISP' 
                                + '\n**To redeem rewards: !redeem**'
                            }
                        )
                        .setTimestamp()
                        .setFooter('Wire Proxies', footer)
                break;
                case 'redeem':
                    if(!coins[msg.author.id]){
                        coins[msg.author.id] = {
                            name: msg.author.username,
                            coins: 0
                        };
                    }
                    if(coins[msg.author.id].coins<5){
                        msg.channel.send('Not enought points to redeem a reward.')
                        return;
                    }
                    //let ans = args[1];
                    //if(ans == 1){
                        coins[msg.author.id] = {
                            name: msg.author.username,
                            coins: coins[msg.author.id].coins - 5
                        };
                        p = getRandomInt(100);
                        if(p <= 2){
                            msg.channel.send('Free 25 Weekly ISP Proxies! Please create a ticket to redeem your reward!');
                        }else if(p >= 3 && p <= 5){
                            msg.channel.send('Free 100 DC Proxies on next restock! Please create a ticket to redeem your reward!');
                        }else if(p > 5 && p <= 10){
                            msg.channel.send('Free 50 DC Proxies on next restock! Please create a ticket to redeem your reward!');
                        }else if(p > 10 && p <= 20){
                            msg.channel.send('2GB Armored Resi Added To Your Plan! Please create a ticket to redeem your reward!');
                        }else if(p > 20 && p <= 45){
                            msg.channel.send('1GB Armored Resi Added To Your Plan! Please create a ticket to redeem your reward!');
                        }else{
                            msg.channel.send('Unlucky roll! Try again next time!')
                        }
                    //}
                    /*if(ans == 2){
                        if(coins[msg.author.id].coins < 25){
                            msg.channel.send('Not enough points.')
                            return;
                        }
                        coins[msg.author.id] = {
                            name: msg.author.username,
                            coins: coins[msg.author.id].coins - 25
                        };
                        msg.channel.send('Please open a ticket to choose your reward!');
                    }*/

                break;

    }
})

bot.on('message', async msg=>{
    if (msg.content.indexOf(ADMIN) !== 0) return;
    let args = msg.content.substring(PREFIX.length).split(" ");
    //if (msg.author.id === greenzy || msg.author.id === mattyku || msg.author.id === sirwire) {
    //adminID = 735981070343733341;

    //3.215.14.66:31112:wireproxies:YNVZpMwmTIx9gs2L_country-UnitedStates_session-Zl2xEVeR

    switch(args[0]){
        case 'help':
            embed = new Discord.MessageEmbed()
                .setColor('#99FF99')
                .addFields(
                    {
                        name: '__**Commands:**__', value: '?help' + '\n?create <username>' + '\n?add <amount> <username>' + '\n?checkUsers' + '\n?user <username>' + '\n?subtract <amount> <username>'
                    }
                )
                .setTimestamp()
                .setFooter('Wire Proxies', footer)
            msg.channel.send(embed);
        break;
        case 'create':
            let user1 = args[1];
            const createSub = {
                'method' : 'POST',
                'url' : 'https://reseller.packetstream.io/reseller/sub_users/create',
                'headers' : {
                    'Authorization' : bearer
                },
                body : "{\"username\": \""+user1+"\"}"
            }
            request(createSub, function (error, response) {
                if (error) {
                    msg.channel.send('Error. Could not create user.')
                }else{
                    msg.channel.send(user1 + ' successfully created');
                }
            });
        break;
        case 'user':
            let sub1 = args[1];
            request(checkSub, function (error, response) {
                if (error) throw new Error(error);
                JSON.parse(response.body);
                if((response.body).includes(sub1)){
                    var checkUser = {
                        'method': 'POST',
                        'url': 'https://reseller.packetstream.io/reseller/sub_users/view_single',
                        'headers': {
                          'Authorization': bearer
                        },
                        body: "{\"username\": \""+sub1+"\"}"
                      
                    };
                    
                      request(checkUser, function (error, response) {
                        if (error) throw new Error(error);
                        const data = JSON.parse(response.body);
                        var body = data.data;
                        userPass = body.proxy_authkey;
                        userBal = body.balance;

                        embed = new Discord.MessageEmbed()
                                .setColor('#99FF99')
                                .setTitle('Admin')
                                .addFields(
                                    {
                                        name: 'User: ' + sub1, value: 'ProxyAuth: ' + userPass + '\nUser Balance: ' +  userBal
                                    }
                                )
                                .setTimestamp()
                                .setFooter('Wire Proxies', footer)


        
                        msg.channel.send(embed);
                      });
                } else {
                    msg.channel.send('User not found.');
                    return;
                }
            });
        break;
        case 'checkUsers':
            request(checkSub, function (error, response) {
                if (error) throw new Error(error);
                const data = JSON.parse(response.body);
                var body = data.data;
                var users = '';
                let page = 1;
                var l = body.length;
                for(i=0;i<l;i++){
                    users += 'user: ' + body[i].username + '\n';
                }
                console.log(l/15);

                /*embed = new Discord.MessageEmbed()
                    .setColor('#99FF99')
                    .setTitle('Admin')
                    .setDescription('**Userlist:**\n' + '```' + users + '```')
                    .setTimestamp()
                    .setFooter('Wire Proxies', footer)*/
                fs.writeFileSync('./checkUsers.txt', 'Users: \n' + users, function(err, result) {
                    if(err) console.log('error', err);
                  });
                
                fs.writeFile('./active.txt', response.body, function(err, result) {
                    if(err) console.log('error', err);
                  });
                  text = new Discord.MessageAttachment('./active.txt');
                  users1 = new Discord.MessageAttachment('./checkUsers.txt');

                msg.channel.send(users1);

                  /*msg.channel.send(embed).then(msg => {

                    msg.react('⬅️').then( r => {
                        msg.react('➡️')
                        users = '';
                        const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === msg.author.id;
                        const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === msg.author.id;

                        const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000});

                        forwards.on('collect', r => {
                            page++;
                            i += 15;
                            users = '';
                            for(i;i<l;i++){
                                users += 'user: ' + body[i].username + '\n';
                            }
                            embed.setFields(
                                {
                                    name: 'Userlist:',value: '```' + users + '```'
                                }
                            )
                            msg.edit(embed);
                            users = '';
                        })
                    })
                })*/
            });
        break;
        case 'add':
            let bal = args[1];
            let username3 = args[2];
            var a = "\""+username3+"\"";
            var checkUser = {
                'method': 'POST',
                'url': 'https://reseller.packetstream.io/reseller/sub_users/view_single',
                'headers': {
                  'Authorization': bearer
                },
                body: "{\"username\": \""+username3+"\"}"
              
            };
            var addBal = {
                'method': 'POST',
                'url': 'https://reseller.packetstream.io/reseller/sub_users/give_balance',
                'headers': {
                  'Authorization': bearer
                },
                body: "{\"username\": "+ a +", \"amount_usd_cents\":" + bal + "}"
                //"{\"username\": \"subuser1\"}"
              
              };
              request(addBal, function (error, response) {
                if (error) throw new Error(error);
                msg.author.send('Successfully added ' + bal + ' to user: ' + a);
              });
              request(checkUser, function (error, response) {
                if (error) throw new Error(error);
                const data = JSON.parse(response.body);
                var body = data.data;
                userPass = body.proxy_authkey;
                userBal = body.balance;
                embed = new Discord.MessageEmbed()
                    .setColor('#99FF99')
                    .setTitle('Admin')
                    .addFields(
                        {
                            name: username3,value: '```ProxyAuth: ' + userPass + '\nBalance: ' + userBal + '```'
                        }
                    )
                    .setTimestamp()
                    .setFooter('Wire Proxies', footer)

                msg.channel.send(embed);
              });
        break;
        case 'subtract':
            let sub = args[1];
            let username4 = args[2];
            var a = "\""+username4+"\"";
            var checkUser = {
                'method': 'POST',
                'url': 'https://reseller.packetstream.io/reseller/sub_users/view_single',
                'headers': {
                  'Authorization': bearer
                },
                body: "{\"username\": \""+username4+"\"}"
              
            };
            var options = {
                'method': 'POST',
                'url': 'https://reseller.packetstream.io/reseller/sub_users/take_balance',
                'headers': {
                  'Authorization': bearer
                },
                body: "{\"username\": "+a+", \"amount_usd_cents\": "+sub+"}"
              
              };
              request(options, function (error, response) {
                if (error) throw new Error(error);
                msg.channel.send('Successfully subtracted ' + sub + ' from user: ' + a);
              });
              request(checkUser, function (error, response) {
                if (error) throw new Error(error);
                const data = JSON.parse(response.body);
                var body = data.data;
                userPass = body.proxy_authkey;
                userBal = body.balance;
                embed = new Discord.MessageEmbed()
                    .setColor('#99FF99')
                    .setTitle('Admin')
                    .addFields(
                        {
                            name: username4,value: '```ProxyAuth: ' + userPass + '\nBalance: ' + userBal + '```'
                        }
                    )
                    .setTimestamp()
                    .setFooter('Wire Proxies', footer)

                msg.channel.send(embed);
            });
        break;
    }
//}
//else{
    //msg.channel.send("You don't have access to this command.");
    //return;
//}

})

bot.login(token);
