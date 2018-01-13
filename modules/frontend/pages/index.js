import React from 'react'
import Router from 'next/router'
import lorem from 'lorem-ipsum'
import Hero from '../components/Hero/Hero'
import PageWrapper from '../components/Page';
import { CardTitle, Card } from '../components/Card/Card';

export default function HomePage() {
  const handleEnter = (event) => {
    event.preventDefault()
    Router.push({
      pathname: '/feed',
      query: { postcode: event.currentTarget.querySelector('input').value }
    })
  }

  return (
    <PageWrapper>
      <Hero
        header="Get Involved!"
        subheader="Find and join with people organising near you"
      />
      <Card>
        <CardTitle>Momentum can connect you with meetups, campaign groups and unions near you</CardTitle>
        <p>{lorem({ count: 5 })}</p>
        <h4>Enter your postcode to get started:</h4>
        <form onSubmit={handleEnter}>
          <input />
        </form>
      </Card>
    </PageWrapper>
  )
}
