module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false)

    config.plugin("html").tap(args => {
      args[0].title = "LRN Lab: Pain App Dashboard";
      return args;
    });
  }
};

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false)

    config.plugin("html").tap(args => {
      args[0].title = "LRN Lab: Pain App Dashboard";
      return args;
    });
  }
};

