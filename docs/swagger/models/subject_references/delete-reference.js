module.exports = {
    // operation's method.
    delete: {
      security: [{bearerAuth: []}],
      tags: ["Subject references"], // operation's tag
      description: "Delete subject reference", // short desc
      parameters: [
        // expected parameters
        {
          name: "url", // name of param
          in: "path", // location of param
          schema: {
            content: "application/json",
            type: "object",
            properties: {
                url: {
                    type: "string",
                }
            }
          },
          required: true, // mandatory
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "Subject reference is deleted", // response desc.
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
          description: "Subject not found",
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