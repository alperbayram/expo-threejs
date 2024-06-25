// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  sourceExts: ["js", "jsx", "json", "ts", "tsx", "cjs"],
  assetExts: ["glb", "gltf", "mtl", "obj", "png", "jpg"],
};

module.exports = config;