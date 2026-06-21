'use client'

import {
  Cloud,
  Layout,
  Upload,
  Heart,
  Settings,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Layout },
  { href: '/dashboard/uploads', label: 'Uploads', icon: Upload },
  { href: '/dashboard/favorites', label: 'Favorites', icon: Heart },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Cloud className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>

          <span className="font-bold text-sidebar-foreground text-lg">
            Media Drop
          </span>
        </div>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}