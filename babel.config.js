const { plugin } = process.env;

module.exports = {
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: { version: 3, proposals: true },
        shippedProposals: true,
        targets: { ie: 9 }
      }
    ],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: { version: 3, proposals: true },
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // 'transform-es2015-shorthand-properties',
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }]
  ]
};
