export interface Photo {
  alt_description: string
  blur_hash: string
  color: string
  created_at: string
  dateFavoriteAdd?: string
  description: string
  height: number
  id: string
  liked_by_user: boolean
  likes: number
  links: {
    download: string
    download_location: string
    html: string
    self: string
  }
  promoted_at: string
  slug: string
  topic_submissions: {
    [category: string]: { status: string }
  }
  updated_at: string
  urls: {
    small: string
  }
  user: {
    first_name: string
    id: string
    name: string
    updated_at: string
    username: string
  }
  width: number
}
