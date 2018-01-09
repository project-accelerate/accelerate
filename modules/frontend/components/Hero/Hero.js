import React from 'react'
import PropTypes from 'prop-types'

export default function Hero({ header, subheader, controls }) {
  return (
    <section className="root">
      <style jsx>
        {`
          .root {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          
            height: 66vh;
            background-image: url('/static/get-involved.jpg');
            background-position: bottom center;
            background-size: cover;
          
            color: white;
          }

          .spacer {
            flex: 1;
          }

          h1 {
            margin: 0;
            margin-bottom: 0.5rem;
        
            font-size: 3rem;
            text-transform: uppercase;
        
            text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
          }
          
          h2 {
            margin: 0;
        
            font-weight: 400;
        
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }

          .controls {
            margin-top: 2rem;
            flex: 1;
          }
        `}
      </style>
      <span className="spacer" />
      <h1>{header}</h1>
      <h2>{subheader}</h2>
      <div className="controls">
        {controls}
      </div>
    </section>
  )
}

Hero.propTypes = {
  header: PropTypes.node,
  subheader: PropTypes.node,
  controls: PropTypes.node,
}

Hero.defaultProps = {
  header: PropTypes.null,
  subheader: PropTypes.null,
  controls: PropTypes.null,
}
