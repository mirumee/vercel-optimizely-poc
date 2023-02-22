# Feature Flags with Optimizely

This example shows how to use Optimizely to conduct experiments using Edge Middleware.
Based on vercel example, more details can be found [here](https://github.com/vercel/examples/tree/main/edge-middleware/feature-flag-optimizely)

Optimizely datafile may be pulled in two ways:
1. At build time. Check the scripts folder and `withOptimize` wrapper in next.config
2. From [edge config](https://vercel.com/docs/concepts/edge-network/edge-config).

## Demo

https://vercel-optimizely-poc.vercel.app

```
OPTIMIZELY_SDK_KEY=
EDGE_CONFIG=
EDGE_CONFIG_ID=
VERCEL_TEAM_ID=
VERCEL_TOKEN=
```
- EDGE_CONFIG - Can be obtained in Vercel > Edge Config > Tokens > Token item more > Copy Connection String.
- EDGE_CONFIG_ID - Id of the edge config store.
- VERCEL_TEAM_ID - Present in team settings. 
- VERCEL_TOKEN - Personal access token.
