
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0 ",
    "info": {
      "title": "Dev-Talk API",
      "version": "1.1.0",
      "contact": {
        "name": "Jerome KARABENLI",
        "email": "contact@jerome-karabenli.fr",
        "url": "https://jerome-karabenli.fr"
      }
    },
    "servers": [
      {
        "description": "Local server"
      }
    ],
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      },
      "schemas": {
        "_id": {
          "type": "string",
          "format": "object_id",
          "description": "An mongo id",
          "example": "45cbc4a0e4123f6920000002"
        },
        "Login": {
          "type": "object",
          "required": [
            "pseudo",
            "password"
          ],
          "properties": {
            "pseudo": {
              "type": "string",
              "description": "user's used pseudo for registration",
              "exemple": "jeroka"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "user's clear password must have minimum 8 char, 1 lowercase, 1 uppercase, 1 number",
              "exemple": "Test1234"
            }
          },
          "description": "Login required infos"
        },
        "Register": {
          "type": "object",
          "description": "Registration required infos",
          "required": [
            "pseudo",
            "lastname",
            "firstname",
            "email",
            "password",
            "passwordConfirm"
          ],
          "properties": {
            "pseudo": {
              "type": "string",
              "description": "user's pseudo",
              "exemple": "jeroka"
            },
            "lastname": {
              "type": "string",
              "description": "user's lastname",
              "exemple": "fisher"
            },
            "firstname": {
              "type": "string",
              "description": "user's firstname",
              "exemple": "bob"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "user's used email for registration",
              "exemple": "bob@exemple.com"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 number",
              "exemple": "Test1234"
            },
            "passwordConfirm": {
              "type": "string",
              "format": "password",
              "description": "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 number",
              "exemple": "Test1234"
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "format": "object_id",
              "description": "_id",
              "example": "45cbc4a0e4123f6920000002"
            },
            "pseudo": {
              "type": "string",
              "description": "pseudo",
              "example": "catman"
            },
            "lastname": {
              "type": "string",
              "description": "lastname",
              "example": "fisher"
            },
            "firstname": {
              "type": "string",
              "description": "firstname",
              "example": "bob"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "email",
              "example": "bob@exemple.com"
            },
            "password": {
              "type": "string",
              "format": "password",
              "description": "hashed password",
              "example": "Mypassword123+"
            },
            "picture": {
              "type": "string",
              "format": "url",
              "default": "null",
              "description": "url for picture",
              "example": "https://my-image.jpg"
            },
            "role": {
              "type": "array<string>",
              "description": "user's role",
              "default": "[user]",
              "example": "[user, moderator]"
            },
            "subjects": {
              "type": "array<object_id>",
              "description": "user's subjects",
              "default": "null",
              "example": "[45cbc4a0e4123f6920000002, 45cbc4a0e4123f6920000002]"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "Subject creation date",
              "example": "2021-08-24T07:12:23.245Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "Subject update date",
              "example": "2021-08-24T07:12:23.245Z"
            }
          }
        },
        "Subject": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "format": "object_id",
              "description": "Subject identification",
              "example": "45cbc4a0e4123f6920000002"
            },
            "author": {
              "type": "string",
              "format": "object_id",
              "description": "Author identification",
              "example": "45cbc4a0e4123f6920000002"
            },
            "title": {
              "type": "string",
              "description": "Subject title",
              "example": "catman"
            },
            "description": {
              "type": "string",
              "description": "Subject description",
              "example": "fisher"
            },
            "references": {
              "type": "array<object>",
              "description": "Subject references",
              "example": "[{url:https://exemple.com, description: this is an exemple}]"
            },
            "date": {
              "type": "string",
              "format": "date-time",
              "description": "Subject presentation date",
              "example": "2021-08-24T07:12:23.245Z"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "Subject creation date",
              "example": "2021-08-24T07:12:23.245Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "Subject update date",
              "example": "2021-08-24T07:12:23.245Z"
            }
          }
        },
        "Subject_references": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "format": "object_id",
              "description": "Reference identification",
              "example": "45cbc4a0e4123f6920000002"
            },
            "url": {
              "type": "string",
              "description": "reference url",
              "example": "https://exemple.com"
            },
            "description": {
              "type": "string",
              "description": "Reference short description",
              "example": "this is an exemple"
            }
          }
        },
        "Comment": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "format": "object_id",
              "description": "Comment identification",
              "example": "45cbc4a0e4123f6920000002"
            },
            "body": {
              "type": "string",
              "description": "Comment body",
              "example": "this is an exemple"
            },
            "author": {
              "type": "string",
              "format": "object_id",
              "description": "User id",
              "example": "45cbc4a0e4123f6920000002"
            },
            "subject": {
              "type": "string",
              "format": "object_id",
              "description": "Subject id",
              "example": "45cbc4a0e4123f6920000002"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time",
              "description": "Comment creation date",
              "example": "2021-08-24T07:12:23.245Z"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time",
              "description": "Comment update date",
              "example": "2021-08-24T07:12:23.245Z"
            }
          }
        },
        "Error": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Error message"
            }
          }
        }
      }
    },
    "tags": [
      {
        "name": "Auth"
      },
      {
        "name": "User"
      },
      {
        "name": "Subject"
      },
      {
        "name": "Subject references"
      },
      {
        "name": "Comment"
      }
    ],
    "paths": {
      "/user": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "User"
          ],
          "description": "Get logged user, user ID is automaticly send throught token in request headers {}",
          "responses": {
            "200": {
              "description": "Return user without password field and if user have subjects they are populated",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "patch": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "User"
          ],
          "description": "Update logged user, user ID is send automaticly through token in request headers {}",
          "requestBody": {
            "description": "at least one field is requiered",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "pseudo": {
                      "type": "string"
                    },
                    "lastname": {
                      "type": "string"
                    },
                    "firstname": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string",
                      "format": "email"
                    },
                    "picture": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return updated user without password field and populate subject field",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "put": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "User"
          ],
          "description": "Update password of logged user, user ID is send automaticly through token in request headers {}",
          "requestBody": {
            "description": "all fields are required",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "oldPassword": {
                      "type": "string"
                    },
                    "newPassword": {
                      "type": "string"
                    },
                    "newPasswordConfirm": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return updated user without password field and populate subject field",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "User"
          ],
          "description": "Delete logged user, user ID is automaticly send throught token in request headers",
          "responses": {
            "200": {
              "description": "User deleted"
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "User not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/subject": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject"
          ],
          "description": "Get all subjects or filter by user_id or title using query parameter [{}]",
          "parameters": [
            {
              "name": "author",
              "in": "query",
              "schema": {
                "$ref": "#/components/schemas/_id"
              }
            },
            {
              "name": "title",
              "in": "query",
              "description": "no need to exact title, regex is used"
            }
          ],
          "responses": {
            "200": {
              "description": "Return subjects with populated author path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Subject"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject"
          ],
          "description": "Create subject {}",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "author": {
                      "$ref": "#/components/schemas/_id"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return new subject",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Subject"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject author not found or missing field",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/subject/{_id}": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject"
          ],
          "description": "Get a subject {}",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Return subject and populated author path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Subject"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "patch": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject"
          ],
          "description": "Update subject {}",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "requestBody": {
            "description": "at least one field is requiered",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "return updated subject and populate author path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Subject"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject"
          ],
          "description": "Delete subject",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Subject is deleted"
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "subject/{_id}/reference": {
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject references"
          ],
          "description": "Create subject reference",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string",
                      "format": "url"
                    },
                    "description": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update subject with reference return nothing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Subject_references"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Subject references"
          ],
          "description": "Delete subject reference",
          "parameters": [
            {
              "name": "url",
              "in": "path",
              "schema": {
                "content": "application/json",
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string"
                  }
                }
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Subject reference is deleted"
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/comment": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Comment"
          ],
          "description": "Get comments [{}]",
          "responses": {
            "200": {
              "description": "Return comments and populate author + subject path  [{}]",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "post": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Comment"
          ],
          "description": "Create comment {}",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "body": {
                      "type": "string"
                    },
                    "author": {
                      "$ref": "#/components/schemas/_id"
                    },
                    "subject": {
                      "$ref": "#/components/schemas/_id"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return new comment and populate author path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Author or Subject not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/comment/{_id}": {
        "get": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Comment"
          ],
          "description": "Get a comment {}",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Return comment and populate author path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Comment not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "patch": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Comment"
          ],
          "description": "Update comment {}",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "requestBody": {
            "description": "at least one field is requiered",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "body": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return updated comment and populate author's path",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  }
                }
              }
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Comment is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "tags": [
            "Comment"
          ],
          "description": "Delete comment",
          "parameters": [
            {
              "name": "_id",
              "in": "path",
              "schema": {
                "$ref": "#/components/schemas/_id"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Comment is deleted"
            },
            "401": {
              "description": "Authorization missing",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              "description": "Comment is not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/login": {
        "post": {
          "tags": [
            "Auth"
          ],
          "description": "Login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Login"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return access JWT",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "jwtoken": {
                        "type": "string",
                        "format": "JWT",
                        "exemple": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI1MDNlZDkzZWJhODJjODAxMTNhOTQiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjI5ODM2NjA1LCJleHAiOjE2Mjk4NDAyMDV9.3aSDQH1WQVKBpJZVOmmj3aCkZ9IpYS1Y6oahwTyiOOM"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found or pseudo/password not matching",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/register": {
        "post": {
          "tags": [
            "Auth"
          ],
          "description": "Register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Register"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return access JWT",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "jwtoken": {
                        "type": "string",
                        "format": "JWT",
                        "exemple": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI1MDNlZDkzZWJhODJjODAxMTNhOTQiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjI5ODM2NjA1LCJleHAiOjE2Mjk4NDAyMDV9.3aSDQH1WQVKBpJZVOmmj3aCkZ9IpYS1Y6oahwTyiOOM"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Missing at least one field",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/recovery": {
        "post": {
          "tags": [
            "Auth"
          ],
          "description": "Lost Password",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "pseudo": {
                      "type": "string",
                      "description": "used pseudo for registration"
                    },
                    "lastname": {
                      "type": "string",
                      "description": "used lastname for registration"
                    },
                    "firstname": {
                      "type": "string",
                      "description": "used firstname for registration"
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "used email for registration"
                    },
                    "newPassword": {
                      "type": "string"
                    },
                    "newPasswordConfirm": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return access JWT",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "jwtoken": {
                        "type": "string",
                        "format": "JWT",
                        "exemple": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI1MDNlZDkzZWJhODJjODAxMTNhOTQiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNjI5ODM2NjA1LCJleHAiOjE2Mjk4NDAyMDV9.3aSDQH1WQVKBpJZVOmmj3aCkZ9IpYS1Y6oahwTyiOOM"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "User not found or pseudo/password not matching",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              "description": "Server error",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
