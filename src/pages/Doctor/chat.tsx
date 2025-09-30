import ChatBox from "../../features/chat/chat";
import Navbar from "../../components/Doctor/Dashboard/Navbar";

const docChat = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <ChatBox chatPartnerEmail={""} />
    </div>
  );
};

export default docChat;
