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
                "@primary-color": "#F2B90C",
                "@layout-header-background": "@primary-color",
                "@font-size-base": "16px",
                "@padding-sm": "16px",

                "@height-base": "40px",
                "@height-lg": "56px",
                "@height-sm": "32px",
              },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
};
