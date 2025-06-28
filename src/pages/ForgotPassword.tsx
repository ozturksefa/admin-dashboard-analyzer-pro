
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, Bot, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      console.log('Password reset request for:', email);
    }, 1500);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold">Check your email</CardTitle>
              <CardDescription className="text-gray-600">
                We've sent a password reset link to your email address
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 text-center">
                <p>Didn't receive the email? Check your spam folder or</p>
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="text-primary hover:text-primary/80 font-medium underline mt-1"
                >
                  try again
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Nisus Central RPA</h1>
                <p className="text-lg text-gray-600">RPA Orchestrator</p>
              </div>
            </div>
            
            <div className="space-y-6 mt-12">
              <h2 className="text-2xl font-semibold text-gray-900">
                Secure password recovery
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Reset your password securely and get back to managing your 
                automation processes with confidence.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Secure reset process</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Email verification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Quick access restoration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Forgot Password Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center mb-4 lg:hidden">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-center">Forgot password?</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending reset link...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Send reset link</span>
                    </div>
                  )}
                </Button>

                <div className="text-center pt-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
