/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// Components primereact
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { db, auth } from '../../firebase/firebaseConnection';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

import './room.css';
import Message from "../../components/Message";

export default function Room() {
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    // useRef para controlar o scroll
    // useRef pode ser usado para armazenar um valor que n causa uma nova renderização (no-state)
    const scroll = useRef(null);

    useEffect(() => {
        const q = query(collection(db, 'chat-rooms', id, "messages"), orderBy("createdAt"), limit(10));

        const unsub = onSnapshot(q, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages);
        });

        scroll.current.scrollIntoView({ behavior: "smooth" });

        return () => unsub;
    }, [])

    async function sendMessage() {
        if (inputValue.trim() === "") {
            return;
        }

        const { uid, displayName, photoURL } = auth.currentUser;

        await addDoc(collection(db, 'chat-rooms', id, "messages"), {
            message: inputValue,
            name: displayName,
            avatar: photoURL,
            createdAt: serverTimestamp(),
            uid: uid,
        });

        scroll.current.scrollIntoView({ behavior: "smooth" });
        setInputValue("");
    }

    return (
        <div className='chat-container'>
            {
                messages.map((message) => {
                    return (
                        <div key={message.id}>
                            <Message message={message} />
                        </div>
                    );
                })
            }

            <span ref={scroll}></span>

            <div className='input-area'>
                <InputText className='input' placeholder='Digite a sua mensagem' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button className='btn' rounded icon="pi pi-send" onClick={sendMessage} />
            </div>
        </div>
    );
}