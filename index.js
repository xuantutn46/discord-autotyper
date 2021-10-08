const dc = require('./discord');
// const dc1 = require('./discord1');
const { sig } = require("./utils/sig");
// const { sig1 } = require("./utils/sig1");
(async () => {
    sig();

    await dc.initialize();
    // here is where you enter your email and password
    await dc.login('xuantu4646@gmail.com', 'Thuavu9900')

    await dc.likeChannelProcess(1) // 1 = 1 minute

    debugger;

})();

// (async () => {
//     sig1();

//     await dc1.initialize();
//     // here is where you enter your email and password
//     await dc1.login('quynhngan123321@gmail.com', 'quynhngan123456789')

//     await dc1.likeChannelProcess(1) // 1 = 1 minute

//     debugger;

// })();