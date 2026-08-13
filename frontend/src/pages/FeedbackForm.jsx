import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Send, Star, AlertCircle, Brain, TrendingUp, Smile, Frown, Meh } from 'lucide-react';
import { submitFeedback, getSentimentData } from '../api/api';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #bbf7d0, #bfdbfe);
  padding: 3rem 1.5rem;
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
  letter-spacing: -0.025em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${props => {
    if (props.success) return '#10b981';
    if (props.error) return '#ef4444';
    return '#3b82f6';
  }};
  color: white;
`;

const FormContainer = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldContainer = styled.div``;

const Label = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const RequiredSpan = styled.span`
  color: #ef4444;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #d1d5db;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px #f97316;
  }

  ${props => props.error && `
    border-color: #fca5a5;
  `}
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #d1d5db;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px #f97316;
  }

  ${props => props.error && `
    border-color: #fca5a5;
  `}
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #d1d5db;
  outline: none;
  resize: vertical;
  
  &:focus {
    box-shadow: 0 0 0 2px #f97316;
  }

  ${props => props.error && `
    border-color: #fca5a5;
  `}
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f97316;
`;

const RatingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const RatingField = styled.div``;

const RatingButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const RatingButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  background-color: ${props => props.selected ? '#f97316' : '#f3f4f6'};
  color: ${props => props.selected ? 'white' : '#374151'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: ${props => props.selected ? '#ea580c' : '#e5e7eb'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #f97316;
  }
`;

const FullWidthSection = styled.div`
  grid-column: 1 / -1;
`;

const SentimentContainer = styled.div`
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;
  background-color: ${props => {
    switch (props.sentiment) {
      case 'positive': return '#f0fdf4';
      case 'negative': return '#fef2f2';
      case 'neutral': return '#fefce8';
      default: return '#f9fafb';
    }
  }};
  color: ${props => {
    switch (props.sentiment) {
      case 'positive': return '#15803d';
      case 'negative': return '#dc2626';
      case 'neutral': return '#a16207';
      default: return '#374151';
    }
  }};
  border-color: ${props => {
    switch (props.sentiment) {
      case 'positive': return '#bbf7d0';
      case 'negative': return '#fecaca';
      case 'neutral': return '#fef3c7';
      default: return '#e5e7eb';
    }
  }};
`;

const SentimentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SentimentLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const ConfidenceText = styled.span`
  font-size: 0.75rem;
  opacity: 0.75;
`;

const SentimentDetail = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
`;

const SentimentReasoning = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-style: italic;
`;

const AnalyzingContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2563eb;
`;

const AnalyzingText = styled.span`
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  font-weight: bold;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ea580c, #c2410c);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #f97316;
  }
`;

const RatingTableContainer = styled.div`
  margin-bottom: 2rem;
`;

const RatingTableWrapper = styled.div`
  overflow-x: auto;
`;

const RatingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const RatingTableHead = styled.thead``;

const RatingTableBody = styled.tbody``;

const RatingTableHeaderRow = styled.tr`
  background-color: #f3f4f6;
`;

const RatingTableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const RatingTableHeaderCell = styled.th`
  padding: 0.75rem;
  text-align: ${props => props.center ? 'center' : 'left'};
  color: #374151;
  font-weight: 600;
`;

const RatingTableCell = styled.td`
  padding: 0.75rem;
  color: #374151;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

const RadioInput = styled.input`
  height: 1.25rem;
  width: 1.25rem;
  accent-color: red;
  background: #ffff;
  color: #f97316;
`;

