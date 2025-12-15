import { ArrowRight, BadgeIndianRupee, Shield, TrendingDown, Sparkles, Percent, Star, Users, CheckCircle2, Banknote, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onStart?: () => void;
}

// Sample loan cards for the floating background
const floatingLoans = [
  { 
    lender: 'HDFC Credila', 
    loanType: 'Education Loan', 
    interest: '9.5%', 
    amount: '₹75L', 
    score: 95,
    features: ['No collateral up to ₹40L', 'Quick approval']
  },
  { 
    lender: 'Axis Bank', 
    loanType: 'Study Abroad Loan', 
    interest: '10.25%', 
    amount: '₹1.5Cr', 
    score: 92,
    features: ['100% finance', 'Flexible repayment']
  },
  { 
    lender: 'ICICI Bank', 
    loanType: 'Skill Development Loan', 
    interest: '9.75%', 
    amount: '₹50L', 
    score: 90,
    features: ['Fast processing', 'Low documentation']
  },
  { 
    lender: 'SBI', 
    loanType: 'Global Study Loan', 
    interest: '8.85%', 
    amount: '₹2Cr', 
    score: 88,
    features: ['Lowest interest', 'Government backed']
  },
  { 
    lender: 'Avanse', 
    loanType: 'MBA Loan', 
    interest: '11.5%', 
    amount: '₹80L', 
    score: 87,
    features: ['Specialized for MBA', 'Co-applicant allowed']
  },
  { 
    lender: 'Prodigy Finance', 
    loanType: 'International Loan', 
    interest: '12.0%', 
    amount: '$150K', 
    score: 85,
    features: ['No cosigner needed', 'Global acceptance']
  },
  { 
    lender: 'InCred', 
    loanType: 'Fast Track Loan', 
    interest: '10.5%', 
    amount: '₹60L', 
    score: 84,
    features: ['Quick disbursal', 'Digital process']
  },
  { 
    lender: 'Auxilo', 
    loanType: 'Premium Study Loan', 
    interest: '9.99%', 
    amount: '₹1Cr', 
    score: 91,
    features: ['Top-up facility', 'Moratorium period']
  },
];

const FloatingCard = ({ 
  loan, 
  style, 
  delay 
}: { 
  loan: typeof floatingLoans[0]; 
  style: React.CSSProperties;
  delay: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`absolute transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={style}
    >
      <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl p-4 shadow-xl w-72 transform hover:scale-105 transition-transform duration-500">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Banknote className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{loan.lender}</p>
              <p className="text-xs text-muted-foreground truncate">{loan.loanType}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-accent flex-shrink-0 ml-2">
            <Star className="w-3 h-3 fill-current" />
            <span>{loan.score}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-bold text-foreground">{loan.interest}</span>
            <span className="text-xs text-muted-foreground">p.a.</span>
          </div>
          <div className="text-sm font-bold text-success">{loan.amount}</div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {loan.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary border border-primary/10">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const stats = [
    { icon: <BadgeIndianRupee className="w-5 h-5" />, value: '₹500Cr+', label: 'Loans Disbursed' },
    { icon: <Users className="w-5 h-5" />, value: '15+', label: 'Partner Lenders' },
    { icon: <TrendingDown className="w-5 h-5" />, value: '8.85%', label: 'Interest Rate From' },
  ];

  const features = [
    'AI-powered loan matching',
    '100% paperless process',
    'Quick approval in 48 hours',
  ];

  // Positions for floating cards
  const cardPositions = [
    { top: '8%', left: '5%', rotate: '-6deg' },
    { top: '15%', right: '8%', rotate: '4deg' },
    { top: '35%', left: '3%', rotate: '8deg' },
    { top: '55%', right: '5%', rotate: '-5deg' },
    { bottom: '25%', left: '8%', rotate: '-3deg' },
    { bottom: '15%', right: '3%', rotate: '6deg' },
    { top: '65%', left: '2%', rotate: '4deg' },
    { bottom: '35%', right: '6%', rotate: '-8deg' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      
      {/* Floating Loan Cards (Blurred BackgroundSmart Loan Finder) */}
      <div className="absolute inset-0 blur-sm pointer-events-none hidden lg:block">
        {floatingLoans.map((loan, index) => (
          <FloatingCard
            key={loan.lender}
            loan={loan}
            delay={index * 200}
            style={{
              ...cardPositions[index],
              transform: `rotate(${cardPositions[index].rotate})`,
              animation: `float ${6 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 p-12">
        <div className="max-w-5xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Smart Loan Finder</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-muted-foreground">Trusted by 35,000+ Students</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight animate-slide-up">
              <span className="text-foreground">Fund Your</span>
              <br />
              <span className="text-primary">Dream Education</span>
              <br />
              <span className="text-foreground">With Best Loans</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Compare and apply for education loans from <strong className="text-foreground">15+ top lenders</strong> in India. Get instant eligibility check and the lowest interest rates for your study abroad journey.
            </p>

            {/* Feature Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.15s' }}>
              {features.map((feature) => (
                <div
                  key={feature}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => {
                  navigate('/loan-application');
                }}
                className="group btn-accent text-lg px-10 py-5 shadow-xl shadow-accent/25 flex items-center gap-2"
              >
                <BadgeIndianRupee className="w-5 h-5" />
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="https://seedglobaleducation.com/schedule-a-call/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-5 flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Talk to Loan Expert
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Fast Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>No Hidden Charges</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-bold font-heading text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroSection;