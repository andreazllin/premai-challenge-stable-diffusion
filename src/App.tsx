import ShareOnTwitterButton from "./components/ShareOnTwitterButton.tsx"
import { exampleImagePrompts } from "./constants/prompts.ts"
import { getRandomElements } from "./helpers/array.ts"
import useStableDiffusion from "./hooks/useStableDiffusion.ts"
import { Button, Box, Container, TextInput, Image, Flex, Title, Text, Progress } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconPencil } from "@tabler/icons-react"
import useProgressBar from "./hooks/useProgressBar.ts"

const randomExamplePrompt = getRandomElements(exampleImagePrompts, 2).join(", ")
const randomSuggestedPrompts = getRandomElements(exampleImagePrompts, 3)

const App = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { imageBase64, isGenerating, setPrompt, prompt } = useStableDiffusion()
  const { progress, visible } = useProgressBar(isGenerating)

  const form = useForm({
    initialValues: {
      prompt: ""
    }
  })

  return (
    <>
      <Container
        py={64}
      >
        <Flex
          direction={"column"}
          align={"center"}
          gap={"xl"}
        >


          <Title
            order={1}
            weight={800}
          >
            Stable diffusion with Prem
            <Text
              align="center"
              component="span"
              variant="gradient"
              gradient={{
                from: "blue.8",
                to: "cyan.3",
                deg: 25
              }}>
              AI
            </Text>
            .io
          </Title>

          <Container
            p={0}
            mx={12}
            pos={"relative"}
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              overflow: "hidden"
            })}
          >

            {
              visible && <Flex
                justify={"center"}
                align={"center"}
                sx={{
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(2px)",
                  display: "flex"
                }}
              >
                <Progress
                  m={32}
                  value={progress}
                  sx={{
                    width: "100%"
                  }}
                />
              </Flex>
            }

            <Image
              width={512}
              height={512}
              fit="contain"
              src={imageBase64 ? `data:image/png;base64,${imageBase64}` : null}
              alt={prompt}
              withPlaceholder
              placeholder={<></>}
            />
          </Container>

          <Flex
            gap={"xs"}
            wrap={{ base: "wrap", md: "nowrap" }}
            justify={"center"}
          >
            {
              randomSuggestedPrompts.map((prompt, index) => {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => {
                      form.setFieldValue("prompt", prompt)
                      setPrompt(prompt)
                    }}
                  >
                    {prompt}
                  </Button>
                )
              })
            }
          </Flex>

          <Box component="form"
            onSubmit={form.onSubmit((values) => {
              setPrompt(values.prompt)
            })}
            sx={() => ({
              width: "100%",
            })}
          >
            <Flex
              wrap={"wrap"}
              direction={{ base: "column", xs: "row" }}
              gap={{ base: "sm", sm: "lg" }}
              justify={{ sm: "center" }}
            >
              <TextInput
                style={{
                  flex: 1
                }}
                disabled={isGenerating}
                placeholder={`ex. ${randomExamplePrompt}`}
                {...form.getInputProps("prompt")}
              />

              <Button
                leftIcon={<IconPencil />}
                type={"submit"}
                loading={isGenerating}
              >
                Generate!
              </Button>
            </Flex>
          </Box>

          {
            !!imageBase64 && !!prompt && <ShareOnTwitterButton
              imageBase64={imageBase64}
              prompt={prompt}
            />
          }
        </Flex>
      </Container>
    </>
  )
}

export default App
