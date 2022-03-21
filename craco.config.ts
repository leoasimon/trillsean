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
                "@body-background": "#f5f7f9",

                "@primary-color": "#F2B90C",
                "@layout-header-background": "@primary-color",
                "@font-size-base": "18px",
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
