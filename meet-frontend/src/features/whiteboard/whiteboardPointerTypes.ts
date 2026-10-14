export const WHITEBOARD_POINTER_SOCKET_EVENT = 'whiteboard_pointer'

export type WhiteboardPointerTool = 'pointer' | 'laser'

export type WhiteboardPointerPayload = {
  userId: string
  username: string
  pageKey: string
  pointer: {
    x: number
    y: number
    tool: WhiteboardPointerTool
  }
  button: 'up' | 'down'
  cleared?: boolean
}
