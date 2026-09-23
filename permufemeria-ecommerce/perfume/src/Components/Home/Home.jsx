 
import { useEffect} from 'react'
import ProductList from '../ProductList/ProductList'
import Hero from '../Hero/Hero';
import Suscribe from '../Suscribe/Suscribe';
import 'aos/dist/aos.css';
import AOS from "aos";
import Gallery from '../Gallery/Gallery';
import NewProductList from '../NewProductList/NewProductList';
const Home = () => {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

 
 
  return (
    <>
  <Hero/>
  <ProductList/>
  <Gallery/>
  <NewProductList/>
    <Suscribe/>
    </>
  )
}

export default Home