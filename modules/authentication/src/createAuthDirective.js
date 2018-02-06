/**
 * Create a GraphQL directive resolver for validating authorization claims
 * against the logged-in user when resolving a request.
 *
 * @param {Function} roleFilter
 *        Predicate from user object to boolean indicating whether to allow
 *        the request.
 */
export function createAuthDirective(roleFilter) {
  return (next, source, args, context) => {
    const { user } = context;

    if (!user) {
      throw Error("Authentication required");
    }

    if (!roleFilter(user)) {
      throw Error("Not authorized");
    }

    return next();
  };
}
