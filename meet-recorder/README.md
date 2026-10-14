# meet-recorder

Headless Chrome recording service for Avnik Meeting. When the host starts recording:

1. Launches headless Chromium and opens the `/join/record` meeting view
2. The page uses **MediaRecorder** (canvas compositor + mixed mediasoup audio) — same pattern as VKYC recorder-v1
3. Emits **5s WebM fragments** uploaded to this service via HTTP (`POST .../chunks/raw`)
4. On stop, **binary-concatenates** chunks into `{recordingId}.webm` (no ffmpeg)

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Service health |
| `POST` | `/api/recordings/start` | `{ roomId, hostUserId, recordingId? }` |
| `POST` | `/api/recordings/:id/stop` | Stop and finalize |
| `POST` | `/api/recordings/stop-by-room` | `{ roomId }` |
| `GET` | `/api/recordings/:id` | Session status |
| `GET` | `/api/recordings/library` | List completed recordings |
| `GET` | `/api/recordings/:id/file` | Stream `.webm` |
| `POST` | `/api/recordings/:id/chunks/raw?sequence=N` | Raw WebM chunk upload |

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `4000` | HTTP port |
| `STORAGE_DIR` | `./storage` | Recordings root |
| `FRONTEND_URL` | `http://localhost:5173/join` | Recording page origin (must include `/join` base path) |
| `RECORDER_PUBLIC_URL` | `http://127.0.0.1:4000` | Chunk upload URL (browser in recorder container) |
| `MEDIA_PUBLIC_WS_URL` | _(empty)_ | Optional SFU URL for /join/record; leave empty when using `FRONTEND_URL=http://meet-frontend/join` |
| `CHUNK_INTERVAL_MS` | `5000` | MediaRecorder timeslice (informational) |
| `CHROME_EXECUTABLE_PATH` | auto | Chromium binary |
| `MAX_PARALLEL_RECORDINGS` | `10` | Concurrent sessions |

## Output layout

```
storage/recordings/<recordingId>/
  chunks/chunk-000000.webm
  chunks/chunk-000001.webm
  meta.json
  <recordingId>.webm
```

Chunk 0 contains the WebM init segment; later chunks are continuations (VKYC-style binary merge).

## Docker

Included in root `compose.yaml` as `meet-recorder`. Recordings persist in volume `meet_recorder_storage_dev`.
