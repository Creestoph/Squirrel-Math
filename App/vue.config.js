module.exports = {
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    plugins: {
                        autoprefixer: {},
                    },
                },
            },
        },
    },
};
