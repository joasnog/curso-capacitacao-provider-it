import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConnection";
import Profile from '../../img/profile.png';
import './message.css';
import TimestampToString from "../../utils/timestamp_to_string";

export default function Message({ message }) {
    const [user] = useAuthState(auth);

    return (
        <div className={`${message.uid === user.uid ? 'my-message' : 'message'}`}>
            <div className={`chat-bubble ${message.uid === user.uid ? "" : "bg-grey"} `}>
                <div className="avatar-area">
                    <img className="user-avatar" src={message.avatar ? message.avatar : Profile} alt="user-avatar" />
                    <span>{message.name ? message.name : 'Usuário Desconhecido'}</span>
                </div>
                <div className="user-message-area">
                    <span>{message.message}</span>
                </div>
                <div className="user-message-date">
                    <span>{message.createdAt ? TimestampToString(message.createdAt) : ''}</span>
                </div>
            </div>
        </div>
    );
}