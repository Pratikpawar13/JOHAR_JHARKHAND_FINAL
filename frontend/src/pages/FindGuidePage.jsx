import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import GuideCard from "../components/GuideCard";
import { Html5QrcodeScanner } from "html5-qrcode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #f0fdf4, #eff6ff, #fef3f2);
  padding: 2rem 0;
`;

const MaxWidthContainer = styled.div`
  max-width: 64rem;
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

const MainCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin-top: 2rem;
`;

const Header = styled.div`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  padding: 2rem;
  color: white;
  text-align: center;
  
  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0;
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const SearchToggle = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 0.75rem;
  padding: 0.25rem;
  margin-bottom: 2rem;
  gap: 0.25rem;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.active ? `
    background: linear-gradient(to right, #3b82f6, #2563eb);
    color: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  ` : `
    background: transparent;
    color: #6b7280;
    
    &:hover {
      color: #111827;
      background: #e5e7eb;
    }
  `}
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
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
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(to right, #2563eb, #1d4ed8);
  }
`;

const QRContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  #reader {
    margin: 0 auto;
    max-width: 500px;
    border: 2px dashed #d1d5db;
    border-radius: 0.75rem;
    padding: 1rem;
  }
  
  #reader__dashboard_section {
    background: transparent !important;
  }
  
  #reader__header_message {
    color: #374151 !important;
    font-size: 0.875rem !important;
  }
  
  #reader__camera_selection {
    margin: 1rem 0 !important;
  }
  
  #reader__scan_region {
    border-radius: 0.5rem !important;
  }
`;

