'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [savedChanges, setSavedChanges] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || 'Logged in user')
    }

    getUser()
  }, [])

  const handleSave = () => {
    setSavedChanges(true)
    setTimeout(() => setSavedChanges(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and storage preferences.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Storage Limit
              </label>
              <div className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground">
                Free Plan - 10 GB
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-foreground mb-4">Preferences</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-foreground">Email notifications</span>
          </label>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Storage</h2>
        <p className="text-sm text-muted-foreground">
          Your uploaded media is stored securely using Supabase.
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {savedChanges ? '✓ Changes saved' : 'Save changes'}
        </Button>

        <Button
          variant="outline"
          className="border border-border bg-card hover:bg-card/80 text-foreground"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}