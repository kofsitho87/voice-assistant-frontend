'use server'

import { AccessToken, type AccessTokenOptions, type VideoGrant } from "livekit-server-sdk"

const API_KEY = process.env.LIVEKIT_API_KEY
const API_SECRET = process.env.LIVEKIT_API_SECRET
const LIVEKIT_URL = process.env.LIVEKIT_URL

export type ConnectionDetails = {
    serverUrl: string;
    roomName: string;
    participantName: string;
    participantToken: string;
  };

export async function getParticipantToken(payload:{siteId: string, phoneNumber: string, userId: string}) {
    const participantIdentity = payload.userId;
    const participantName = payload.phoneNumber;
    const roomName = `${payload.siteId}_${Math.floor(Math.random() * 10_000)}`;

    const participantToken = await createParticipantToken(
        { identity: participantIdentity, name: participantName },
        roomName,
    )

    return {
        serverUrl: LIVEKIT_URL!,
        participantToken,
        participantName,
        roomName
    } as ConnectionDetails
}
  
function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
    const at = new AccessToken(API_KEY, API_SECRET, {
        ...userInfo,
        ttl: "15m",
    })
    const grant: VideoGrant = {
        room: roomName,
        roomJoin: true,
        canPublish: false,
        canPublishData: false,
        canSubscribe: true,
    }
    at.addGrant(grant)
    return at.toJwt()
}