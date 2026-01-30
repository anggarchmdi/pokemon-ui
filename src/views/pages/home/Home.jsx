import React from 'react'
import HeroSection from './section/HeroSection'
import SliderSection from './section/SliderSection'
import FeatureSection from './section/FeatureSection'
import RandomSection from './section/RandomSection'
import CTASection from './section/CTASection'
import Floating from '../../../layouts/components/Floating'
import Footer from '../../../layouts/components/Footer'

function Home() {
  return (
    <div className="bg-white">
      <Floating />
      <HeroSection />
      <SliderSection />
      <FeatureSection />
      <RandomSection />
      <CTASection />
      <Footer />
    </div>
  )
}

export default Home