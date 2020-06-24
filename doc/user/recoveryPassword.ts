const recoveryPassword = {
  put: {
    tags: ["User"],
    description: "Change password with valid recovery key",
    parameters: [
      {
        name: "recoveryKey",
        in: "path",
        description: "Recovery key previously sent by mail",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      description: "New user password",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["newPassword"],
            properties: {
              newPassword: { type: "string" },
            },
          },
          example: {
            newPassword: "1234567",
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "User password reset. New password set.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                recovery: { type: "string" },
              },
            },
            example: {
              recovery: "success",
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

export default recoveryPassword;
