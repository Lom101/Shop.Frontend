import React from 'react';
import { Carousel, Container, Button } from 'react-bootstrap';

const MainCarousel = () => {
  const slides = [
    {
      src: "https://images.unsplash.com/photo-1508252568242-e0f383f753d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Ваш идеальный выбор!",
      description: "Найдите кроссовки, которые подчеркнут ваш стиль и комфорт в каждом шаге."
    },
    {
      src: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Следуйте за стилем!",
      description: "Откройте для себя тренды, которые сделают каждый ваш день особенным."
    },
    {
      src: "https://images.unsplash.com/photo-1512640122685-e77ab16ad8c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Кроссовки для любых приключений!",
      description: "Будьте готовы к новым вызовам с надежной и стильной обувью."
    }
  ];


  return (
      <Container fluid className="p-0">
        <Carousel interval={3000} fade>
          {slides.map((slide, index) => (
              <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={slide.src}
                    alt={`Слайд ${index + 1}`}
                    style={{ maxHeight: '85vh', objectFit: 'cover' }}
                />
                <Carousel.Caption className="flex flex-col items-center justify-center rounded-lg p-4 text-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{slide.caption}</h3>

                </Carousel.Caption>
              </Carousel.Item>
          ))}
        </Carousel>
      </Container>
  );
};

export default MainCarousel;
