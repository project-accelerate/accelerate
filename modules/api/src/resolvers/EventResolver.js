import { getNode, resolversForNode } from "../lib/resolverUtils";
import { Event } from "../domain/Event";
import { EventFeed } from "../domain/EventFeed";

export default {
  Query: {
    event: getNode(),

    eventFeed(_, params, context) {
      return EventFeed.forPostcode(params, context);
    }
  },

  Mutation: {
    async createEvent(_, { request }, context) {
      return {
        event: await Event.create(request, context)
      };
    }
  },

  Event: resolversForNode(Event)
};
