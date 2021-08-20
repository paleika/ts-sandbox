import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes = [
  { name: 'main', path: '/' },
  { name: 'countries', path: '/countries' },
  { name: 'countries.country', path: '/countries/:code' }
];

const configureRouter = () => {
  const router = createRouter(routes, {
    defaultRoute: 'main',
  });
  router.usePlugin(browserPlugin());
  return router;
};

export default configureRouter;
