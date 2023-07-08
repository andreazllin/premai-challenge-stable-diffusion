export type UploadResponse = {
  status: number
  success: boolean
  data: {
    id: string
    deletehash: string
    description: string
    name: string
    type: string
    width: number
    height: number
    size: number
    link: string
    datetime: number
  }
}

