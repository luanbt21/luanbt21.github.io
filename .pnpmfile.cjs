module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies && pkg.dependencies['motion-dom']) {
        pkg.dependencies['motion-dom'] = '12.39.0';
      }
      if (pkg.dependencies && pkg.dependencies['framer-motion']) {
        pkg.dependencies['framer-motion'] = '12.39.0';
      }
      return pkg;
    }
  }
};
