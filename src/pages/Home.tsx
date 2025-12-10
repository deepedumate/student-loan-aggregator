import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HomeHero";
import WhyEdumate from "@/components/home/Whyedumate";
import ProcessSteps from "@/components/home/ProcessSteps";
import StudyAbroadSection from "@/components/home/Studyabroadsection";
import Universities from "@/components/home/Universities";
import LendingPartnersSlider from "@/components/home/LendingPartnersSlider";
import ToolsShowcaseSection from "@/components/home/ToolsShowcaseSection";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative py-10 lg:py-18">
        <HeroSection />
      </section>
      <section className="relative py-10 lg:py-18">
        <ToolsShowcaseSection />
      </section>
      <section className="relative py-10 lg:py-18">
        <WhyEdumate />
      </section>
      <section className="relative py-10 lg:py-18">
        <ProcessSteps />
      </section>
      {/* <section className="relative py-10 lg:py-18">
        <StudyAbroadSection />
      </section> */}
      <section className="relative py-10 lg:py-18">
        <Universities />
      </section>
      <section className="relative py-10 lg:py-18">
        <LendingPartnersSlider />
      </section>
    </div>
  );
};

export default HomePage;
