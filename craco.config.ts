const CracoLessPlugin = require("craco-less");

export default () => {
  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              math: { "parens-division": true },
              modifyVars: {
                "@layout-header-background": "#FF9A54",
                "@primary-color": "#376AFB",
              },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
};
