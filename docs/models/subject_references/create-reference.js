module.exports = {
    // operation's method
    post: {
      security: [{bearerAuth: []}],
      tags: ["Subject references"], // operation's tag
      description: "Create subject reference", // short desc
     // expected params
      requestBody: {
        required:true,
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  format: "url"
                },
                description: {
                  type: "string"
                } 
              }   
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Update subject with reference return nothing", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Subject_references",
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