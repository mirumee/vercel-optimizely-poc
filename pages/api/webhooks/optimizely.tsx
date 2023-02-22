export default async function handler(req, res) {
  // Simple optimizely update config webhook example. It should also validate incoming webhooks:
  // https://docs.developers.optimizely.com/full-stack/docs/configure-webhooks#3-secure-your-webhook

  console.log('Received optimizely update webhook, updating edge config.')

  const response = await fetch(
    `https://cdn.optimizely.com/datafiles/${process.env.OPTIMIZELY_SDK_KEY}.json`,
    {
      method: 'GET',
    }
  )
  const datafile = await response.json()

  {
    const response = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items?teamId=${process.env.VERCEL_TEAM_ID}`,
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },

        body: JSON.stringify({
          items: [
            {
              operation: 'update',
              key: 'optimizelyDatafile',
              value: datafile,
            },
          ],
        }),
      }
    )
    if (response.ok) {
      console.log('Successfully updated edge config.')
    } else {
      console.log('Failed to update edge config.')
      console.log(await response.json())
    }
  }
}

export const config = {
  runtime: 'edge',
}
