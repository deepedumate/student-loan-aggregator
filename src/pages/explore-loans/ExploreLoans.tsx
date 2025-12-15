import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/chat-journey/HeroSection';

const ExploreLoans = () => {
  return (
    <>
      <Helmet>
        <title>Education Loan Finder | Edumate Global - Compare Best Study Abroad Loans</title>
        <meta 
          name="description" 
          content="Compare education loans from 15+ top lenders in India. Get instant eligibility check, lowest interest rates starting at 8.85%, and quick approval for your study abroad journey. 100% paperless process with AI-powered loan matching." 
        />
        <meta 
          name="keywords" 
          content="education loan, study abroad loan, student loan India, education loan abroad, loan for MBA, loan for masters, HDFC Credila, Axis Bank education loan, SBI student loan, loan comparison, lowest interest rate, study loan" 
        />
        <meta property="og:title" content="Education Loan Finder | SEED Global Education" />
        <meta property="og:description" content="Find the best education loans for studying abroad. Compare 15+ lenders, get instant eligibility check, and secure the lowest rates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seedglobaleducation.com/education-loans" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Education Loan Finder | SEED Global Education" />
        <meta name="twitter:description" content="Compare education loans from top lenders and fund your dream education with the best rates." />
        <link rel="canonical" href="https://seedglobaleducation.com/education-loans" />
      </Helmet>
      <HeroSection />
    </>
  );
};

export default ExploreLoans;