const ErrorMessage = styled.p`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #dc2626;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CameraButton = styled.button`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem auto;
  display: block;
  
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #2563eb, #1d4ed8);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #0369a1;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export default function FindGuidePage() {
  const [searchType, setSearchType] = useState("manual");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scannerStatus, setScannerStatus] = useState(""); // New status state
  const scannerRef = useRef(null);

  const handleManualSearch = async (e) => {
    e.preventDefault();
    setError("");
    setGuide(null);

    try {
      const res = await axios.post("http://localhost:3000/api/guide/find", {
        uniqueId: id,
        name: name,
      });

      console.log(`Guide data : ${res.data.data}`);
      setGuide(res.data.data);
    } catch (err) {
      setError("Guide not found");
    }
  };

  const startCamera = async () => {
    if (isScanning) {
      console.log("⚠️ Camera already running");
      return;
    }

    console.log("🎥 Starting camera...");
    setIsScanning(true);
    setError("");
    setGuide(null);
    setScannerStatus("Initializing camera...");

    try {
      // Check if browser supports camera
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported by this browser");
      }

      // Request camera permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the test stream
        setScannerStatus("Camera permission granted, starting scanner...");
      } catch (permissionError) {
        throw new Error("Camera permission denied. Please allow camera access and try again.");
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 1,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        }
      };

      const newScanner = new Html5QrcodeScanner("reader", config, false);
      scannerRef.current = newScanner;

      newScanner.render(
        async (qr) => {
          console.log("🔍 QR Scanned:", qr);
          setError("");
          setScannerStatus("QR code detected, processing...");
          
          try {
            const res = await axios.post("http://localhost:3000/api/guide/findByQR", { 
              uniqueId: qr.trim() // Trim whitespace
            });
            console.log("✅ Guide found:", res.data);
            setGuide(res.data.data);
            setScannerStatus("Guide found successfully!");
            stopCamera();
          } catch (err) {
            console.error("❌ Guide not found:", err);
            const errorMsg = err.response?.data?.message || `Guide not found for QR code: ${qr}`;
            setError(errorMsg);
            setScannerStatus("Scanning... (Guide not found, try another QR code)");
          }
        },
        (errorMessage) => {
          // Only log actual errors, not scanning warnings
          if (errorMessage && !errorMessage.includes("No QR code found")) {
            console.warn("QR Scanner message:", errorMessage);
          }
        }
      );

      setScannerStatus("Scanner ready - Point camera at QR code");
      console.log("✅ Camera started successfully");

    } catch (error) {
      console.error("❌ Error starting camera:", error);
      setError("Failed to start camera: " + error.message);
      setIsScanning(false);
      setScannerStatus("");
      
      // Additional error handling for common issues
      if (error.message.includes("Permission")) {
        setError("Camera permission denied. Please allow camera access in your browser settings and refresh the page.");
      } else if (error.message.includes("NotFound")) {
        setError("No camera found. Please ensure your device has a camera.");
      } else if (error.message.includes("NotSupported")) {
        setError("Camera not supported by this browser. Try using Chrome, Firefox, or Safari.");
      }
    }
  };

  const stopCamera = () => {
    if (scannerRef.current) {
      console.log("🛑 Stopping camera...");
      setScannerStatus("Stopping camera...");
      
      scannerRef.current.clear().catch((err) => {
        console.warn("Warning while stopping camera:", err);
      }).finally(() => {
        scannerRef.current = null;
        setIsScanning(false);
        setScannerStatus("");
        console.log("✅ Camera stopped");
      });
    } else {
      setIsScanning(false);
      setScannerStatus("");
    }
  };

  // Handle search type changes
  const handleSearchTypeChange = (newType) => {
    if (newType !== searchType) {
      // Clean up previous state
      if (searchType === "qr") {
        stopCamera();
      }
      setSearchType(newType);
      setError("");
      setGuide(null);
      setScannerStatus("");
    }
  };

  // Effect to handle QR mode initialization
  useEffect(() => {
    if (searchType === "qr") {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        startCamera();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [searchType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.warn);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer>
        <MaxWidthContainer>
          <MainCard>
            <Header>
              <h2>Find Guide</h2>
            </Header>

            <ContentContainer>
              <SearchToggle>
                <ToggleButton 
                  active={searchType === "manual"} 
                  onClick={() => handleSearchTypeChange("manual")}
                >
                  Manual Search
                </ToggleButton>
                <ToggleButton 
                  active={searchType === "qr"} 
                  onClick={() => handleSearchTypeChange("qr")}
                >
                  QR Scanner
                </ToggleButton>
              </SearchToggle>

              {searchType === "manual" && (
                <SearchForm onSubmit={handleManualSearch}>
                  <Input
                    type="text"
                    placeholder="Enter Unique ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <SearchButton type="submit">Find Guide</SearchButton>
                </SearchForm>
              )}

              {searchType === "qr" && (
                <QRContainer>
                  <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                    <CameraButton 
                      onClick={isScanning ? stopCamera : startCamera}
                      disabled={false}
                    >
                      {isScanning ? "Stop Scanner" : "Start Scanner"}
                    </CameraButton>
                    
                    {/* Debug information */}
                    <div style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                      Status: {isScanning ? "Active" : "Inactive"}
                      {isScanning && (
                        <div style={{ marginTop: "0.25rem" }}>
                          💡 Tip: Make sure QR code is well-lit and clearly visible
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {scannerStatus && (
                    <StatusMessage>{scannerStatus}</StatusMessage>
                  )}
                  
                  <div id="reader" style={{ minHeight: "300px" }}>
                    {/* This div will be populated by Html5QrcodeScanner */}
                  </div>
                  
                  {/* Additional help text */}
                  {isScanning && (
                    <div style={{ 
                      marginTop: "1rem", 
                      fontSize: "0.875rem", 
                      color: "#6b7280",
                      textAlign: "center"
                    }}>
                      <p>📱 Hold your device steady</p>
                      <p>🎯 Center the QR code in the frame</p>
                      <p>💡 Ensure good lighting</p>
                    </div>
                  )}
                </QRContainer>
              )}

              {error && <ErrorMessage>{error}</ErrorMessage>}

              {guide && <GuideCard guide={guide} />}
            </ContentContainer>
          </MainCard>
        </MaxWidthContainer>
      </PageContainer>
      <Footer />
    </>
  );
}