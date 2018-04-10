import { createAuthDirective } from "../createAuthDirective";
/* eslint-env jest */

describe("createAuthDirective", () => {
  const result = "result";
  const next = () => Promise.resolve(result);

  const testDirective = async (directive, context) =>
    directive(next, {}, {}, context);

  it("should throw when not logged in", async () => {
    const directive = createAuthDirective(() => true);

    await expect(testDirective(directive, {})).rejects.toHaveProperty(
      "message",
      "Authentication required"
    );
  });

  it("should throw when logged in without required claim", async () => {
    const directive = createAuthDirective(user => user.isAdmin);

    await expect(testDirective(directive, { user: {} })).rejects.toHaveProperty(
      "message",
      "Not authorized"
    );
  });

  it("should resolve when logged in with required claim", async () => {
    const directive = createAuthDirective(user => user.isAdmin);

    expect(await testDirective(directive, { user: { isAdmin: true } })).toBe(
      result
    );
  });
});
