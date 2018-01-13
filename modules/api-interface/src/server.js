import { Environment, Store, RecordSource } from 'relay-runtime'
import { Network } from 'relay-local-schema'
import { createSchema, createContext } from 'accelerate-api'

export default function initEnvironment({ records = {} } = {}) {
  const network = Network.create({
    schema: createSchema(),
    contextValue: createContext()
  })

  return new Environment({
    network,
    store: new Store(new RecordSource(records))
  })
}
