module.exports = (phase, { defaultConfig }) => {
  if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(
      `${process.env.PWD}/node_modules/canvas/build/Release:`
    )
  ) {
    process.env.LD_LIBRARY_PATH = `${
      process.env.PWD
    }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
  }

  return {
    ...defaultConfig,
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push("canvas");
      }
      return config;
    },
  };
};