const LabelWithIcon = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    locationVisited: '',
    cleanliness: '',
    staffBehavior: '',
    information: '',
    signage: '',
    safety: '',
    overallExperience: '',
    suggestions: '',
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sentimentAnalysis, setSentimentAnalysis] = useState({
    overallExperience: null,
    suggestions: null
  });
  const [analyzingText, setAnalyzingText] = useState('');

  // Debounce utility function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debounced sentiment analysis
  const analyzeSentiment = useCallback(
    debounce(async (fieldName, text) => {
      if (!text || text.length < 10) {
        setSentimentAnalysis(prev => ({ ...prev, [fieldName]: null }));
        return;
      }

      try {
        setAnalyzingText(fieldName);
        const result = await getSentimentData(text);
        setSentimentAnalysis(prev => ({
          ...prev,
          [fieldName]: result
        }));
      } catch (error) {
        console.error('Sentiment analysis failed:', error);
        setSentimentAnalysis(prev => ({
          ...prev,
          [fieldName]: { error: 'Analysis failed' }
        }));
      } finally {
        setAnalyzingText('');
      }
    }, 1000),
    []
  );

  // Handle input changes with sentiment analysis
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    // Trigger sentiment analysis for text fields
    if ((name === 'overallExperience' || name === 'suggestions') && value.length > 0) {
      analyzeSentiment(name, value);
    }
  };

  // Handle rating changes
  const handleRatingChange = (category, value) => {
    setFormData((prev) => ({ ...prev, [category]: value }));
    setErrors((prev) => ({ ...prev, [category]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.locationVisited) newErrors.locationVisited = 'Please select a location';
    if (!formData.cleanliness) newErrors.cleanliness = 'Please select a rating';
    if (!formData.staffBehavior) newErrors.staffBehavior = 'Please select a rating';
    if (!formData.information) newErrors.information = 'Please select a rating';
    if (!formData.signage) newErrors.signage = 'Please select a rating';
    if (!formData.safety) newErrors.safety = 'Please select a rating';
    if (!formData.overallExperience.trim()) newErrors.overallExperience = 'Overall experience is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStatus('Submitting...');
      try {
        // Submit to backend API using the api function
        const result = await submitFeedback(formData);

        if (result.success) {
          setStatus('Thank you for your feedback!');
          setSubmitted(true);

          // Reset form after successful submission
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              mobile: '',
              address: '',
              locationVisited: '',
              cleanliness: '',
              staffBehavior: '',
              information: '',
              signage: '',
              safety: '',
              overallExperience: '',
              suggestions: '',
            });
            setSentimentAnalysis({
              overallExperience: null,
              suggestions: null
            });
            setSubmitted(false);
            setStatus('');
          }, 3000);
        } else {
          setStatus(`Failed to submit feedback: ${result.message || 'Please try again'}`);
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);

        // Handle different types of errors
        if (error.response && error.response.data) {
          setStatus(`Error: ${error.response.data.message || 'Failed to submit feedback'}`);
        } else if (error.message) {
          setStatus(`Error: ${error.message}`);
        } else {
          setStatus('Error submitting feedback. Please check your connection and try again.');
        }
      }
    }
  };

  // Rating options
  const ratings = ['Excellent', 'Very Good', 'Average', 'Poor'];

  // Jharkhand locations
  const jharkhandLocations = [
    'Ranchi',
    'Jamshedpur',
    'Deoghar',
    'Dhanbad',
    'Bokaro',
    'Sahibganj',
    'Palamu',
    'Hazaribagh',
  ];

  // Sentiment display component
  const SentimentDisplay = ({ fieldName, analysis, isAnalyzing }) => {
    if (isAnalyzing && analyzingText === fieldName) {
      return (
        <AnalyzingContainer>
          <Brain size={16} className="animate-pulse" />
          <AnalyzingText>Analyzing sentiment...</AnalyzingText>
        </AnalyzingContainer>
      );
    }

    if (!analysis || analysis.error) return null;

    const getSentimentIcon = (sentiment) => {
      switch (sentiment?.toLowerCase()) {
        case 'positive': return <Smile size={16} className="text-green-500" />;
        case 'negative': return <Frown size={16} className="text-red-500" />;
        case 'neutral': return <Meh size={16} className="text-yellow-500" />;
        default: return <Brain size={16} className="text-gray-500" />;
      }
    };

    return (
      <SentimentContainer sentiment={analysis.sentiment?.toLowerCase()}>
        <SentimentHeader>
          {getSentimentIcon(analysis.sentiment)}
          <SentimentLabel>
            {analysis.sentiment} Sentiment
          </SentimentLabel>
          <ConfidenceText>
            ({Math.round(analysis.confidence * 100)}% confident)
          </ConfidenceText>
        </SentimentHeader>

        {analysis.emotions && analysis.emotions.length > 0 && (
          <SentimentDetail>
            <DetailLabel>Emotions detected:</DetailLabel> {analysis.emotions.join(', ')}
          </SentimentDetail>
        )}

        {analysis.key_phrases && analysis.key_phrases.length > 0 && (
          <SentimentDetail>
            <DetailLabel>Key phrases:</DetailLabel> {analysis.key_phrases.join(', ')}
          </SentimentDetail>
        )}

        {analysis.reasoning && (
          <SentimentReasoning>
            {analysis.reasoning}
          </SentimentReasoning>
        )}
      </SentimentContainer>
    );
  };

  return (
    <PageContainer>
      <Container>
        <Title>
          <Star size={32} className="text-orange-500" /> Visitor Feedback Form
          <Brain size={28} className="text-blue-500 ml-2" title="AI-Powered Sentiment Analysis" />
        </Title>

        {submitted && status === 'Thank you for your feedback!' && (
          <StatusMessage success>
            <Send size={20} /> Thank you! Your feedback has been submitted successfully.
          </StatusMessage>
        )}

        {status && status !== 'Thank you for your feedback!' && (
          <StatusMessage error={status.includes('Error') || status.includes('Failed')}>
            <AlertCircle size={20} /> {status}
          </StatusMessage>
        )}

        <FormContainer onSubmit={handleSubmit}>
          {/* Personal Details */}
          <FormGrid>
            <FieldContainer>
              <Label htmlFor="name">
                Name <RequiredSpan>*</RequiredSpan>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                aria-required="true"
              />
              {errors.name && (
                <ErrorMessage>
                  <AlertCircle size={16} /> {errors.name}
                </ErrorMessage>
              )}
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="email">
                Email <RequiredSpan>*</RequiredSpan>
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                aria-required="true"
              />
              {errors.email && (
                <ErrorMessage>
                  <AlertCircle size={16} /> {errors.email}
                </ErrorMessage>
              )}
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="mobile">
                Mobile Number <RequiredSpan>*</RequiredSpan>
              </Label>
              <Input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                aria-required="true"
              />
              {errors.mobile && (
                <ErrorMessage>
                  <AlertCircle size={16} /> {errors.mobile}
                </ErrorMessage>
              )}
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="address">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </FieldContainer>
          </FormGrid>

          {/* Location Visited */}
          <FullWidthSection>
            <Label htmlFor="locationVisited">
              Location Visited <RequiredSpan>*</RequiredSpan>
            </Label>
            <Select
              id="locationVisited"
              name="locationVisited"
              value={formData.locationVisited}
              onChange={handleChange}
              aria-required="true"
            >
              <option value="">Select a location</option>
              {jharkhandLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
            {errors.locationVisited && (
              <ErrorMessage>
                <AlertCircle size={16} /> {errors.locationVisited}
              </ErrorMessage>
            )}
          </FullWidthSection>

          {/* Rating Table */}
          <RatingTableContainer>
            <SectionTitle>
              Rate Your Experience
            </SectionTitle>
            <RatingTableWrapper>
              <RatingTable>
                <RatingTableHead>
                  <RatingTableHeaderRow>
                    <RatingTableHeaderCell>Criteria</RatingTableHeaderCell>
                    {ratings.map((rating) => (
                      <RatingTableHeaderCell key={rating} center>
                        {rating}
                      </RatingTableHeaderCell>
                    ))}
                  </RatingTableHeaderRow>
                </RatingTableHead>
                <RatingTableBody>
                  {[
                    { label: 'Cleanliness & Hygiene', name: 'cleanliness' },
                    { label: 'Staff Behavior & Helpfulness', name: 'staffBehavior' },
                    { label: 'Information Availability', name: 'information' },
                    { label: 'Signage & Directions', name: 'signage' },
                    { label: 'Safety & Security', name: 'safety' },
                  ].map((criteria) => (
                    <RatingTableRow key={criteria.name}>
                      <RatingTableCell>{criteria.label} <RequiredSpan>*</RequiredSpan></RatingTableCell>
                      {ratings.map((rating) => (
                        <RatingTableCell key={rating} center>
                          <RadioInput
                            type="radio"
                            name={criteria.name}
                            value={rating}
                            checked={formData[criteria.name] === rating}
                            onChange={() => handleRatingChange(criteria.name, rating)}
                            aria-label={`${criteria.label} - ${rating}`}
                          />
                        </RatingTableCell>
                      ))}
                    </RatingTableRow>
                  ))}
                </RatingTableBody>
              </RatingTable>
            </RatingTableWrapper>
            {['cleanliness', 'staffBehavior', 'information', 'signage', 'safety'].map(
              (field) =>
                errors[field] && (
                  <ErrorMessage key={field}>
                    <AlertCircle size={16} /> {errors[field]}
                  </ErrorMessage>
                )
            )}
          </RatingTableContainer>

          {/* Overall Experience with AI Analysis */}
          <FullWidthSection>
            <LabelWithIcon htmlFor="overallExperience">
              Overall Experience <RequiredSpan>*</RequiredSpan>
              <Brain size={16} className="text-blue-500" title="AI sentiment analysis enabled" />
            </LabelWithIcon>
            <TextArea
              id="overallExperience"
              name="overallExperience"
              value={formData.overallExperience}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your overall experience (AI will analyze sentiment as you type)"
              aria-required="true"
            />
            {errors.overallExperience && (
              <ErrorMessage>
                <AlertCircle size={16} /> {errors.overallExperience}
              </ErrorMessage>
            )}
            <SentimentDisplay
              fieldName="overallExperience"
              analysis={sentimentAnalysis.overallExperience}
              isAnalyzing={analyzingText === 'overallExperience'}
            />
          </FullWidthSection>

          {/* Suggestions with AI Analysis */}
          <FullWidthSection>
            <LabelWithIcon htmlFor="suggestions">
              Suggestions for Improvement (if any)
              <Brain size={16} className="text-blue-500" title="AI sentiment analysis enabled" />
            </LabelWithIcon>
            <TextArea
              id="suggestions"
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              rows="4"
              placeholder="We'd love to hear your suggestions (AI will analyze sentiment)"
            />
            <SentimentDisplay
              fieldName="suggestions"
              analysis={sentimentAnalysis.suggestions}
              isAnalyzing={analyzingText === 'suggestions'}
            />
          </FullWidthSection>

          {/* Submit Button */}
          <SubmitButton
            type="submit"
            disabled={status === 'Submitting...'}
          >
            <Send size={20} /> {status === 'Submitting...' ? 'Submitting...' : 'Submit Feedback'}
          </SubmitButton>
        </FormContainer>
      </Container>
    </PageContainer>
  );
};

export default FeedbackForm;