'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function SettingsPage() {
  const [savedChanges, setSavedChanges] = useState(false)

  const handleSave = () => {
    setSavedChanges(true)
    setTimeout(() => setSavedChanges(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Storage Limit
              </label>
              <select className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>10 GB</option>
                <option>50 GB</option>
                <option>100 GB</option>
                <option>500 GB</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-foreground mb-4">Privacy</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">Allow analytics</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-border bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">Email notifications</span>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Delete Account</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Storage */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Storage</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Used Storage</span>
              <span className="text-sm text-muted-foreground">1.2 GB / 10 GB</span>
            </div>
            <div className="w-full bg-background rounded-full h-2 overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '12%' }} />
            </div>
          </div>

          <div className="bg-background rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              You have plenty of storage left. Upgrade your plan to get more storage space.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
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
