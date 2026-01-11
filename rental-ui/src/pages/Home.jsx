import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import CarComparison from '../components/CarComparison'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const { selectedCars, showComparison, setShowComparison, handleRemoveFromComparison } = useAppContext()
  
  return (
    <>
      {showComparison && (
        <CarComparison
          selectedCars={selectedCars}
          onRemove={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
          onAddMore={() => {
            setShowComparison(false)
            setTimeout(() => window.scrollTo(0, 0), 100)
          }}
        />
      )}
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <Newsletter />
    </>
  )
}

export default Home
