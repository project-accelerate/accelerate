import { Node } from "./Node";

export class Event extends Node {
  static async create(props, context) {
    const { PostcodeConnector, EventTableConnector } = context.connectors;
    const { postcode, ...otherProps } = props;

    const location = await PostcodeConnector.getById(postcode);

    if (!location) {
      throw new Error("Invalid postcode");
    }

    const { latitude, longitude } = location;

    const data = await EventTableConnector.create({
      location: { latitude, longitude },
      postcode,
      ...otherProps
    });

    return new Event(data, context);
  }

  get longDescription() {
    return this.description;
  }

  get shortDescription() {
    return this.description.then(desc => desc.substr(0, 255));
  }
}

Event.getFieldsFromConnector("EventTableConnector", [
  "title",
  "organiser",
  "startDate",
  "endDate",
  "description",
  "address",
  "postcode",
  "extraInformation",
  "suitabilityInformation"
]);
