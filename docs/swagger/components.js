module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // id model
      _id: {
        type: "string",
        format: "object_id",
        description: "An mongo id", // desc
        example: "45cbc4a0e4123f6920000002", // example of an id
      },

      Login: {
        type: "object",
        required: ["pseudo","password"],
        properties: {
          pseudo:{
            type: "string",
            description: "user's used pseudo for registration",
            exemple: 'jeroka'
          },
          password: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, 1 lowercase, 1 uppercase, 1 number",
            exemple: 'Test1234'
          },
        },
        description: "Login required infos",
      },


      Register: {
        type: "object",
        description: "Registration required infos",
        required: ["pseudo", "lastname", "firstname", "email", "password", "passwordConfirm"],
        properties: {
          pseudo:{
            type: "string",
            description: "user's pseudo",
            exemple: 'jeroka'
          },
          lastname:{
            type: "string",
            description: "user's lastname",
            exemple: 'fisher'
          },
          firstname:{
            type: "string",
            description: "user's firstname",
            exemple: 'bob'
          },
          email:{
            type: "string",
            format: "email",
            description: "user's used email for registration",
            exemple: 'bob@exemple.com'
          },
          password: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 number",
            exemple: 'Test1234'
          },
          passwordConfirm: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 number",
            exemple: 'Test1234'
          },
        },
      },

      User: {
        type: "object", 
        
        properties: {
          _id: {
            type: "string",
            format: "object_id",
            description: "_id", // desc
            example: "45cbc4a0e4123f6920000002", // example of an id,
          },
          pseudo: {
            type: "string", // data-type
            description: "pseudo", // desc
            example: "catman", // example of a title
          },
          lastname: {
            type: "string", // data-type
            description: "lastname", // desc
            example: "fisher", // example of a title
          },
          firstname: {
            type: "string", // data-type
            description: "firstname", // desc
            example: "bob", // example of a title
          },
          email: {
            type: "string",
            format: "email",
            description: "email", // desc
            example: "bob@exemple.com", // example of a title
          },
          password: {
            type: "string",
            format: "password",
            description: "hashed password", // desc
            example: "Mypassword123+", // example of a title
          },
          picture: {
            type: "string",
            format: "url",
            default: "null",
            description: "url for picture", // desc
            example: "https://my-image.jpg", // example of a completed value
          },
          role: {
            type: "array<string>", // data-type
            description: "user's role", // desc
            default: "[user]",
            example: '[user, moderator]', // example of a title
          },
          subjects: {
            type: "array<object_id>", // data-type
            description: "user's subjects", // desc
            default: "null",
            example: '[45cbc4a0e4123f6920000002, 45cbc4a0e4123f6920000002]', // example of a title
          },
          createdAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
          
        },
      },

      Subject: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string",
            format: "object_id",
            description: "Subject identification", // desc
            example: "45cbc4a0e4123f6920000002", // example of an id
          },
          author: {
            type: "string",
            format: "object_id",
            description: "Author identification", // desc
            example: "45cbc4a0e4123f6920000002", // example of an id
          },
          title: {
            type: "string", // data-type
            description: "Subject title", // desc
            example: "catman", // example of a title
          },
          description: {
            type: "string", // data-type
            description: "Subject description", // desc
            example: "fisher", // example of a title
          },
          references: {
            type: "array<object>", // data-type
            description: "Subject references", // desc
            example: "[{url:https://exemple.com, description: this is an exemple}]",
          },
          date: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject presentation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          createdAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
        },
      },

      Subject_references: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string",
            format: "object_id",
            description: "Reference identification", // desc
            example: "45cbc4a0e4123f6920000002", // example of an id
          },
          url: {
            type: "string",
            description: "reference url", // desc
            example: "https://exemple.com", // example of an id
          },
          description: {
            type: "string", // data-type
            description: "Reference short description", // desc
            example: "this is an exemple", // example of a title
          },
        },
      },

      Comment: {
        type: "object", // data type
        properties: {
          _id: {
            type: "string", // data-type
            format: "object_id",
            description: "Comment identification", // desc
            example: "45cbc4a0e4123f6920000002", // example of an id
          },
          body: {
            type: "string", // data-type
            description: "Comment body", // desc
            example: "this is an exemple", // example of a title
          },
          author: {
            type: "string", // data-type
            format: "object_id",
            description: "User id", // desc
            example: "45cbc4a0e4123f6920000002", // example of a title
          },
          subject: {
            type: "string", // data-type
            format:'object_id',
            description: "Subject id", // desc
            example: "45cbc4a0e4123f6920000002", // example of a title
          },
          createdAt: {
            type: "string", // data-type,
            format: "date-time",
            description: "Comment creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Comment update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
        },
      },

      

      

    
      Error: {
        type: "object", 
        properties: {
          message: {
            type: "string", 
            example: "Error message", 
          } 
        },
      },
    },
  },
  
};