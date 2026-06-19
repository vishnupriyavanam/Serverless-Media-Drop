'use client'

import { Upload, Trash2, Heart } from 'lucide-react'

interface Activity {
  id: string
  type: 'upload' | 'delete' | 'favorite'
  fileName: string
  timestamp: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'upload',
    fileName: 'design-mockup.png',
    timestamp: 'Just now',
  },
  {
    id: '2',
    type: 'favorite',
    fileName: 'project-proposal.pdf',
    timestamp: '2 minutes ago',
  },
  {
    id: '3',
    type: 'upload',
    fileName: 'dashboard-ui.png',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    type: 'delete',
    fileName: 'old-banner.jpg',
    timestamp: '3 hours ago',
  },
  {
    id: '5',
    type: 'upload',
    fileName: 'budget-report.pdf',
    timestamp: 'Yesterday',
  },
]

export function ActivityFeed() {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-4 h-4" />
      case 'delete':
        return <Trash2 className="w-4 h-4" />
      case 'favorite':
        return <Heart className="w-4 h-4" />
      default:
        return <Upload className="w-4 h-4" />
    }
  }

  const getActivityText = (type: Activity['type'], fileName: string) => {
    switch (type) {
      case 'upload':
        return `Uploaded ${fileName}`
      case 'delete':
        return `Deleted ${fileName}`
      case 'favorite':
        return `Marked ${fileName} as favorite`
      default:
        return fileName
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'upload':
        return 'bg-blue-500/10 text-blue-500'
      case 'delete':
        return 'bg-destructive/10 text-destructive'
      case 'favorite':
        return 'bg-pink-500/10 text-pink-500'
      default:
        return 'bg-primary/10 text-primary'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 pb-3 border-b border-border last:border-0 last:pb-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                {getActivityText(activity.type, activity.fileName)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
        View all activity
      </button>
    </div>
  )
}
