This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, generate a self-signed cert for localhost development:

I recommend using [mkcert](https://www.npmjs.com/package/mkcert)

```bash
  choco install mkcert
mkcert -install

# from project root
mkdir certs
cd certs

# generate trusted cert for “localhost”
mkcert localhost
```

Then, create a debugging configuration in your IDE (e.g., VSCode) with the following settings:

```json
{
  "name": "Debug Custom Local Server",
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/scripts/create-local-server.js",
  "runtimeArgs": ["--inspect"],
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "console": "integratedTerminal",
  "skipFiles": ["<node_internals>/**"]
}
```

Next, run the debugging configuration in your IDE. This will start a custom local server that serves your Next.js application over HTTPS.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
