'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HomeNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">SM</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:inline">
            Serverless Media Drop
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="ghost" className="text-foreground hover:bg-muted">
              Login
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
