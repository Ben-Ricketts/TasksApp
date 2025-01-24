const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { transformer, resolver } = defaultConfig;

  return {
    transformer: {
      ...transformer,
      minifierConfig: {
        keep_classnames: true,
        keep_fnames: true,
        mangle: {
          keep_classnames: true,
          keep_fnames: true
        }
      }
    },
    resolver: {
      ...resolver,
      sourceExts: [...resolver.sourceExts, 'jsx', 'js', 'json']
    }
  };
})();
