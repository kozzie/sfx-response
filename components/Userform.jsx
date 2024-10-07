"use client"; 
import { useState } from 'react';

export default function UserForm() {
  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>

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
  );
}
