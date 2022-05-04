module.exports = {
    // 取消 ESLint 的自动检查
    lintOnSave: 'warning', // Or false

    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                changeOrigin: true,
            }
        }
    }
};
