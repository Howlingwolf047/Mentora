"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, Eye, EyeOff, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"teacher" | "student">("student")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const validateStep1 = () => {
    // Basic validation
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields")
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return false
    }

    setError("")
    return true
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Clear any previous errors
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, we would create the user account here
      router.push(`/${userType}/dashboard`)
    }, 1500)
  }

  const passwordStrength = () => {
    if (!password) return 0

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 1

    // Contains number
    if (/\d/.test(password)) strength += 1

    // Contains special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1

    // Contains uppercase and lowercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1

    return strength
  }

  const strengthText = () => {
    const strength = passwordStrength()
    if (strength === 0) return "Weak"
    if (strength === 1) return "Fair"
    if (strength === 2) return "Good"
    if (strength === 3) return "Strong"
    return "Very Strong"
  }

  const strengthColor = () => {
    const strength = passwordStrength()
    if (strength === 0) return "bg-red-500"
    if (strength === 1) return "bg-orange-500"
    if (strength === 2) return "bg-yellow-500"
    if (strength === 3) return "bg-green-500"
    return "bg-green-600"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduAssist AI</span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground">Sign up to get started with EduAssist AI</p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-lg border">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-white" : "border border-gray-300 text-gray-500"}`}
                >
                  {step > 1 ? <Check className="h-4 w-4" /> : 1}
                </div>
                <div className="ml-2 text-sm font-medium">Account Info</div>
              </div>
              <div className="h-0.5 w-16 bg-gray-200"></div>
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-white" : "border border-gray-300 text-gray-500"}`}
                >
                  2
                </div>
                <div className="ml-2 text-sm font-medium">Security</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>I am a</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) => setUserType(value as "teacher" | "student")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher-signup" />
                      <Label htmlFor="teacher-signup">Teacher</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student-signup" />
                      <Label htmlFor="student-signup">Student</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="button" className="w-full" onClick={handleNextStep}>
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">Password strength: {strengthText()}</span>
                        <span className="text-xs">{passwordStrength()}/4</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strengthColor()}`}
                          style={{ width: `${(passwordStrength() / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />

                  {password && confirmPassword && (
                    <div className="flex items-center mt-1">
                      {password === confirmPassword ? (
                        <>
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-500">Passwords match</span>
                        </>
                      ) : (
                        <span className="text-xs text-red-500">Passwords do not match</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign up"}
                  </Button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

