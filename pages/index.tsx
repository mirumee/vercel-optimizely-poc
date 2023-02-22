import PageComponent from '../components/page_component'

const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})

export async function getServerSideProps({ res, req }) {
  // https://github.com/vercel/next.js/discussions/38650#discussioncomment-3148772
  let cookies = res.getHeader('set-cookie')
  cookies = cookies.map(parseCookie)
  cookies = cookies.reduce((acc, obj) => ({ ...acc, ...obj }), {})

res.setHeader(
    'Cache-Control',
    'public, s-maxage=500, stale-while-revalidate=60'
)

  return {
    props: { optimizely: cookies }, // will be passed to the page component as props
  }
}

const Home = ({ optimizely }) => {
  return (
    <PageComponent
      optimizely={optimizely}
      title="Optimizely A/B demo"
    />
  )
}

export default Home
