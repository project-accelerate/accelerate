import React from 'react'
import PropTypes from 'prop-types'

export default function Hero({ header, subheader, controls }) {
  return (
    <section className="root">
      <style jsx>
        {`
          .root {
            position: relative;
            border-bottom: 2px solid red;
            height: 66vh;
          
            color: white;
            text-align: center;
          }

          .bg {
            filter: blur(3px);
            position: absolute;
            z-index: -1;
          
            background-image: url('/static/get-involved.jpg');
            background-position: bottom center;
            background-size: cover;
            width: 100%;
            height: 100%;
          }

          .spacer {
            display: block;

            width: 100%;
          }

          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            background-color: rgba(200,50,50,0.1);
            width: 100%;
            height: 100%;
          }

          h1 {
            margin: 0;
            margin-bottom: 0.5rem;
        
            font-size: 2.5rem;
            text-transform: uppercase;
        
            text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
          }
          
          h2 {
            margin: 0;
        
            font-weight: 400;
        
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          }

          .controls {
            margin-top: 2rem;
          }
        `}
      </style>
      <div className="bg" />
      <div className="content">
        <span className="spacer" />
        <h1>{header}</h1>
        <h2>{subheader}</h2>
        <div className="controls">
          {controls}
        </div>
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
