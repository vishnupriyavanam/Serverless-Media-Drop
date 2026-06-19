import { FileGallery } from '@/components/file-gallery'

export const metadata = {
  title: 'Favorites - Serverless Media Drop',
}

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Favorites</h1>
        <p className="text-muted-foreground">Your favorited files are displayed here.</p>
      </div>

      <FileGallery />
    </div>
  )
}
