import React from 'react'
import Button from 'material-ui/Button/Button';
import Paper from 'material-ui/Paper/Paper';
import Hero from '../components/Hero/Hero'
import PageWrapper from '../components/Page';

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero
        fullscreen
        header="Get Involved!"
        subheader="Find and join with people organising near you"
        controls={
          <Paper square elevation={5} style={{ whitespace: 'nowrap', paddingLeft: '1rem', opacity: '0.8' }}>
            Showing meetups near <strong>BN2</strong> <Button>Change</Button>
          </Paper>
        }
      />
    </PageWrapper>
  )
}
