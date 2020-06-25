import { generateRecoveryKey, generateAuthenticationData } from ".";

describe("Authentication", () => {
  describe("Generate recovery key", () => {
    it("Return a string", () => {
      expect(typeof generateRecoveryKey()).toBe("string");
    });
    it("Return a string of length 32", () => {
      expect(generateRecoveryKey().length).toBe(32);
    });
  });
});
