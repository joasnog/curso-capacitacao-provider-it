import { useState, useEffect } from "react";

import { db } from '../../firebase/firebaseConnection';
import { collection, getDocs } from 'firebase/firestore';

import './chatRooms.css';
import { Card } from 'primereact/card';

import { Link } from "react-router-dom";

export default function ChatRooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getRooms() {
            const roomsRef = collection(db, 'chat-rooms');
            let list = [];
            await getDocs(roomsRef)
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        list.push({
                            'id': doc.id,
                            'title': doc.data().title,
                        });
                    });
                }).catch((error) => {
                    alert('Ocorreu um erro ao carregar as salas. Tente novamente mais tarde');
                    console.log(error);
                });
            setRooms(list);
        }

        getRooms();
    }, []);

    return (
        <div className="chat-rooms-container">
            <h1>Salas!</h1>
            <ol>
                {rooms.map((room) => {
                    return (
                        <Link key={room.id} to={`/room/${room.id}`}>
                            <Card title={room.title} ></Card>
                        </Link>
                    );
                })}
            </ol>
        </div>
    );
}