import { FunctionComponent } from 'react'
import { Button } from '@mantine/core'
import axios, { AxiosError } from "axios"
import { UploadResponse } from '../types/Imgur'
import { IconBrandTwitterFilled, IconCheck, IconX } from "@tabler/icons-react"
import { notifications } from '@mantine/notifications'

type Props = {
  imageBase64?: string
  prompt?: string
}

const ShareOnTwitterButton: FunctionComponent<Props> = ({
  imageBase64,
  prompt,
}) => {
  const shareImageOnTwitter = async (): Promise<void> => {
    if (!imageBase64 || !prompt) {
      return
    }

    try {
      notifications.show({
        id: 'upload-image',
        loading: true,
        title: 'Uploading image to Imgur',
        message: 'Image will be uploaded on Imgur and shared on Twitter.',
        autoClose: false,
        withCloseButton: false,
      })

      const res = await axios.post<UploadResponse>("https://api.imgur.com/3/upload", {
        type: "base64",
        name: "prem_ai.png",
        title: prompt,
        description: `Powered by PremAI.io stable diffusion with prompt: ${prompt}`,
        image: imageBase64.replace(/^data:image\/(png|jpg);base64,/, "")
      }, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID as string}`
        }
      })

      notifications.update({
        id: 'upload-image',
        color: 'green',
        title: 'Image was uploaded!',
        message: 'You can now share it on Twitter!',
        icon: <IconCheck />,
        autoClose: 10000,
        withCloseButton: true
      });

      const { data: { id } } = res.data

      const tweetIntentURL = new URL("https://twitter.com/intent/tweet")

      const tweetIntentParams = new URLSearchParams({
        text: `Look at what I've generated using premai.io stable diffusion: ${prompt}\n\n#stablediffusion #premai #challengewithlangchain`,
        url: `https://imgur.com/${id}`,
      })

      tweetIntentURL.search = tweetIntentParams.toString()

      const tweetUrl = tweetIntentURL.toString()

      window.open(tweetUrl, "_blank")
    } catch (error) {
      console.error(error)
      notifications.update({
        id: 'upload-image',
        color: 'red',
        title: 'Failed to share',
        message: (error as AxiosError).message,
        icon: <IconX />,
        autoClose: 10000,
        withCloseButton: true
      });
    }
  }

  return (
    <Button
      leftIcon={<IconBrandTwitterFilled />}
      variant="light"
      onClick={() => {
        void shareImageOnTwitter()
      }}
    >
      Share on Twitter
    </Button>
  )
}

export default ShareOnTwitterButton
