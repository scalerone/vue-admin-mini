const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
const proxyTargetMap = {
    prod: 'https://xxx.xxx.com/',
    dev: 'http://192.168.200.230:6379',
    test: 'http://test.xxx.com',
    local: 'http://localhost:8080/'
}
let proxyTarget = proxyTargetMap[process.env.API_TYPE] || proxyTargetMap.local
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
    chainWebpack: () => { },
    //configureWebpack 这部分打包文件添加时间戳，防止缓存不更新
    configureWebpack: {
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    },

    devServer : {
        proxy: {
            '/api' : {
                target: proxyTarget,
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
};
