'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HomeHero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl w-full text-center">
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Your Serverless <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Media Vault
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Upload, manage, and share your media files with blazing fast speeds. Built for the modern cloud.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base">
              Get Started Free
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-8 py-6 text-base"
          >
            Try Demo
          </Button>
        </div>

        {/* Decorative element */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            No credit card required. Get started in seconds.
          </p>
        </div>
      </div>
    </section>
  )
}
