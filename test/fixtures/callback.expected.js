
(location, cb) => {
  require.ensure([], require => {
    cb(null, require('./app/explore/Explore').default);
  });
};