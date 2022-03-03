module.exports = {
    servers: [
      {
        url: `${process.env.API_DOCS_SERVER}${process.env.API_URL_PREFIX}`, // url
        description: "Demo server", // name
      },
    ],
  };