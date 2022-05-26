module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@domain": "./src/domain",
          "@application": "./src/application",
          "@infra": "./src/infra",
          "@presentation": "./src/presentation",
          "@main": "./src/main"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
}
