module.exports = {
    // method of operation
    get: {
      security: [{bearerAuth: []}],
      tags: ["Subject"], // operation's tag.
      description: "Get all subjects or filter by user_id or title using query parameter [{}]", // operation's desc.
      parameters: [
        // expected params.
        {
          name: "author", // name of the param
          in: "query", // location of the param
          schema: {
            $ref: "#/components/schemas/_id", // data model of the param
          }, 
        },
        {
          name: "title", // name of the param
          in: "query", // location of the param
          description: "no need to exact title, regex is used" 
        },
      ],
      
      // expected responses
      responses: {
        // response code
        200: {
          description: "Return subjects with populated author path", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Subject",
              },
            },
          },
        },

        404: {
          description: "Subject not found", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error", // error data model
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