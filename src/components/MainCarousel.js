import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

const MainCarousel = () => {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1518362165686-c587a1de1003?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Где бы ни были, мы всегда готовы!",
      description: "Присоединяйся к нам! Открой новые горизонты со своими любимыми кроссовками. Следуй за тропой комфорта и стиля!"
    },
    {
      src: "https://images.unsplash.com/photo-1496202703211-aa28e9500c30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Стиль на улицах!",
      description: "Здесь ты найдешь самые модные модели, готовые стать твоей любимой парой на долгие годы. Открой свой стиль!"
    },
    {
      src: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Где бы ни были, мы всегда рядом!",
      description: "Дай волю своей мечте! На нашей странице карусели ты найдешь идеальные спутники для любых приключений. Выбирай, покупай, радуйся!"
    }
  ];

  return (
      <Container fluid className="p-0"> {/* Убираем все отступы */}
        <Carousel interval={3000} fade>
          {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <img
                    className="d-block w-100 transition-transform duration-1000 ease-in-out"
                    src={slide.src}
                    alt={`Слайд ${index + 1}`}
                    style={{ maxHeight: '85vh', objectFit: 'cover' }}
                />
                <Carousel.Caption className="bg-gradient-to-b from-black/60 to-transparent rounded-lg p-4 animate-fadeIn transition-opacity duration-700 ease-in-out">
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-200 drop-shadow-lg">{slide.caption}</h3>
                  <p className="text-md md:text-lg text-gray-200 drop-shadow-md">{slide.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
          ))}
        </Carousel>
      </Container>
  );
};

export default MainCarousel;
