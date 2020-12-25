const path= require("path");


module.exports = {
    entry: "./script/app.js",
    output: {
        path: path.resolve(__dirname, "build")
    }
}