module.exports = {
    devServer: {
        proxy: 'http://localhost:8081'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/FullStack-Project/'
        : '/'
}
