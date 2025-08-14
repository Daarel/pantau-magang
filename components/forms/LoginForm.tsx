"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import Card from "../Card";
import CardContent from "../CardContent";
import CardHeader from "../CardHeader";
import CardTitle from "../CardTitle";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { FC } from "react";
import { loginUser } from "@/lib/auth";

import type { User } from "@/app/page";

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const [nomorInduk, setNomorInduk] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(nomorInduk, password);
      if (res.error) {
        setError(res.error);
      } else {
        onLogin(res.user);
      }
    } catch (e) {
      setError("Login failed. Please try again.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-600 rounded-lg p-3 w-fit mb-4">
            <div className="text-white font-bold text-lg">LEMIGAS</div>
          </div>
          <CardTitle className="text-2xl text-gray-900">
            PANTAU MAGANG
          </CardTitle>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="relative">
              <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Nomor Induk"
                value={nomorInduk}
                onChange={(e) => setNomorInduk(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;