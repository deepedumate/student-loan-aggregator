import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
}

/**
 * Leadership Carousel Component - ChatJourney Theme Style
 *
 * Features:
 * - Clean theme-based design (no gradients)
 * - Auto-play carousel with manual controls
 * - Responsive grid layout
 * - Lucide React icons only
 * - Fully responsive
 */
const LeadershipCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth >= 1200) {
        setItemsPerSlide(4); // xl screens
      } else if (window.innerWidth >= 992) {
        setItemsPerSlide(3); // lg screens
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(2); // md screens
      } else {
        setItemsPerSlide(1); // sm and xs screens
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Paras Fatnani",
      title: "Chief Strategy Officer",
      image: "/Leadership/Paras.png",
    },
    {
      id: 2,
      name: "Sanjay Dhingra",
      title: "Chief Operating Officer",
      image: "/Leadership/SanjayDhingra.jpg",
    },
    {
      id: 3,
      name: "Sharang Dhaimade",
      title: "Chief Marketing Officer",
      image: "/Leadership/Sharang.png",
    },
    {
      id: 4,
      name: "Priyank Mehta",
      title: "Chief Business Officer",
      image: "/Leadership/PriyankMehta.jpeg",
    },
  ];

  const totalSlides = teamMembers.length;
  const autoSlideInterval = 3000; // 3 seconds

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentSlideMembers = () => {
    const members = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const index = (currentSlide + i) % teamMembers.length;
      members.push(teamMembers[index]);
    }
    return members;
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoSlideInterval]);

  // Pause on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="text-left lg:text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Our Values
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-3 sm:mb-4 md:mb-6">
            <span className="text-foreground">Our </span>
            <span className="text-primary">Leadership</span>
          </h2>

          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-primary lg:mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full"></div>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl lg:mx-auto">
            Experienced professionals dedicated to transforming education
            financing
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-card border border-border rounded-full shadow-md hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-primary z-10 hover:shadow-lg hover:border-primary/30 transition-all"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-card border border-border rounded-full shadow-md hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-primary z-10 hover:shadow-lg hover:border-primary/30 transition-all"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {getCurrentSlideMembers().map((member) => (
              <div key={member.id} className="flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                    {/* Profile Image */}
                    <div className="text-center mb-3 sm:mb-4 md:mb-6">
                      <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-2 sm:mb-3 md:mb-4">
                        <div className="absolute inset-0 bg-primary/20 rounded-full p-1">
                          <div className="bg-card rounded-full p-1 h-full w-full">
                            <div className="relative rounded-full overflow-hidden h-full w-full">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Name */}
                      <h4 className="font-bold text-base sm:text-lg md:text-xl text-foreground mb-1.5 sm:mb-2">
                        {member.name}
                      </h4>

                      {/* Title */}
                      <div className="bg-primary/10 border border-primary/20 rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 inline-block">
                        <p className="text-primary text-xs sm:text-sm font-medium">
                          {member.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              className={`rounded-full transition-all ${
                currentSlide === index
                  ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-primary"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-muted hover:bg-primary/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipCarousel;
