/* global fixture test */

import { Selector } from "testcafe";
import { pageUrl } from "../lib/pageUrl";

fixture("/feed").page(pageUrl("/feed"));

test("Should display events", async t => {
  const eventItem = Selector(".event");

  await t.expect(eventItem.exists).ok();
});
