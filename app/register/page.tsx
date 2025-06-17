"use client"

import { useState } from "react"
import Image from "next/image"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register")

  const handleRegistrationSuccess = () => {
    // Switch to login tab after successful registration
    setActiveTab("login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 relative">
            <Image
              src="/images/winni-code-auth-logo.png"
              alt="Winni Code Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">News Portal</h1>
            <p className="text-gray-600 text-sm mt-1">Stay informed with the latest news</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${
                activeTab === "login"
                  ? "bg-white text-gray-900 border-b-2 border-black"
                  : "bg-gray-50 text-gray-600 hover:text-gray-900"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${
                activeTab === "register"
                  ? "bg-white text-gray-900 border-b-2 border-black"
                  : "bg-gray-50 text-gray-600 hover:text-gray-900"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeTab === "login" ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Login</h2>
                  <p className="text-gray-600 text-sm mt-1">Enter your credentials to access your account</p>
                </div>
                <LoginForm />
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Register</h2>
                  <p className="text-gray-600 text-sm mt-1">Create a new account to get started</p>
                </div>
                <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
