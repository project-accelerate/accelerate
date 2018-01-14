import * as React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../components/Page';

export default function EventPage({ url }) {
  return <PageWrapper>{url.query.id}</PageWrapper>
}

EventPage.propTypes = {
  url: PropTypes.object.isRequired
}
