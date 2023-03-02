import { useSession } from "next-auth/react";
import Image from "next/image";
import { Message } from "../typings";

type Props = {
  message: Message;
};

function MessageComponent({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit ${isUser && "ml-auto"}`}>
      <div className={`flex-shrink-0 ${isUser && "order-2"}`}>
        <Image
          className="mx-2 rounded-full"
          src={message.profilePic}
          alt={""}
          width={50}
          height={10}
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? "text-blue-400 text-right" : "red-red-400 text-left"
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 text-white  rounded-lg w-fit ${
              isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400"
            }`}
          >
            <p
              className={`text-[0.65rem] italic px-2 text-gray-300 ${
                isUser && "text-right"
              }`}
            >
              {message.message}
            </p>
          </div>
        </div>
        <p>{new Date(message.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default MessageComponent;
