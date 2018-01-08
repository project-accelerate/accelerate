import uuid from 'uuid'
import { getId, getProperty, decodeCursor, encodeResultsPage } from '../utils'

export const Query = {
  eventFeed: async (_, { postcode, distanceInKM, cursor }, { connectors }) => {
    const limit = 10
    const { EventConnector, PostcodeConnector } = connectors

    const location = await PostcodeConnector.loader.load(postcode)
    if (!location) {
      throw new Error(`Invalid postcode: ${postcode}`)
    }

    const { startDate, startId } = decodeCursor(cursor, { defaultValue: {} }) 

    const events = await EventConnector.nearbyEvents({
      location,
      distanceInKM,
      limit: limit + 1,
      startDate,
      startId
    })

    return encodeResultsPage({
      limit,
      rows: events,
      getCursor: (id, date) => ({ startDate: date, startId: id })
    })
  }
}

export const Mutation = {
  async createEvent(_, { request }, { connectors }) {
    const { PostcodeConnector, EventConnector } = connectors
    const location = await PostcodeConnector.loader.load(request.postcode)
    
    if (!location) {
      throw new Error('Invalid postcode')
    }

    const event = {
      ...request,
      id: uuid(),
      location,
      startDate: new Date(request.startDate),
      endDate: new Date(request.endDate),
    }

    await EventConnector.create(event)

    return {
      event: event.id
    }
  }
}

export const Event = {
  id: getId(),
  title: getProperty({ connector: 'EventConnector' }),
  organiser: getProperty({ connector: 'EventConnector', transform: toISOString }),
  startDate: getProperty({ connector: 'EventConnector', transform: toISOString }),
  endDate: getProperty({ connector: 'EventConnector' }),
  shortDescription: getProperty({ connector: 'EventConnector', fromKey: 'description', transform: trimLength(255) }),
  longDescription: getProperty({ connector: 'EventConnector', fromKey: 'description' }),
  address: getProperty({ connector: 'EventConnector' }),
  postcode: getProperty({ connector: 'EventConnector' }),
  extraInformation: getProperty({ connector: 'EventConnector' }),
  suitabilityInformation: getProperty({ connector: 'EventConnector' }),
}

function trimLength(length) {
  return x => x.substr(0, length)
}

function toISOString(date) {
  return date.toISOString()
}