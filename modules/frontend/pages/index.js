import React from 'react'
import Hero from '../components/Hero/Hero'
import PageWrapper from '../components/Page';

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero
        header="Get Involved!"
        subheader="Find and join with people organising near you"
      />
    </PageWrapper>
  )
}
