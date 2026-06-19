import { UploadArea } from '@/components/upload-area'
import { StatCards } from '@/components/stat-cards'
import { FileGallery } from '@/components/file-gallery'

export const metadata = {
  title: 'Dashboard - Serverless Media Drop',
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Upload and manage your cloud media files.
        </p>
      </div>

      {/* Stats */}
      <StatCards />

      {/* Upload */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Upload New Files
        </h2>

        <UploadArea />
      </section>

      {/* Files */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          My Uploads
        </h2>

        <FileGallery />
      </section>
    </div>
  )
}