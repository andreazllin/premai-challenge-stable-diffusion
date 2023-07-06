import { Configuration, OpenAIApi } from "openai"
import { useEffect, useState } from "react";

import { AxiosError } from "axios";

import { showErrorNotification } from "../helpers/notifications";

type UseStableDiffusionReturnType = {
  imageBase64?: string
  prompt?: string
  setPrompt(prompt: string): void
  isGenerating: boolean
}

const configuration = new Configuration({
  basePath: import.meta.env.VITE_OPENAPI_BASE_PATH as string,
  apiKey: import.meta.env.VITE_OPENAPI_API_KEY as string
});

const openai = new OpenAIApi(configuration);

const useStableDiffusion = (): UseStableDiffusionReturnType => {
  const [imageBase64, setImageBase64] = useState<string>()
  const [prompt, setPrompt] = useState<string>()
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  useEffect(() => {
    if (prompt && !isGenerating) {
      setIsGenerating(true)
      openai.createImage({
        prompt,
        response_format: "b64_json",
        n: 1,
        size: "512x512",
      })
        .then(response => {
          const { b64_json } = response.data.data[0]
          setImageBase64(b64_json)
        })
        .catch(err => {
          console.log(err)
          showErrorNotification("Image generation failed", (err as AxiosError).message)
        })
        .finally(() => {
          setIsGenerating(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt])

  return {
    imageBase64,
    prompt,
    setPrompt,
    isGenerating
  }
}

export default useStableDiffusion
