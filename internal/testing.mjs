// —————————————————————————————————————————————————————————————————————————————
// DO NOT EDIT THIS FILE!
// —————————————————————————————————————————————————————————————————————————————

import { setTimeout } from "node:timers/promises";

export async function timeout(delay, callback) {
  await Promise.race([
    setTimeout(delay).then(() => {
      let err = new Error(`Expected function to complete within ${delay} ms`);
      Error.captureStackTrace(err, timeout);
      throw err;
    }),
    callback(),
  ]);
}
