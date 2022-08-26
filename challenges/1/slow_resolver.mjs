// —————————————————————————————————————————————————————————————————————————————
// Challenge: Slow resolver
// —————————————————————————————————————————————————————————————————————————————
// The function `loadUsers` is used within a GraphQL resolver but it introduces
// a huge latency when called repeatedly.
//
// Refactor this function to improve its response time.
//
// The `context` object exposes two database clients:
//
//   1. `db`: Emulates a database connection. It contains the user data but its
//      access is slow.
//
//   2. `redis`: Emulates a redis store which has a very low latency. When the
//      application starts, the store is empty. It must be used to cache the
//      database records.
//
// —————————————————————————————————————————————————————————————————————————————
// Hint: `Promise` defines functions to manipulate multiple promises at once.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// —————————————————————————————————————————————————————————————————————————————

/**
 * @template K,V
 * @typedef {import('#internal/table_mock').TableMock<K, V>} TableMock
 */

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {object} Context
 * @property {TableMock<number, User>} db
 * @property {TableMock<number, User>} redis
 */

/**
 * Loads users by their ID. If a user is not found, returns `null`.
 *
 * @param {Context} context The GraphQL context
 * @param {number[]} ids The user IDs to load
 * @returns {Promise<Array<User | null>>} The loaded users
 */
export async function loadUsers(context, ids) {
  let users = [];

  for (let id of ids) {
    // FIXME: Why is it so slow??!
    // TODO: Use `context.redis.get` and `context.redis.set`.
    // This might not be enough…
    let user = await context.db.get(id);
    users.push(user ?? null);
  }

  return users;
}
