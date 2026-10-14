import {
  CONFERENCE_STAGE_MAX_PARTICIPANTS,
} from '../../constants/meeting'

export function splitConferenceParticipants<T>(
  participants: T[],
  maxOnStage = CONFERENCE_STAGE_MAX_PARTICIPANTS,
): { stageParticipants: T[]; overflowParticipants: T[] } {
  const limit = Math.max(1, maxOnStage)
  return {
    stageParticipants: participants.slice(0, limit),
    overflowParticipants: participants.slice(limit),
  }
}
