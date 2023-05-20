const common = require('./webpack.common');
const path = require('path');
const {merge} = require('webpack-merge'); // webpack-merge - bizga prod va dev ni ajratganimizda common configuratsiyalarni devga ham prod ga qoshib yozishga yordam berdi!
 // merge - bu bizga webpack.common da joylashgan configuratsiyani ushbu fayldagi konfiguratsiyani qo'shib birga ishlatish uchun kerak!
module.exports = merge(common, {
    mode: "development",
    output: { // output - biz codelarimizni qaysi papkaga va qaysi nom bilan bundle qilishni ya'ni sobirat qilishni korsatamiz
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // .scss $ - dollar belgisi bilan tugasa oxiri shu bilan tugagan fayllarga tegishli degani bu!
                use: ["style-loader", "css-loader", "sass-loader"] // bu yerda tesqarimachasi oqidi sass -loader dan boshlab shunga uni birinchi qoydik!
                // css-loader - css larni olib js ga o'giradi, style-loader - esaa js ni olib DOM ga ulaydi shuning uchun style-loader qoymasek css lar ishlamidi!
            }
        ]
    }
});