import { createServer as createHttpsServer } from 'https';
import next from 'next';
import fs from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app
  .prepare()
  .then(() => {
    const server = createHttpsServer(
      {
        key: fs.readFileSync('certs/localhost-key.pem'), // Path to your private key
        cert: fs.readFileSync('certs/localhost.pem'),    // Path to your certificate
      },
      (req, res) => handle(req, res)
    );

    return server.listen(PORT, (err) => {
      if (err) throw err;

      console.log('> Ready on https://localhost:3000');
    });
  })
  .catch((err) => {
    console.error(err);
  });
