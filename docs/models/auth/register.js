

module.exports = {
  // operation's method
  post: {
    tags: ["Auth"], // operation's tag
    description: "Register", // short desc
    parameters: [], // expected params
    requestBody: {
      required: true,
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Register", // error data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Return access JWT", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              type: "object",
              properties: {
                jwtoken: {
                  type:"string",
                  format:"JWT",
                  exemple: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI1MDNlZDkzZWJhODJjODAxMTNhOTQiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjI5ODM2NjA1LCJleHAiOjE2Mjk4NDAyMDV9.3aSDQH1WQVKBpJZVOmmj3aCkZ9IpYS1Y6oahwTyiOOM"
                }
              }
            },
          },
        },
      },

      // response code
      401: {
        description: "Missing at least one field",
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