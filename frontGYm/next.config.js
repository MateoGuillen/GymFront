module.exports = {
    async redirects() {
      return [
        
            {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        /*{
            source: '/',
            destination: '/login',
            permanent: true,
          },*/

          /*{
            source: '/',
            has: [req.headers.authorization.split(" ")[1]
              {
                type: 'header',
                key: 'host',
                value: 'localhost:3000',
              },
            ],
            permanent: false,
            destination: '/login',
          },*/
       /* // if the header `x-redirect-me` is present,
        // this redirect will be applied
        {
          source: '/pagos',
          has: [
            {
              type: 'header',
              key: 'authorization',
            },
          ],
          permanent: false,
          destination: '/clientes',
        },
        // if the source, query, and cookie are matched,
        // this redirect will be applied
        
        {
          source: '/pagos',
          has: [
            {
              type: 'header',
              key: 'x-authorized',
              value: '(?<authorized>yes|true)',
            },
          ],
          permanent: false,
          destination: '/home?authorized=:authorized',
        },*/
        
      ]
    },
  }