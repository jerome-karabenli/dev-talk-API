module.exports = {
    // operation's method
    get: {
      security: [{bearerAuth: []}],
      tags: ["User"], // operation's tag.
      description: "Get logged user, user ID is automaticly send throught token in request headers {}", // operation's desc.

      responses: {
        // response code
        200: {
          description: "Return user without password field and if user have subjects they are populated", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
        404: {
          description: "User not found",
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error", // error data model
              },
            },
          },
        },
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