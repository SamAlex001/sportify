import { useRef } from "react";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import '@mantine/carousel/styles.css';
import "../styles/carousel.css";
import NBA from '../assets/nba.webp';
import Baseball from '../assets/baseball.jpg';
import Football from '../assets/football.webp';
import Cricket from '../assets/cricket.webp';
import F1 from '../assets/f1.jpg';
import Nascar from '../assets/nascar.jpg';
import MMA from '../assets/mma.jpg';
import Boxing from '../assets/boxing.jpg';


const images = [
  { id: 1, image: NBA, title: "NBA" },
  { id: 2, image: Baseball, title: "Baseball" },
  { id: 3, image: Football, title: "Football" },
  { id: 4, image: Cricket, title: "Cricket" },
  { id: 5, image: F1, title: "F1" },
  { id: 6, image: Nascar, title: "Nascar" },
  { id: 7, image: MMA, title: "MMA" },
  { id: 8, image: Boxing, title: "Boxing" }
];


const HomeCarousel = () => {

  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slide = images.map((item) => (
    <Carousel.Slide className="home-carousel-slide overflow-hidden" key={item.id}>
      <img src={item.image} alt="carousel_img" className="home-carousel-images w-[100%] h-[80%] rounded-[10px]" />
    </Carousel.Slide>
  ))

  return (
    <div className="carousel-header">
      <Carousel
        withIndicators={false}
        withControls={false}
        plugins={[autoplay.current]}
        controlSize={36}
        slideSize={{ sm: '50%' }}
        slideGap={"md"}
        emblaOptions={{
          loop: true,
          dragFree: false,
          align: 'center'
        }}
        className="home-carousel"
      >
        {slide}
      </Carousel >
    </div >
  );
};

export default HomeCarousel;