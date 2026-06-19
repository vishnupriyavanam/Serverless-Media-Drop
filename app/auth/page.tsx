'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Cloud } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        setLoading(false)
        return
      }

      setMessage('Account created successfully. You can sign in now.')
      setIsLogin(true)
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Cloud className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            Serverless Media Drop
          </span>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <p className="text-sm text-muted-foreground">
              {isLogin
                ? 'Sign in to manage your media files'
                : 'Create your account to start uploading'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-foreground">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-foreground">
                Password
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>

            {message && (
              <p className="text-sm text-muted-foreground">{message}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading
                ? 'Please wait...'
                : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>

            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full"
          >
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setMessage('')
              }}
              className="text-primary font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}