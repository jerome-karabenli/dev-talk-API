module.exports = {
  // method of operation
  get: {
    security: [{bearerAuth: []}],
    tags: ["Comment"],
    description: "Get comments [{}]", // operation's desc.
    
    responses: {
      // response code
      200: {
        description: "Return comments and populate author + subject path  [{}]", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Comment",
            },
          },
        },
      },

      401: {
        description: "Authorization missing", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
      // response code
      500: {
        description: "Server error", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
    },
  },
};