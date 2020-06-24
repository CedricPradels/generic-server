const register = {
  post: {
    tags: ["User"],
    description: "Register new user",
    requestBody: {
      description: "New user information",
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
                id: { type: "string" },
              },
            },
            example: {
              email: "totoleharicot@danslepot.fr",
              id: "1234567890",
            },
          },
        },
      },
      "400": {
        description: "Error",
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
