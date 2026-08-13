import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Heart, Globe } from 'lucide-react';

// Styled Components
const ProfileContainer = styled.div`
    min-height: 100vh;
    background-color: #f9fafb;
    padding: 2rem 0;
`;

const ContentWrapper = styled.div`
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 640px) {
        padding: 0 1.5rem;
    }

    @media (min-width: 1024px) {
        padding: 0 2rem;
    }
`;

const ProfileCard = styled.div`
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;

const Header = styled.div`
    background: linear-gradient(to right, #f97316, #ea580c);
    padding: 2rem 1.5rem;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const ProfilePictureContainer = styled.div`
    position: relative;
`;

const ProfilePicture = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid white;
`;

const DefaultAvatar = styled.div`
    background: white;
    border-radius: 50%;
    padding: 0.75rem;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CameraButton = styled.button`
    position: absolute;
    bottom: -0.25rem;
    right: -0.25rem;
    background: white;
    border-radius: 50%;
    padding: 0.25rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f9fafb;
    }
`;

const UserDetails = styled.div``;

const UserName = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

const UserRole = styled.p`
    color: #fed7aa;
    text-transform: capitalize;
`;

const UserBio = styled.p`
    color: #fed7aa;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    max-width: 28rem;
`;

const QuickStats = styled.div`
    display: none;
    gap: 1.5rem;
    text-align: center;

    @media (min-width: 768px) {
        display: flex;
    }
`;

const StatItem = styled.div``;

const StatNumber = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`;

const StatLabel = styled.p`
    color: #fed7aa;
    font-size: 0.875rem;
`;

const Content = styled.div`
    padding: 2rem 1.5rem;
`;

const Message = styled.div`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${props => props.success ? '#f0fdf4' : '#fef2f2'};
    color: ${props => props.success ? '#166534' : '#991b1b'};
`;

const Form = styled.form``;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const FormSection = styled.div`
    grid-column: 1 / -1;
`;

const FieldContainer = styled.div``;

const Label = styled.label`
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: #000000;
    border: 1px solid ${props => props.hasError ? '#fca5a5' : '#d1d5db'};
    border-radius: 0.5rem;
    background-color: ${props => props.disabled ? '#f9fafb' : 'white'};
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #f97316;
        border-color: transparent;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid ${props => props.hasError ? '#fca5a5' : '#d1d5db'};
    border-radius: 0.5rem;
    background-color: ${props => props.disabled ? '#f9fafb' : 'white'};
    resize: vertical;
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #f97316;
        border-color: transparent;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: #000000;
    border: 1px solid ${props => props.hasError ? '#fca5a5' : '#d1d5db'};
    border-radius: 0.5rem;
    background-color: ${props => props.disabled ? '#f9fafb' : 'white'};
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #f97316;
        border-color: transparent;
    }
`;

const ErrorText = styled.p`
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc2626;
`;

const InterestsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const InterestLabel = styled.label`
    display: flex;
    align-items: center;
`;

const InterestCheckbox = styled.input`
    margin-right: 0.5rem;
    height: 1rem;
    width: 1rem;
    color: #f97316;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;

    &:focus {
        box-shadow: 0 0 0 2px #f97316;
    }
`;

const InterestText = styled.span`
    font-size: 0.875rem;
    color: #374151;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.15s;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const PrimaryButton = styled(Button)`
    background-color: #f97316;
    color: white;
    border: none;

    &:hover:not(:disabled) {
        background-color: #ea580c;
    }
`;

const SecondaryButton = styled(Button)`
    background-color: transparent;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
        background-color: #f9fafb;
    }
`;

const LoadingContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoadingContent = styled.div`
    text-align: center;
`;

const LoadingTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 1rem;
`;

const LoadingText = styled.p`
    color: #6b7280;
`;

