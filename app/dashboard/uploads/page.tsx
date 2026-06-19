import { FileGallery } from '@/components/file-gallery'

export const metadata = {
  title: 'Uploads - Serverless Media Drop',
}

export default function UploadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">All Uploads</h1>
        <p className="text-muted-foreground">View and manage all your uploaded files.</p>
      </div>

      <FileGallery />
    </div>
  )
}
