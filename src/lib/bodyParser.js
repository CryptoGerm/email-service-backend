import { json, urlencoded } from 'body-parser';

export default (app) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
};
