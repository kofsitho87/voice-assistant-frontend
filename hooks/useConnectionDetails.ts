import { useCallback, useEffect, useState } from 'react';
import { ConnectionDetails } from '@/app/api/connection-details/route';
import { getParticipantToken } from '@/app/actions';


export default function useConnectionDetails({siteId, phoneNumber, userId}: {siteId: string, phoneNumber: string, userId: string}) {
  // Generate room connection details, including:
  //   - A random Room name
  //   - A random Participant name
  //   - An Access Token to permit the participant to join the room
  //   - The URL of the LiveKit server to connect to
  //
  // In real-world application, you would likely allow the user to specify their
  // own participant name, and possibly to choose from existing rooms to join.

  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);

  const fetchConnectionDetails = useCallback(() => {
    setConnectionDetails(null);
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details',
      window.location.origin
    );
    
    // Query parameters 추가
    url.searchParams.append('siteId', siteId);
    url.searchParams.append('phoneNumber', phoneNumber);
    url.searchParams.append('userId', userId);
    
    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConnectionDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching connection details:', error);
        alert(error.message);
      });
    // getParticipantToken({siteId, phoneNumber, userId}).then((data) => {
    //   console.log(data);
    //   setConnectionDetails(data);
    // });
  }, [siteId, phoneNumber, userId]);

  useEffect(() => {
    fetchConnectionDetails();
  }, [fetchConnectionDetails]);

  return { connectionDetails, refreshConnectionDetails: fetchConnectionDetails };
}
