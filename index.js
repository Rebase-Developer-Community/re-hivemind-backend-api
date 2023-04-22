import app from './src/app.js';
import appConfig from './src/appConfig.js';
import debug from 'debug';

const indexDebug = debug('app:index ->');
const { port } = appConfig;
(async () => {
  app.listen(port, () => {
    try {
      indexDebug(`Server is running on the http://localhost:${port}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
})();
