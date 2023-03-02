import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import { getServerSession } from "next-auth";
import { Providers } from "./providers";

async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;
  const session = await getServerSession();
  return (
    <Providers session={session}>
    <main>
      {/* Message list */}
      <MessageList initialMessages={messages} />
      {/* ChatInput */}
      <ChatInput session={session} />
      </main>
      </Providers>
  );
}

export default HomePage;
