import React from 'react'
import './style.scss'
import CalculateCF from './CalculateCF'
import Events from './Events'
import HomeBanner from './HomeBanner'

const index = () => {
  return (
    <>
      <HomeBanner />
      <CalculateCF />
      <Events />
    </>
  )
}

export default index
