const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: { // output - biz codelarimizni qaysi papkaga va qaysi nom bilan bundle qilishni ya'ni sobirat qilishni korsatamiz
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(), // OptimizeCssAssetsWebpackPlugin - css ni bundle qilganda papkani ichidagi kodlarni bosh joy, commentlarni olib tashlash uchun
            new TerserPlugin() // OptimizeCssAssetsWebpackPlugin ni ishlatganimizda HTML ni default configuratsiyani ochirib qoygan bolamiz va html fayllar size katta bolib ketadi!
            // shunda bizga TerserPlugin kerak boladi hajmini kamaytirish bosh joylarni olib tashlaydi!
        ]
    },
    plugins: [new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}), new CleanWebpackPlugin()], // MiniCssExtractPlugin - css lar ni alohida .css fayl ga olib uni import qilib qoýadi qaysi faylga import qqilingan bolsa
    // CleanWebpackPlugin - har safar run build qilganimizda eski fayllarni ochirib yengilarni bundle qilib qoyadi
    module: {
        rules: [
            {
                test: /\.scss$/, // .scss $ - dollar belgisi bilan tugasa oxiri shu bilan tugagan fayllarga tegishli degani bu!
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] // bu yerda tesqarimachasi oqidi sass -loader dan boshlab shunga uni birinchi qoydik!
                // css-loader - css larni olib js ga o'giradi, MiniCssExtractPlugin.loader esa css-loader js ga ogirgan style larni alohida fayl ochib shunga qoyadi!
                // MiniCssExtractPlugin.loader ni bu yerga yozishimizdan maqsad - css larni DOM ga joylamasdan alohida fayl qilib olib chiqishi uchun! Buni yana yuqorida plugins da configuratsiya qiganmiz
            }
        ]
    }
});