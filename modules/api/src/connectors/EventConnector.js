import DataLoader from 'dataloader'
import { db, isGreaterThan, isLessThan, distanceFrom, pair, sortColumn, sortClauses, toCamelCase, fromCamelCase } from '../db'
import { dataloaderResult } from '../utils'

export default class EventConnector {
  /** Get a single event, or multiple events, by id */
  loader = new DataLoader(async (keys) => {
    const rows = await db
      .select('*')
      .from('event')
      .whereIn('id', keys)
      .then(toCamelCase)
    
    return dataloaderResult({ fromRows: rows, forKeys: keys })
  })

  /** Insert a new event into the database */
  async create(_, { event }) {
    await db('event').insert([fromCamelCase(event)])
  }

  /** Get events near to a location */
  nearbyEvents({ location, distanceInKM, startDate, startId, limit }) {
    const distanceInMeters = distanceFrom('location', location)

    return db
      .select('id', 'start_date', db.select(distanceInMeters).as('distance'))
      .from('event')
      .where(isLessThan(distanceInMeters, distanceInKM * 1000))
      .modify((q) => {
        if (startDate && startId) {
          q.andWhere(isGreaterThan(pair('start_date', 'id'), pair(new Date(startDate), startId)))
        }
      })
      .orderByRaw(sortClauses(sortColumn('start_date', 'asc'), sortColumn('id', 'asc')))
      .limit(limit)
      .then(toCamelCase)
  }
}
