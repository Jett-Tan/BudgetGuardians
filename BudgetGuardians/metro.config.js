const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push("js", "json", "ts", "tsx", "cjs");
module.exports = defaultConfig;
