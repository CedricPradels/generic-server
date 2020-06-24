const register = {
  post: {
    tags: ["User"],
    description: "Register new user",
    requestBody: {
      description: "New user informations",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string," },
            },
          },
          example: {
            email: "totoleharicot@danslepot.fr",
            password: "098765",
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "New user registered",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                token: { type: "string" },
                id: { type: "string" },
              },
            },
            example: {
              email: "totoleharicot@danslepot.fr",
              id: "1234567890",
              token: "0987654321",
            },
          },
        },
      },
      "400": {
        description: "Missing parameters",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "string" },
                statusCode: { type: "number" },
                message: { type: "string" },
              },
            },
            example: {
              message: "Missing email",
              statusCode: 400,
              status: "failed",
            },
          },
        },
      },
    },
  },
};

export default register;