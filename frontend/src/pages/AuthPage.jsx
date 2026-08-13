import React, { useState } from "react";
import styled from 'styled-components';
import {
  User,
  Shield,
  Users,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  MapPin,
  Phone,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #dcfce7, #dbeafe, #fed7aa);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
`;

const MaxWidthContainer = styled.div`
  max-width: 64rem;
  width: 100%;
`;

const MainCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const Header = styled.div`
  background: linear-gradient(to right, #f97316, #ef4444);
  padding: 1.5rem;
  color: white;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const HeaderSubtitle = styled.p`
  color: #fed7aa;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.15s;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  ${props => props.active ? `
    border-bottom: 2px solid #f97316;
    color: #ea580c;
  ` : `
    color: #4b5563;
    &:hover {
      color: #f97316;
    }
  `}
`;

const ContentSection = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  text-align: center;
  margin-bottom: 1rem;
`;

const UserTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AdminTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const UserTypeCard = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, white, #f9fafb);

  &:hover {
    border-color: #f97316;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-0.25rem);
  }
`;

const CardIcon = styled.div`
  color: #f97316;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #4b5563;
`;

const BackButton = styled.button`
  color: #f97316;
  background: transparent;
  border: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #ea580c;
  }
`;

const BackButtonContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  
  &.form-back {
    margin-top: 1rem;
  }
`;

const FormContainer = styled.form`
  padding: 2rem;
`;

const MessageBox = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: center;
  
  ${props => props.success ? `
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
  ` : `
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  `}
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.15s;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.disabled ? `
    background-color: #9ca3af;
    cursor: not-allowed;
    color: white;
  ` : `
    background: linear-gradient(to right, #f97316, #ef4444);
    color: white;
    
    &:hover {
      background: linear-gradient(to right, #ea580c, #dc2626);
    }
  `}
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;
  border-radius: 50%;
  height: 1.25rem;
  width: 1.25rem;
  border: 2px solid transparent;
  border-bottom-color: white;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const InputFieldContainer = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: #fff;
  color: #000000;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.error ? '#ef4444' : '#d1d5db'};
  border-radius: 0.5rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #f97316;
  }

  /* Custom autofill styling */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #fffda1 inset !important; /* Light orange background */
    -webkit-text-fill-color: #1f2937 !important; /* Dark gray text */
    background-color: #fef3e2 !important;
    color: #1f2937 !important;
  }

  /* For Firefox */
  &:-moz-autofill {
    background-color: #fef3e2 !important;
    color: #1f2937 !important;
  }

  /* For other browsers */
  &:autofill {
    background-color: #fef3e2 !important;
    color: #1f2937 !important;
  }
`;

const InputError = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("");
  const [adminSubType, setAdminSubType] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const userTypes = [
    { id: "tourist", name: "Tourist", icon: User, description: "Explore Jharkhand as a visitor" },
    { id: "local", name: "Local Community", icon: Users, description: "Join as a local guide or host" },
    { id: "admin", name: "Administrator", icon: Shield, description: "Government admin access" },
  ];

  const adminSubTypes = [
    { id: "state", name: "State Admin", description: "State-level administration" },
    { id: "district", name: "District Admin", description: "District-level administration" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (!isLogin) {
      if (!userType) {
        newErrors.userType = "Please select a user type";
        setErrors(newErrors);
        return false;
      }

      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";

      if (userType === "local") {
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.specialization) newErrors.specialization = "Specialization is required";
        if (!formData.languages) newErrors.languages = "Languages are required";
      }
      
      if (userType === "admin") {
        if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
        if (!adminSubType) newErrors.adminSubType = "Admin level is required";
      }
      
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Handle login using AuthContext
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          setMessage("Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/"); // Redirect to home page
          }, 1500);
        } else {
          setMessage(result.message || "Login failed");
        }
      } else {
        // Handle registration using AuthContext
        const userData = {
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          name: formData.name,
          phone: formData.phone,
          userType: userType,
        };

        // Add type-specific data
        if (userType === "local") {
          userData.address = formData.address;
          userData.specialization = formData.specialization;
          userData.languages = formData.languages;
          userData.experienceYears = formData.experienceYears || 0;
        } else if (userType === "admin") {
          userData.employeeId = formData.employeeId;
          userData.adminLevel = adminSubType;
          userData.department = formData.department || "Tourism";
        } else if (userType === "tourist") {
          userData.interests = formData.interests || [];
        }

        const result = await register(userData);
        
        if (result.success) {
          setMessage("Registration successful! Redirecting...");
          setTimeout(() => {
            navigate("/"); // Redirect to home page
          }, 1500);
        } else {
          setMessage(result.message || "Registration failed");
          if (result.errors) {
            const validationErrors = {};
            result.errors.forEach(error => {
              validationErrors[error.param] = error.msg;
            });
            setErrors(validationErrors);
          }
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserType("");
    setAdminSubType("");
    setFormData({});
    setErrors({});
    setMessage("");
  };

  return (
    <PageContainer>
      <MaxWidthContainer>
        <MainCard>
          {/* Header */}
          <Header>
            <HeaderTitle>Jharkhand Tourism Portal</HeaderTitle>
            <HeaderSubtitle>
              Welcome to the gateway of incredible Jharkhand
            </HeaderSubtitle>
          </Header>

          {/* Tabs */}
          <TabContainer>
            <TabButton
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              active={isLogin}
            >
              <LogIn className="inline mr-2" size={20} /> Login
            </TabButton>
            <TabButton
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              active={!isLogin}
            >
              <UserPlus className="inline mr-2" size={20} /> Signup
            </TabButton>
          </TabContainer>

          {/* User Type Selection */}
          {!isLogin && !userType && (
            <ContentSection>
              <SectionTitle>
                Choose Your User Type to Signup
              </SectionTitle>
              {errors.userType && (
                <ErrorMessage>{errors.userType}</ErrorMessage>
              )}
              <UserTypeGrid>
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <UserTypeCard
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                    >
                      <CardIcon>
                        <Icon size={48} />
                      </CardIcon>
                      <CardTitle>{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </UserTypeCard>
                  );
                })}
              </UserTypeGrid>
            </ContentSection>
          )}

          {/* Admin Sub-type Selection */}
          {!isLogin && userType === "admin" && !adminSubType && (
            <ContentSection>
              <SectionTitle>
                Select Your Admin Level
              </SectionTitle>
              {errors.adminSubType && (
                <ErrorMessage>{errors.adminSubType}</ErrorMessage>
              )}
              <AdminTypeGrid>
                {adminSubTypes.map((subType) => (
                  <UserTypeCard
                    key={subType.id}
                    onClick={() => setAdminSubType(subType.id)}
                  >
                    <CardIcon>
                      <Shield size={48} />
                    </CardIcon>
                    <CardTitle>{subType.name}</CardTitle>
                    <CardDescription>{subType.description}</CardDescription>
                  </UserTypeCard>
                ))}
              </AdminTypeGrid>
              <BackButtonContainer>
                <BackButton
                  onClick={() => setUserType("")}
                >
                  ← Back to User Type Selection
                </BackButton>
              </BackButtonContainer>
            </ContentSection>
          )}

          {/* Form */}
          {(isLogin || (userType && (userType !== "admin" || adminSubType))) && (
            <FormContainer onSubmit={handleSubmit}>
              <SectionTitle>
                {isLogin ? "Login to Your Account" : "Create Your Account"}
              </SectionTitle>

              {/* Message Display */}
              {message && (
                <MessageBox success={message.includes('successful') || message.includes('Redirecting')}>
                  {message}
                </MessageBox>
              )}

              {/* Dynamic Signup Fields */}
              {!isLogin && (
                <>
                  <InputField 
                    label="Full Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    error={errors.name} 
                  />
                  <InputField 
                    label="Phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    error={errors.phone} 
                  />
                </>
              )}

              {!isLogin && userType === "local" && (
                <>
                  <InputField 
                    label="Address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    error={errors.address} 
                  />
                  <InputField 
                    label="Specialization" 
                    name="specialization" 
                    value={formData.specialization} 
                    onChange={handleInputChange} 
                    error={errors.specialization} 
                    placeholder="e.g., Tour Guide, Cultural Expert, Adventure Sports"
                  />
                  <InputField 
                    label="Languages" 
                    name="languages" 
                    value={formData.languages} 
                    onChange={handleInputChange} 
                    error={errors.languages} 
                    placeholder="e.g., Hindi, English, Bengali"
                  />
                  <InputField 
                    label="Years of Experience (Optional)" 
                    name="experienceYears" 
                    type="number"
                    value={formData.experienceYears} 
                    onChange={handleInputChange} 
                    error={errors.experienceYears} 
                  />
                </>
              )}

              {!isLogin && userType === "admin" && (
                <>
                  <InputField 
                    label="Employee ID" 
                    name="employeeId" 
                    value={formData.employeeId} 
                    onChange={handleInputChange} 
                    error={errors.employeeId} 
                  />
                  <InputField 
                    label="Department (Optional)" 
                    name="department" 
                    value={formData.department} 
                    onChange={handleInputChange} 
                    error={errors.department} 
                    placeholder="Tourism Department (default)"
                  />
                </>
              )}

              {/* Common Fields */}
              <InputField 
                label="Email" 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleInputChange} 
                error={errors.email} 
              />
              <InputField 
                label="Password" 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                error={errors.password} 
              />

              {!isLogin && (
                <InputField 
                  label="Confirm Password" 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleInputChange} 
                  error={errors.confirmPassword} 
                />
              )}

              <SubmitButton
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    {isLogin ? "Logging in..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    {isLogin ? "Login" : "Create Account"}
                  </>
                )}
              </SubmitButton>

              {/* Back to user type selection for signup */}
              {!isLogin && (
                <BackButtonContainer className="form-back">
                  <BackButton
                    type="button"
                    onClick={() => {
                      if (userType === "admin" && adminSubType) {
                        setAdminSubType("");
                      } else {
                        setUserType("");
                      }
                    }}
                  >
                    ← Back to {userType === "admin" && adminSubType ? "Admin Level Selection" : "User Type Selection"}
                  </BackButton>
                </BackButtonContainer>
              )}
            </FormContainer>
          )}
        </MainCard>
      </MaxWidthContainer>
    </PageContainer>
  );
};

const InputField = ({ label, type = "text", name, value, onChange, error, placeholder }) => (
  <InputFieldContainer>
    <InputLabel>{label}</InputLabel>
    <StyledInput
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
    />
    {error && <InputError>{error}</InputError>}
  </InputFieldContainer>
);

export default AuthPage;
