/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional absolute API origin (e.g. cross-origin deployment).
   * Leave unset — browser uses same-origin `/meet/api/` (Nest) and `/socket.io/`.
   * Laravel platform APIs use `/api/` (see externalApi/config.ts).
   */
  readonly VITE_MEETING_API_URL?: string
  /**
   * Optional absolute mediaserver Socket.IO origin (no path).
   * Leave unset — browser uses same-origin with path `/mediasoup-socket.io`.
   */
  readonly VITE_MEDIA_WS_URL?: string
  /** Socket.IO engine path on the mediaserver (default `/mediasoup-socket.io`). */
  readonly VITE_MEDIA_SOCKET_PATH?: string
  /** @deprecated Use {@link VITE_MEDIA_SOCKET_PATH}. */
  readonly VITE_MEDIA_WS_PATH?: string
  /** Redirect after leave or when host ends meeting (`VITE_MEETING_REDIRECT_URL`). */
  readonly VITE_MEETING_REDIRECT_URL?: string
  /** Comma-separated TURN/TURNS URLs (fallback when mediaserver does not return ICE servers). */
  readonly VITE_TURN_URLS?: string
  readonly VITE_TURN_USERNAME?: string
  readonly VITE_TURN_PASSWORD?: string
  /** Laravel platform API base. Default `/api` (same origin as the Laravel site). */
  readonly VITE_EXTERNAL_API_URL?: string
  /** Stripe publishable key for attendee payments and tips. */
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string
  /** Login page when session is missing (production). */
  readonly VITE_EXTERNAL_LOGIN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
