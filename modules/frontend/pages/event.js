import * as React from 'react'
import { urlInfo } from '../lib/types';
import PageWrapper from '../components/Page';

export default function EventPage({ url }) {
  return <PageWrapper>{url.query.id}</PageWrapper>
}

EventPage.propTypes = {
  url: urlInfo('id').isRequired
}
