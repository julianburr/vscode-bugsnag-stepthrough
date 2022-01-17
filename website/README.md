# Website for the VS Code Bugsnag Extension

The website is built using [Next](https://nextjs.org/), primarily to allow for the API routes needed to work around CORS issues with the Bugsnag API.

## API Endpoints

All endpoints are basically just forwarding to the respective Busgnag API endpoint. There is no data being stored.

- `GET /user/organisations`
- `GET /organisations/:orgId/projects`
- `GET /projects/:projectId/errors`
- `GET /projects/:projectId/errors/:errorId/trend`
- `GET /errors/:errorId/latest_event`

## CI/CD

Github Actions run linting and tests on every PR, as well as deployment via [Vercel](https://vercel.com/) whenever any changes to the website are merged into `main`.

## Development

```bash
# Clone repo
git clone git@github.com:julianburr/vscode-bugsnag-stepthrough.git
cd vscode-bugsnag-stepthrough

# Install dependencies
yarn
cd website

yarn start  # start dev server
yarn build  # build production bundle
yarn lint  # run eslint
yarn typecheck  # runs tsc
```
