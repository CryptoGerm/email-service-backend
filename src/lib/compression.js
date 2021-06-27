import compression from 'compression';

function shouldCompress(req, res) {
  return compression.filter(req, res);
}

export default (app) => {
  app.use(
    compression({
      filter: shouldCompress,
      level: 3,
      threshold: 512,
    })
  );
};
