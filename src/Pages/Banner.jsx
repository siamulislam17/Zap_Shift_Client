import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import bannerImgOne from '../assets/banner/banner1.png';
import bannerImgTwo from '../assets/banner/banner2.png';
import bannerImgThree from '../assets/banner/banner3.png';

const Banner = () => {
    return (
        <div className='py-5 px-3  md:mb-25 md:mt-15 max-w-7xl mx-auto'>
            <Carousel showThumbs={false} interval={2800} swipeable={true}  autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={bannerImgOne} />
                    
                </div>
                <div>
                    <img src={bannerImgTwo} />
                    
                </div>
                <div>
                    <img src={bannerImgThree} />
                    
                </div>
            </Carousel>
            
        </div>
    );
};

export default Banner;