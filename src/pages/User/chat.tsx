import ChatBox from "../../features/chat/chat";
import Navbar from "../../components/User/Navbar/navbar";

function Chat(){
    return(
        <div>
            <Navbar/>
            <ChatBox chatPartnerEmail={""} />
        </div>
    )
}

export default Chat;
