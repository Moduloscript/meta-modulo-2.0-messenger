"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { getServerSession } from "next-auth";

type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);
  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;
    const messageTosend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageTosend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic:
        session?.user?.image!,
      email: session?.user?.email,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 px-5 py-3 bg-white border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed "
      >
        {" "}
        Send
      </button>
    </form>
  );
}

export default ChatInput;
