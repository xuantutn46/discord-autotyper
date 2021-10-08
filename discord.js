const puppeteer = require('puppeteer');
const {types} = require("./utils/types");
const ps = require("prompt-sync");
const prompt = ps();
// list all the words here, will pick them randomly, doesn't matter how many!
var areain = prompt("Enter area: ");
var area =parseInt(areain,10);
var healflagin = prompt("Need Heal ?: ");
var healflag =parseInt(healflagin,10);
var advin = prompt("Enter adv minute: ");
var advtime =parseInt(advin,10);
console.log(advtime); 
var lbhi = prompt("Enter lb hour: ");
var lbh =parseInt(lbhi,10);
var lbmi = prompt("Enter lb minute: ");
var lbm =parseInt(lbmi,10);
var lbin = lbh*60+lbm;
var lbtime =parseInt(lbin,10);
console.log(lbtime);
farmflag = false;

if (area>=4){farmflag = true;}
switch(area) {
    case 1:
    case 2:
        words = {hunt:"rpg hunt t",heal:"rpg heal",work:"rpg chop",farm:"rpg farm",adv:"rpg adv",lb:"rpg buy ed lb"}
      break;
    case 3:
    case 4:
    case 5:
        words = {hunt:"rpg hunt t",heal:"rpg heal",work:"rpg axe",farm:"rpg farm",adv:"rpg adv",lb:"rpg buy ed lb"}
      break;
    case 6:
    case 7:
        words = {hunt:"rpg hunt t",heal:"rpg heal",work:"rpg ladder",farm:"rpg farm",adv:"rpg adv",lb:"rpg buy ed lb"}
      break;
    case 8:
        words = {hunt:"rpg hunt t",heal:"rpg heal",work:"rpg bowsaw",farm:"rpg farm",adv:"rpg adv",lb:"rpg buy ed lb"}
      break;
    case 9:
    case 10:
    case 11:
    case 12:
        words = {hunt:"rpg hunt t",heal:"rpg heal",work:"rpg chainsaw",farm:"rpg farm",adv:"rpg adv",lb:"rpg buy ed lb"}
      break;
    case 13:
      // code block
      break;
    case 14:
      // code block
      break;
    case 15:
      // code block
      break;
  }