const UserProfile = () => {
    const { user, updateProfile, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        bio: '',
        interests: [],
        travelPreferences: '',
        profilePicture: ''
    });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                dateOfBirth: user.dateOfBirth || '',
                bio: user.bio || '',
                interests: user.interests || [],
                travelPreferences: user.travelPreferences || '',
                profilePicture: user.profilePicture || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleInterestsChange = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});

        // Basic validation
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await updateProfile(formData);
        
        if (result.success) {
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } else {
            setMessage(result.message || 'Failed to update profile');
            if (result.errors) {
                setErrors(result.errors);
            }
        }
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                dateOfBirth: user.dateOfBirth || '',
                bio: user.bio || '',
                interests: user.interests || [],
                travelPreferences: user.travelPreferences || '',
                profilePicture: user.profilePicture || ''
            });
        }
        setIsEditing(false);
        setErrors({});
        setMessage('');
    };

    if (!user) {
        return (
            <LoadingContainer>
                <LoadingContent>
                    <LoadingTitle>Loading...</LoadingTitle>
                    <LoadingText>Please wait while we load your profile.</LoadingText>
                </LoadingContent>
            </LoadingContainer>
        );
    }

    return (
        <ProfileContainer>
            <ContentWrapper>
                <ProfileCard>
                    {/* Header */}
                    <Header>
                        <HeaderContent>
                            <UserInfo>
                                {/* Profile Picture */}
                                <ProfilePictureContainer>
                                    {formData.profilePicture ? (
                                        <ProfilePicture 
                                            src={formData.profilePicture} 
                                            alt="Profile" 
                                        />
                                    ) : (
                                        <DefaultAvatar>
                                            <User className="h-8 w-8 text-orange-500" />
                                        </DefaultAvatar>
                                    )}
                                    {isEditing && (
                                        <CameraButton
                                            type="button"
                                            onClick={() => {
                                                // You can implement file upload here
                                                alert('Profile picture upload feature coming soon!');
                                            }}
                                        >
                                            <Camera className="h-3 w-3 text-gray-600" />
                                        </CameraButton>
                                    )}
                                </ProfilePictureContainer>
                                <UserDetails>
                                    <UserName>{formData.name || 'User Profile'}</UserName>
                                    <UserRole>{user.userType || 'User'} Account</UserRole>
                                    {formData.bio && !isEditing && (
                                        <UserBio>{formData.bio.substring(0, 100)}...</UserBio>
                                    )}
                                </UserDetails>
                            </UserInfo>
                            
                            {/* Quick Stats */}
                            <QuickStats>
                                <StatItem>
                                    <StatNumber>{formData.interests.length}</StatNumber>
                                    <StatLabel>Interests</StatLabel>
                                </StatItem>
                                <StatItem>
                                    <StatNumber>{user.userType === 'admin' ? 'Admin' : 'Explorer'}</StatNumber>
                                    <StatLabel>Role</StatLabel>
                                </StatItem>
                            </QuickStats>
                        </HeaderContent>
                    </Header>

                    {/* Content */}
                    <Content>
                        {message && (
                            <Message success={message.includes('success')}>
                                {message}
                            </Message>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <FormGrid>
                                {/* Name */}
                                <FieldContainer>
                                    <Label>
                                        <User className="h-4 w-4 mr-2" />
                                        Full Name
                                    </Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        hasError={errors.name}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                                </FieldContainer>

                                {/* Email */}
                                <FieldContainer>
                                    <Label>
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        hasError={errors.email}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                                </FieldContainer>

                                {/* Phone */}
                                <FieldContainer>
                                    <Label>
                                        <Phone className="h-4 w-4 mr-2" />
                                        Phone Number
                                    </Label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        hasError={errors.phone}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                                </FieldContainer>

                                {/* Date of Birth */}
                                <FieldContainer>
                                    <Label>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Date of Birth
                                    </Label>
                                    <Input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        hasError={errors.dateOfBirth}
                                    />
                                    {errors.dateOfBirth && <ErrorText>{errors.dateOfBirth}</ErrorText>}
                                </FieldContainer>
                            </FormGrid>

                            {/* Address */}
                            <FormSection>
                                <Label>
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Address
                                </Label>
                                <TextArea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={3}
                                    hasError={errors.address}
                                    placeholder="Enter your address"
                                />
                                {errors.address && <ErrorText>{errors.address}</ErrorText>}
                            </FormSection>

                            {/* Bio */}
                            <FormSection>
                                <Label>
                                    <User className="h-4 w-4 mr-2" />
                                    Bio
                                </Label>
                                <TextArea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    rows={4}
                                    hasError={errors.bio}
                                    placeholder="Tell us about yourself, your travel experiences, and what you love about Jharkhand..."
                                />
                                {errors.bio && <ErrorText>{errors.bio}</ErrorText>}
                            </FormSection>

                            {/* Travel Preferences */}
                            <FormSection>
                                <Label>
                                    <Globe className="h-4 w-4 mr-2" />
                                    Travel Preferences
                                </Label>
                                <Select
                                    name="travelPreferences"
                                    value={formData.travelPreferences}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    hasError={errors.travelPreferences}
                                >
                                    <option value="">Select your travel style</option>
                                    <option value="adventure">Adventure & Trekking</option>
                                    <option value="cultural">Cultural & Heritage</option>
                                    <option value="nature">Nature & Wildlife</option>
                                    <option value="religious">Religious & Spiritual</option>
                                    <option value="family">Family Friendly</option>
                                    <option value="photography">Photography Tours</option>
                                    <option value="budget">Budget Travel</option>
                                    <option value="luxury">Luxury Travel</option>
                                </Select>
                                {errors.travelPreferences && <ErrorText>{errors.travelPreferences}</ErrorText>}
                            </FormSection>

                            {/* Interests */}
                            <FormSection>
                                <Label>
                                    <Heart className="h-4 w-4 mr-2" />
                                    Interests
                                </Label>
                                <InterestsGrid>
                                    {[
                                        'Waterfalls', 'Temples', 'Wildlife', 'Tribal Culture', 
                                        'Adventure Sports', 'Photography', 'Local Cuisine', 'Festivals',
                                        'Historical Sites', 'Handicrafts', 'Music & Dance', 'Eco-tourism'
                                    ].map((interest) => (
                                        <InterestLabel key={interest}>
                                            <InterestCheckbox
                                                type="checkbox"
                                                checked={formData.interests.includes(interest)}
                                                onChange={() => handleInterestsChange(interest)}
                                                disabled={!isEditing}
                                            />
                                            <InterestText>{interest}</InterestText>
                                        </InterestLabel>
                                    ))}
                                </InterestsGrid>
                                {errors.interests && <ErrorText>{errors.interests}</ErrorText>}
                            </FormSection>

                            {/* Action Buttons */}
                            <ButtonContainer>
                                {!isEditing ? (
                                    <PrimaryButton
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </PrimaryButton>
                                ) : (
                                    <>
                                        <SecondaryButton
                                            type="button"
                                            onClick={handleCancel}
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </SecondaryButton>
                                        <PrimaryButton
                                            type="submit"
                                            disabled={loading}
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </PrimaryButton>
                                    </>
                                )}
                            </ButtonContainer>
                        </Form>
                    </Content>
                </ProfileCard>
            </ContentWrapper>
        </ProfileContainer>
    );
};

export default UserProfile;
