import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = [
  { name: 'main', path: '/' },
  { name: 'countries', path: '/countries' },
  { name: 'countries.country', path: '/:code' }
];

const configureRouter = () => {
  const router = createRouter(routes);
  router.usePlugin(browserPlugin());
  return router;
};

export default configureRouter;