let huntCount = 0;
let workCount = 0;
let farmCount = 0;
let advCount = 0;
let lbCount = 0;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const BASE_URL = 'https://discord.com/login';
// change this & enter the channel url
const discord = {
    
    browser: null,
    page: null,

    initialize: async () => {
        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized',
                '--window-position=1921,0'
                // '--window-size=781,1080',
                // '--window-position=-7,0'
                
            ]
        });
        
        discord.page = await discord.browser.newPage();

    },

    /**
     * username and password
     * @param {string} username
     * @param {string} password
     * @return {Promise<void>}
     */

    login: async (username, password) => {
        
        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })

        await discord.browser.on('targetcreated', async function f() {

            let pages = await discord.browser.pages();
          
                      if (pages.length > 1) {
                          await pages[0].close();
          
                          discord.browser.off('targetcreated', f);
                      }
          
        });
        
        // let loginButton = await discord.page.$x('//a[contains(., "Login")]');
        // await discord.page.waitFor(1000)
        // /* Click on login url button */
        // await loginButton[1].click();

        // await discord.page.waitForNavigation({
        //     waitUntil: 'networkidle2'
        // })

        await discord.page.waitFor(2000);

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 10
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 10
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(5000);
        const CHANNELS_URL = `https://discord.com/channels/612100463940075520/685513873520066621` //tu channel
        
            await discord.page.goto(CHANNELS_URL, {
                
            });

        await discord.page.waitFor(10000);
        await discord.page.keyboard.press('Escape')
        await discord.page.waitFor(5000);
        // await discord.page.waitFor('//div[contains(text(), "start")]')

    },


    /**
     * Enter server id and channel urk
     * @param { string } serverID
     * @param { string } channelID
     * @param { number } delay
     * @return {Promise<void>}
     */

    likeChannelProcess: async (delay= 1) => {

            async function initalStart () {
                await discord.page.type('span[data-slate-object="text"]', words.hunt, {
                    // delay: 0
                });

                await discord.page.keyboard.press('Enter')
                huntCount++
                
                if(healflag==1){
                    await discord.page.waitFor(5000);
                    await discord.page.type('span[data-slate-object="text"]', words.heal, {
                        // delay: 0
                    });

                    await discord.page.keyboard.press('Enter')
                }

                await discord.page.waitFor(5000);

                await discord.page.type('span[data-slate-object="text"]', words.work, {
                    // delay: 0
                });

                await discord.page.keyboard.press('Enter')
                workCount++
                
                if(farmflag==true){
                    await discord.page.waitFor(5000);
                
                    await discord.page.type('span[data-slate-object="text"]', words.farm, {
                        // delay: 0
                    });
                
                    await discord.page.keyboard.press('Enter')
                
                    farmCount++
                }

                if(advtime==0)
                {
                    await discord.page.waitFor(5000);
                    await discord.page.type('span[data-slate-object="text"]', words.adv, {
                        delay: 0
                    });
                    
                    await discord.page.keyboard.press('Enter')
                    
                    advCount++
                    advtime=40

                    await discord.page.waitFor(5000);

                    await discord.page.type('span[data-slate-object="text"]', words.heal, {
                        delay: 0
                    });
                
                    await discord.page.keyboard.press('Enter')

                }

                if(lbtime==0)
                {
                    await discord.page.waitFor(5000);
                    await discord.page.type('span[data-slate-object="text"]', words.lb, {
                        delay: 0
                    });
                    
                    await discord.page.keyboard.press('Enter')
                    
                    lbCount++
                    lbtime=180

                }

                console.debug('Main Start ' + new Date() )

            }

            await initalStart();


            async function rpghunt () {
                const random = words.hunt
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')

                huntCount++
                //
                if(healflag==1){
                    await discord.page.waitFor(2000);
                    await discord.page.type('span[data-slate-object="text"]', words.heal, {
                        // delay: 0
                    });

                    await discord.page.keyboard.press('Enter')
                }
                //
                // this logs the time the message was sent at and the total message count
                console.debug('Message M sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + huntCount )
                await discord.page.waitFor(5000);
                
            }
            async function rpgwork () {
                const random = words.work
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')

                workCount++
                //
                if(healflag==5){
                    await discord.page.waitFor(2000);
                    await discord.page.type('span[data-slate-object="text"]', words.heal, {
                        // delay: 0
                    });

                    await discord.page.keyboard.press('Enter')
                }
                //
                // this logs the time the message was sent at and the total message count
                console.debug('Message M sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + workCount )
                await discord.page.waitFor(5000);
                
            }
            async function rpgfarm () {
                const random = words.farm
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')

                farmCount++
                //
                if(healflag==10){
                    await discord.page.waitFor(2000);
                    await discord.page.type('span[data-slate-object="text"]', words.heal, {
                        // delay: 0
                    });

                    await discord.page.keyboard.press('Enter')
                }
                //
                // this logs the time the message was sent at and the total message count
                console.debug('Message M sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + farmCount )
                await discord.page.waitFor(5000);
                
            }
            async function rpgadv () {
                await discord.page.type('span[data-slate-object="text"]', words.adv, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')
                advtime=40
                advCount++
                
                await discord.page.waitFor(2000);
                await discord.page.type('span[data-slate-object="text"]', words.heal, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')
                
                // this logs the time the message was sent at and the total message count
                console.debug('Message M sent: ' + words.adv + ' , at: ' + new Date() + ', Message Count: ' + advCount )

                await discord.page.waitFor(5000);
                
            }
            async function rpglb () {
                await discord.page.type('span[data-slate-object="text"]', words.lb, {
                    delay: 0
                });

                await discord.page.keyboard.press('Enter')
                lbtime=180
                lbCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message M sent: ' + words.lb + ' , at: ' + new Date() + ', Message Count: ' + lbCount )

                await discord.page.waitFor(5000);
                
            }

            // change the first number for minutes
            // 3 * 60 * 1000 = 180000ms === 3 minutes
            setInterval(rpghunt, delay * 40 * 1000)
            await timeout(5000)
            setInterval(rpgwork, delay * 200 * 1000)
            await timeout(5000)
            if(farmflag==true){
                setInterval(rpgfarm, delay * 400 * 1000)
                await timeout(5000)
            }
            setInterval(rpgadv, delay * advtime * 60 * 1000)
            await timeout(5000)
            setInterval(rpglb, delay * lbtime * 60 * 1000)
            await timeout(5000)

    }
}


module.exports = discord;

