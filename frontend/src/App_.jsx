//import React from 'react'
import styles from './styles/styles.js'
import { Billing, CardDeal, Clients, CTA, Footer, Navbar, Hero, Stats, Testimonials } from './components/components'

const App_ = () => {
  return (
    <div className='bg-[#00040f] w-full h-full overflow-clip py-4'>
      <div id='home'>
        <div className={`${styles.paddingX} ${styles.flexCenter}}`}>
          <Navbar />
        </div>

        <div className={`${styles.paddingX}`}>
          <Hero />
          <Stats />
        </div>
      </div>

      <div className={`${styles.paddingX}`}>
        <div id='features'>
        { /* <Business />*/}
        </div>

        <div id='product'>
          <Billing />
          <CardDeal />
        </div>

        <div id='clients'>
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div>
    </div >
  )
}

export default App_