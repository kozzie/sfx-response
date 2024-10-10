"use client"; 
import { useState, useRef, useEffect } from 'react';

export default function UserForm() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To track message type (success or error)
  const [isVisible, setIsVisible] = useState(false); // To control visibility
  const formRef = useRef(null); // Create a ref for the form

  const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage(''); // Clear previous messages

      const formData = new FormData(formRef.current); // Use ref to get form data
      const data = Object.fromEntries(formData);

      try {
          const response = await fetch('/api/users', { // Your API route
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          // Check if the response was successful
          if (response.ok) {
              setMessage('User registered successfully!'); // Success message
              setMessageType('success'); // Set message type to success
              formRef.current.reset(); // Clear the form fields using ref
          } else {
              // Handle unsuccessful responses
              const errorData = await response.json();
              setMessage('Error: ' + (errorData.message || 'Failed to register user'));
              setMessageType('error'); // Set message type to error
          }
      } catch (error) {
          console.error('Error registering user:', error);
          setMessage('Error: Failed to register user.'); // Catch any unexpected errors
          setMessageType('error'); // Set message type to error
      }
  };

  // Automatically dismiss the toast after a few seconds
  useEffect(() => {
    if (message) {
      setIsVisible(true); // Show toast
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide toast after delay
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 500); // Wait for fade-out before clearing message
      }, 3000); // Change duration as needed (3000 ms = 3 seconds)

      return () => clearTimeout(timer); // Cleanup on unmount or when message changes
    }
  }, [message]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow relative">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      
      {/* Displaying toast message */}
      {isVisible && (
        <div className={`toast fixed inset-0 flex items-center justify-center`}>
          <div className={`bg-${messageType === 'success' ? 'green-500' : 'red-500'} text-white p-2 rounded transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {message}
          </div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your last name"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* Toast styles */}
      <style jsx>{`
        .toast {
          position: fixed;
          top: 50%; /* Center vertically */
          left: 50%; /* Center horizontally */
          transform: translate(-50%, -50%); /* Adjust for width and height */
          z-index: 9999; /* Ensure it's above other content */
        }
      `}</style>
    </div>
  );
}