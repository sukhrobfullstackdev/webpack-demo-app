const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        example: './src/example.js'
    },
    devtool: false, // dist/main da eval rejim bolmasligi uchun!
    plugins: [
        new HtmlWebpackPlugin(
            {
                filename: "index.html",
                template: "./src/pages/index.html",
                chunks: ['main'] // index.html ga aynan qaysi js import qilish kerakligini ko'rastish uchun, main nomi ostida index.js bor shuni import qildik!
            }
        ),
        new HtmlWebpackPlugin(
            {
                filename: "example.html",
                template: "./src/pages/example.html",
                chunks: ['example']
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"] // html ni load qiladi
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader", // file loader siz biz rasmlarni alohida papkaga joylab aynan chaqirilgan html ning img ning src ga qoyolmaymiz
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets"
                    }
                },
            }
        ]
    }
};