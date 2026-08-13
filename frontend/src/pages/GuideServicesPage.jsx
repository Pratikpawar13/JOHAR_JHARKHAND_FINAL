import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  UserPlus, 
  MapPin, 
  Star, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fdf4, #eff6ff, #fef3f2);
  padding: 2rem 0;
`;

const MaxWidthContainer = styled.div`
  max-width: 72rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #f97316, #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceCard = styled(Link)`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  display: block;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    border-color: #f97316;
    text-decoration: none;
    color: inherit;
  }
`;

const ServiceIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(to right, #f97316, #ef4444);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceCTA = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f97316;
  font-weight: 600;
  transition: gap 0.3s ease;
  
  ${ServiceCard}:hover & {
    gap: 0.75rem;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(to right, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #4b5563;
  font-weight: 600;
`;

const FeaturesSection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
`;

const FeaturesTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: #111827;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
`;

const FeatureIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-weight: 600;
  color: #374151;
`;

export default function GuideServicesPage() {
  const services = [
    {
      icon: <UserPlus size={24} />,
      title: "Register as Guide",
      description: "Join our network of verified tour guides. Complete the registration process to get government verification and start your journey as a certified guide.",
      link: "/guide-registration",
      cta: "Register Now"
    },
    {
      icon: <Search size={24} />,
      title: "Find Verified Guide",
      description: "Search for government-verified tour guides in your area. Find guides by ID, name, or scan their QR code for instant verification.",
      link: "/find-guide",
      cta: "Search Guides"
    }
  ];

  const features = [
    { icon: <Shield size={20} />, text: "Government Verified" },
    { icon: <CheckCircle size={20} />, text: "Quality Assured" },
    { icon: <MapPin size={20} />, text: "Local Expertise" },
    { icon: <Star size={20} />, text: "Professional Service" }
  ];

  return (
    <>
      <Navbar />
      <PageContainer>
        <MaxWidthContainer>
          <HeroSection>
            <HeroTitle>Guide Verification Services</HeroTitle>
            <HeroSubtitle>
              Discover authentic Jharkhand with our government-verified tour guides. 
              Ensuring safe, reliable, and enriching travel experiences across the state.
            </HeroSubtitle>
          </HeroSection>

          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index} to={service.link}>
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceCTA>
                  {service.cta}
                  <ArrowRight size={16} />
                </ServiceCTA>
              </ServiceCard>
            ))}
          </ServicesGrid>

          <StatsSection>
            <StatCard>
              <StatNumber>500+</StatNumber>
              <StatLabel>Verified Guides</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50+</StatNumber>
              <StatLabel>Tourist Destinations</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Happy Tourists</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Support Available</StatLabel>
            </StatCard>
          </StatsSection>

          <FeaturesSection>
            <FeaturesTitle>Why Choose Our Verified Guides?</FeaturesTitle>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <FeatureText>{feature.text}</FeatureText>
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </FeaturesSection>
        </MaxWidthContainer>
      </PageContainer>
      <Footer />
    </>
  );
}