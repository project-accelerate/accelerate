import * as React from 'react'
import { urlInfo } from '../lib/types';

export default function EventPage({ url }) {
  return <div>{url.query.id}</div>
}

EventPage.propTypes = {
  url: urlInfo('id').isRequired
}
