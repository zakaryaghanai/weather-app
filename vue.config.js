const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/weather-app' : '',
    configureWebpack: {
        resolve: {
            alias: {
                '@views': path.join(__dirname, './src/views/'),
                '@components': path.join(__dirname+ './src/components/'),
                '@assets': path.join(__dirname, './src/assets/'),
                '@images': path.join(__dirname, './src/assets/images/'),
            }
        }
    },
}