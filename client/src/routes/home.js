import Headline from '../components/home/Headline'
import Description from '../components/home/Description'
import Banner from '../components/home/Banner'
import Features from '../components/home/Features'
import GetStarted from '../components/home/GetStarted'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="mt-2 col-12 d-flex flex-column align-items-center justify-content-between h-100">
      <main className="col-12 d-flex flex-column align-items-center">
        <Headline/>
        <Description/>
        <Banner/>
        <Features/>
        <GetStarted/>
      </main>
      <Footer/>
    </div>
  )
}

export default Home