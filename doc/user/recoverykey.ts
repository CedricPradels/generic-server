const recoveryKey = {
  post: {
    tags: ["User"],
    description: "Generate a recovery key and sent it per mail to the user",
    requestBody: {
      description: "Get the user email",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email"],
            properties: {
              email: { type: "string" },
            },
          },
          example: {
            email: "totoleharicot@danslepot.fr",
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
                emailSent: { type: "string" },
              },
            },
            example: {
              emailSent: "success",
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

export default recoveryKey;
