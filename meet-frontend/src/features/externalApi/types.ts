/** External Laravel platform API — shared request/response shapes. */

export type ExternalMeetingMode = 'presenter' | 'viewer'

export type ExternalMeetingStatus = 'started' | 'paused' | 'Ended' | 'Started' | string

export type ExternalApiEnvelope<T> = {
  status: number
  success?: boolean
  message?: string
  data: T
}

export type ExternalEventImage = {
  id?: number
  name?: string
  fileUrl?: string
  filePath?: string
  type?: string
  size?: string
}

export type ExternalEventUser = {
  id: number
  name: string
  username?: string
  email?: string
  avgRating?: number | string
  profile?: {
    profile_picture?: string | null
    social_profile_picture_url?: string | null
  }
}

export type ExternalEventTimeSlot = {
  id: number
  eventId: number
  meetingRoomId: string
  meetingRoomServerId?: string
  duration: number | string
  startDate?: string
  startTime?: string
  startDateTime?: string
  currentStatus?: string
  currentDuration?: number
  totalSeats?: number | string
  bookedSeats?: number | string
  cost?: number | string
}

export type ExternalMeetingRoomData = {
  id?: number
  userId?: number
  eventTitle?: string
  eventDescription?: string
  eventCategory?: string
  eventSubCategory?: string
  eventType?: string
  quickMeet?: boolean
  meetingRoomId: string
  mode: ExternalMeetingMode
  eventBookingId?: number
  eventCreatedUser?: ExternalEventUser
  eventTimeSlot?: ExternalEventTimeSlot
  eventImages?: ExternalEventImage[]
  extendedDuration?: number | string
  extendedDurationId?: number | false | null
  remainingCost?: number | string
  booked?: boolean
  cost?: number | string
  duration?: number | string
  timezone?: string
}

export type ExternalExtendDurationRecord = {
  id: number
  user_id?: number
  cost?: string | number
  room_id?: string
  duration?: string | number
  remember_token?: string
}

export type ExternalPaymentRecord = {
  id: number
  amount?: string | number
  paid?: boolean
  status?: string
  extended_id?: number | null
}

export type ExternalReviewRecord = {
  id: number
  user_id?: number
  event_id?: number
  host_id?: number
  slot_id?: number
  comment_to_host?: string
  rating?: number
}

export type ExternalFileManagerItem = {
  id: number | string
  name: string
  file_url: string
  file_path?: string
  type: string
  pages?: number
  size?: string
  isDirectory?: number
  user_id?: number
}

export type ExternalFileManagerListResponse = {
  data: ExternalFileManagerItem[]
  current_page?: number
  next_page_url?: string | null
  per_page?: number
}

export type AuthenticateMeetingRoomRequest = {
  roomId: string
  userId: string
}

export type UpdateMeetingStatusRequest = {
  roomId: string
  userId: string
  currentDuration: number
  currentStatus: ExternalMeetingStatus
}

export type BlockMeetingUserRequest = {
  roomId: string
  userId: string
  block: true
}

export type ExtendMeetingDurationRequest = {
  roomId: string
  userId: string
  duration: number
  cost: number
  host_stripe_id?: string
}

export type ProcessPaymentRequest = {
  stripeToken: string
  eventId: number | string
  roomId: string
  cost: number
  extendedDurationId?: number | false | null
}

export type SubmitReviewRequest = {
  comment: string
  eventId: number | string
  slotId: number | string
  hostId: number | string
  rating?: number
  cost?: number
  stripeToken?: string
}

export type SaveRecordingRequest = {
  roomId: string
  fileName: string
  userId: string
}

export type ListFileManagerRequest = {
  searchQuery?: string
  filterBy?: string
}
