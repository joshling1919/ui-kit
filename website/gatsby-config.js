module.exports = {
  siteMetadata: {
    title: `ui-kit`,
    description: `UI component library based on our Design System`,
    author: `commercetools`,
    navbarLinks: [
      {
        label: 'Getting started',
        subgroup: [
          { label: 'Installation', linkTo: '/getting-started/installation' },
          { label: 'Usage', linkTo: '/getting-started/usage' },
        ],
      },
      {
        label: 'Components API',
        subgroup: [
          { label: 'Typography', linkTo: '/components/typography' },
          {
            label: 'Fields',
            subgroup: [
              {
                label: 'DateTimeField',
                linkTo: '/components/fields/date-time',
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
        ignore: ['.js'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/../src/components/`,
        ignore: ['.js'],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `ui-kit`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `ui-kit`,
        icon: `${__dirname}/src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-emotion`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
