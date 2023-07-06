import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"

export const showErrorNotification = (title: string, message: string) => {
  notifications.show({
    title,
    message,
    color: "red",
    icon: <IconX />
  })
}
