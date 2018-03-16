/* global fixture test */

import { Selector } from "testcafe";
import { pageUrl } from "../lib/pageUrl";

fixture("/feed").page(pageUrl("/feed"));

test("Should display at least one event", t =>
  t.expect(Selector(".event-feed-item").exists).ok());
