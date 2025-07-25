import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

/**
 * Main chat page component
 * Handles authentication, model selection from cookies, and initializes new chat sessions
 */
export default async function Page() {
  // Check for valid user session
  const session = await auth();

  // Redirect to guest auth if no session exists
  if (!session) {
    redirect('/api/auth/guest');
  }

  // Generate unique identifier for new chat session
  const id = generateUUID();

  // Retrieve user's preferred chat model from cookies
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  // Use default model if no cookie preference is set
  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        
        <DataStreamHandler />
      </>
    );
  }

  // Use model from cookie preference
  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      
      <DataStreamHandler />
    </>
  );
}
