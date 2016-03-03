function __INLINE__split(module) {
  return (location, cb) => {
    require.ensure([], require => {
      cb(null, require(module).default);
    });
  };
}
__INLINE__split('./app/explore/Explore');
