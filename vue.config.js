module.exports = {
    devServer: {
        port: 8080,
        hot: true,
        proxy: {
            "/graphql": {
                target: "http://localhost:3000",
                secure: false
            }
        }
    },

    pluginOptions: {
        apollo: {
            timeout: 12000
        }
    }
};
