import { createAuthDirective } from "./createAuthDirective";

export const authDirectives = {
  isRegistered: createAuthDirective(() => true)
};
