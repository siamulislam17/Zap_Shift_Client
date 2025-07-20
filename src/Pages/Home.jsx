import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import CompanyMarque from './CompanyMarque';
import Features from './Features';
import BeMerchant from './BeMerchant';


const Home = () => {
     useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
    //   once: true, // animation only once when scrolling
    });
  }, []);
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <CompanyMarque></CompanyMarque>
            <Features></Features>
             
            <div data-aos="fade-up">
                <BeMerchant></BeMerchant>
            </div>
        </div>
    );
};

export default Home;