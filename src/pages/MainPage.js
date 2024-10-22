import React from 'react';
import MainCarousel from '../components/MainCarousel';
import PromoBanner from "../components/PromoBanner";
import NewsSection from "../components/NewsSection";
import ReviewsSection from "../components/ReviewsSection";

const MainPage = () => {
    return (
        <div className="min-h-screen">
            <MainCarousel/>
            <PromoBanner/>
            <NewsSection/>
            <ReviewsSection/>
        </div>
    );
};

export default MainPage;