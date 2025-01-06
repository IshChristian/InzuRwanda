import React, { useState, useEffect } from 'react';
import { Bell, Lock, Settings, User, Mail, Phone, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [accountType, setAccountType] = useState('');
  const [businessRole, setBusinessRole] = useState('');
  const [userID, setuserID] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('accountType'); // Tabs: accountType, verification, verifyCode

  // Extract email from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');

  useEffect(() => {
    if (!email) {
      alert('No email provided in URL.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8888/auth/user-details/${encodeURIComponent(email)}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDetails(data);
        setAccountType(data.accountType || '');
        setBusinessRole(data.businessDetails?.businessRole || '');
        setBusinessRole(data.userID?.userID || '');
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handlePostAccountType = async () => {
    try {
      // Construct the payload
      const payload = {
        email, // Include the user's email in the payload
        accountType,
        ...(accountType === 'business' && { businessRole }), // Add businessRole if accountType is 'business'
      };
  
      // Make the PUT request
      const response = await fetch('http://localhost:8888/auth/update-business-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Convert payload to JSON string
      });
  
      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save account type');
      }
  
      // Handle successful response
      alert('Account type saved successfully.');
      setActiveTab('verification'); // Navigate to the verification tab
    } catch (error) {
      console.error('Error saving account type:', error);
      // alert('Failed to save account type:', error.message);
    }
  };
  
  const handleGetVerificationCode = async () => {
    try {
      const payload = {
        method: verificationMethod,
        value: verificationMethod === 'email' ? email : phone,
      };
  
      const response = await fetch('http://localhost:8888/auth/send-verification-code', {
        method: 'POST', // Corrected to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }
  
      alert(`Verification code sent via ${verificationMethod}.`);
      setActiveTab('verifyCode'); // Navigate to the verify code tab
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Failed to send verification code.');
    }
  };
  

  const handleVerifyCode = async () => {
    try {
      const payload = {
        email,                // Email from the form
        code: verificationCode,  // Code entered by the user
      };
  
      // Use POST method and send the payload in the request body as JSON
      const response = await fetch('http://localhost:8888/auth/verify-code', {
        method: 'POST',  // Use POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),  // Send the payload as JSON
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.error && responseData.error === "Invalid or expired verification code") {
          alert('The verification code has expired. Please request a new code.');
          return;
        }
        throw new Error('Verification failed');
      }
  
      alert('Verification successful');
      setIsVerified(true); // Optionally update state
    navigate('/dashboard');  // Proceed to the next step
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Verification failed');
    }
  };
  
  
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!email) {
    return <div>No email provided.</div>;
  }

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'accountType':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Select Account Type</h3>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {['personal', 'business'].map((type) => (
                <label key={type} className="flex-1">
                  <input
                    type="radio"
                    name="accountType"
                    value={type}
                    checked={accountType === type}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center p-5 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
                    <div>
                      <div className="text-lg font-semibold capitalize">{type}</div>
                      <div className="text-sm">{type === 'personal' ? 'For individual use' : 'For company use'}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {accountType === 'business' && (
              <div className="mt-4 space-y-4">
                <h4 className="text-lg font-semibold text-gray-700">Select Business Role</h4>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {['owner', 'commissioner'].map((role) => (
                    <label key={role} className="flex-1">
                      <input
                        type="radio"
                        name="businessRole"
                        value={role}
                        checked={businessRole === role}
                        onChange={(e) => setBusinessRole(e.target.value)}
                        className="sr-only peer"
                      />
                      <div className="flex items-center justify-center p-5 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
                        <div>
                          <div className="text-lg font-semibold capitalize">{role}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button onClick={handlePostAccountType} className="btn btn-primary w-full sm:w-auto">
              Save Account Type
            </button>
          </div>
        );
      case 'verification':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Verify Your Account</h3>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {['email', 'phone'].map((method) => (
                <label key={method} className="flex-1">
                  <input
                    type="radio"
                    name="verificationMethod"
                    value={method}
                    checked={verificationMethod === method}
                    onChange={(e) => setVerificationMethod(e.target.value)}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center p-5 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 hover:bg-gray-50">
                    <div>
                      <div className="text-lg font-semibold capitalize">{method}</div>
                      <div className="text-sm">{method === 'email' ? email : phone}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={handleGetVerificationCode} className="btn btn-primary w-full sm:w-auto">
              Send Verification Code
            </button>
          </div>
        );
      case 'verifyCode':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Enter Verification Code</h3>
            <input
              type="text"
              placeholder="Enter code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              maxLength={6}
            />
            <button
              onClick={handleVerifyCode}
              className="btn btn-primary w-full sm:w-auto"
              disabled={verificationCode.length !== 6}
            >
              Verify Code
            </button>
            {isVerified && <div className="alert alert-success">Verification successful!</div>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Profile Settings</h1>
      <div className="tabs tabs-boxed mb-6">
        {['accountType', 'verification', 'verifyCode'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          >
            {tab === 'accountType' && 'Account Type'}
            {tab === 'verification' && 'Verification'}
            {tab === 'verifyCode' && 'Enter Code'}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow">{renderTabContent()}</div>
    </div>
  );
}
