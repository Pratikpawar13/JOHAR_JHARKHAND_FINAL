import React from "react";
import styled from "styled-components";
import { CheckCircle } from "lucide-react";

const CardContainer = styled.div`
  background: white;
  border: 2px solid #10b981;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
  
  @media (min-width: 768px) {
    grid-template-columns: auto 1fr auto;
  }
`;

const PhotoContainer = styled.div`
  margin: 0 auto;
  
  @media (min-width: 768px) {
    margin: 0;
  }
`;

const GuidePhoto = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const DetailItem = styled.p`
  font-size: 0.875rem;
  color: #000000;
  margin: 0;
  
  span {
    font-weight: 600;
    color: #374151;
  }
`;

const QRContainer = styled.div`
  margin: 0 auto;
  
  @media (min-width: 768px) {
    margin: 0;
  }
`;

const QRCode = styled.img`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

export default function GuideCard({ guide }) {
  if (!guide) return null;
  console.log("📥 Registration response:", guide.uniqueId);
  return (
    <CardContainer>
      <Header>
        <VerifiedBadge>
          <CheckCircle size={20} />
          Verified Guide
        </VerifiedBadge>
      </Header>
      
      <Body>
        <PhotoContainer>
          <GuidePhoto 
            src={guide.photo} 
            alt="Guide Photo" 
          />
        </PhotoContainer>
        
        <DetailsContainer>
          <DetailItem>
            <span>Unique ID:</span> {guide.uniqueId}
          </DetailItem>
          <DetailItem>
            <span>Name:</span> {guide.name}
          </DetailItem>
          <DetailItem>
            <span>City:</span> {guide.city}
          </DetailItem>
          <DetailItem>
            <span>Mobile:</span> {guide.mobile}
          </DetailItem>
          <DetailItem>
            <span>Email:</span> {guide.email}
          </DetailItem>
          <DetailItem>
            <span>Languages:</span> {guide.language}
          </DetailItem>
          <DetailItem>
            <span>Tourist Spots:</span> {guide.tourist_spot_covered}
          </DetailItem>
        </DetailsContainer>
        
        {guide.qrCode && (
          <QRContainer>
            <QRCode 
              src={guide.qrCode} 
              alt="QR Code" 
            />
          </QRContainer>
        )}
      </Body>
    </CardContainer>
  );
}