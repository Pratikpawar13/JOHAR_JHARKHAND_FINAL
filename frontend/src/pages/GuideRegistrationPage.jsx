import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GuideCard from "../components/GuideCard";

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items:center;
  justify-content:center;
  gap: 5rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fdf4, #eff6ff, #fef3f2);
`;

const FormTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #f3f3f3;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const RegistrationForm = styled.form`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #f97316;
    box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &[type="file"] {
    border: 2px dashed #d1d5db;
    padding: 1rem;
    
    &:hover {
      border-color: #f97316;
      background: #fef3f2;
    }
    
    &::file-selector-button {
      margin-right: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 0;
      font-size: 0.875rem;
      font-weight: 600;
      background: #fef3f2;
      color: #c2410c;
      cursor: pointer;
      
      &:hover {
        background: #fed7aa;
      }
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #f97316, #ef4444);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #ea580c, #dc2626);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResponseSection = styled.div`
  margin-top: 1rem;
`;

const NotVerifiedMessage = styled.p`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #dc2626;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

export default function GuideRegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    mobile: "",
    email: "",
    tourist_spot_covered: "",
    language: "",
    photoUrl: "",
    photoFile: null,
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoFile") {
      setForm({ ...form, photoFile: files[0] });
    } else if (name === 'mobile') {
      // Format mobile number for Indian validation
      let formatted = value.replace(/\D/g, ''); // Remove non-digits
      
      // If it's a 10-digit number, keep as is (backend will validate)
      if (formatted.length <= 10) {
        setForm({ ...form, [name]: formatted });
      } else if (formatted.length === 12 && formatted.startsWith('91')) {
        // If it starts with 91 and is 12 digits, keep as is
        setForm({ ...form, [name]: formatted });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        
        // Set canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        console.log(`📸 Image compressed: ${file.size} bytes → ${Math.round(compressedDataUrl.length * 0.75)} bytes`);
        resolve(compressedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Convert and compress photo if exists
      let photoBase64 = null;
      if (form.photoFile) {
        console.log("🔄 Compressing image...");
        photoBase64 = await compressImage(form.photoFile);
      }

      // Prepare JSON data
      const jsonData = {
        name: form.name,
        city: form.city,
        mobile: form.mobile,
        email: form.email,
        tourist_spot_covered: form.tourist_spot_covered,
        language: form.language,
        photo: photoBase64 || form.photo || null
      };

      // Debug: Log what we're sending (without full base64 for readability)
      console.log("📤 Sending JSON data:");
      const debugData = { ...jsonData };
      if (debugData.photo) {
        debugData.photo = `[BASE64 IMAGE - ${Math.round(debugData.photo.length / 1024)}KB]`;
      }
      console.log(JSON.stringify(debugData, null, 2));

      const res = await axios.post("http://localhost:3000/api/guide/register", jsonData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("📥 Registration response:", res.data);
      setResponse(res.data);
    } catch (err) {
      console.error("❌ Axios error (registration):", err.response || err.message);
      console.error("❌ Full error details:", err);
      
      // Get the actual error message from the server
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          "Server error";
      
      setResponse({ success: false, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <FormTitle>Guide Registration Form</FormTitle>
      <FormContainer>
        <RegistrationForm onSubmit={handleSubmit}>
          <Input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <Input 
            type="text" 
            name="city" 
            placeholder="City" 
            value={form.city} 
            onChange={handleChange} 
          />
          <Input 
            type="text" 
            name="mobile" 
            placeholder="Mobile (e.g., 9876543210 or +919876543210)" 
            value={form.mobile} 
            onChange={handleChange} 
            required 
          />
          <Input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <Input 
            type="text" 
            name="tourist_spot_covered" 
            placeholder="Tourist Spots Covered" 
            value={form.tourist_spot_covered} 
            onChange={handleChange} 
          />
          <Input 
            type="text" 
            name="language" 
            placeholder="Languages" 
            value={form.language} 
            onChange={handleChange} 
          />
          <div style={{ marginBottom: "1rem" }}>
            <Input 
              type="file" 
              name="photoFile" 
              accept="image/*"
              onChange={handleChange} 
            />
            <small style={{ color: "#6b7280", fontSize: "0.875rem", display: "block", marginTop: "0.25rem" }}>
              📸 Upload your photo (will be automatically compressed for faster upload)
            </small>
          </div>
          <Input 
            type="text" 
            name="photoUrl" 
            placeholder="Or provide a Photo URL" 
            value={form.photoUrl} 
            onChange={handleChange} 
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </SubmitButton>
        </RegistrationForm>

        <ResponseSection>
          {response ? (
            response.success && response.data ? (
              <GuideCard guide={response.data} />
            ) : (
              <NotVerifiedMessage>
                {response.message || "You are not govt. verified guide"}
              </NotVerifiedMessage>
            )
          ) : null}
        </ResponseSection>
      </FormContainer>
      <Footer />
    </>
  );
}