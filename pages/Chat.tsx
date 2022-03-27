import React from 'react'
import { addDoc, orderBy,query, deleteDoc, collection, doc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebase"
import { useState } from "react"
import { TrashIcon } from '@heroicons/react/outline'
import {  DatabaseReference } from "firebase/database";
import { useCollection } from 'react-firebase-hooks/firestore';
import Link from "next/link"
import { User } from "../typings"

export interface Users {
    users: [User];
}
export interface Query2 {
    readonly ref: DatabaseReference;
    isEqual(other: Query | null): boolean;
    toJSON(): string;
}
export declare interface Query{
    readonly ref: DatabaseReference;
    isEqual(other: Query | null): boolean;
    toJSON(): string;
    reference: string;
     name: string; 
     timestamp: Timestamp;
    id: string, 
    path :string, 
    parent:string,
    withConverter:string, 
} 

function Chat() {


    const [newUser, setNewUser] = useState<string>("");
    const usersRef = collection(db, "users");

    const [newComment, setNewComment] = useState<string>("");
    const [thisUser, setThisUser] = useState<string>("");

    const commentsRef = collection(db, "comments")  ;

    const q = query(commentsRef, orderBy("timestamp"));
    const [messages, loading, error] = useCollection(q, { snapshotListenOptions: { includeMetadataChanges: true }, });

    const q2 = query(collection(db, "users"));
    const [users2, loading2, error2] = useCollection(q2, { snapshotListenOptions: { includeMetadataChanges: true } }
    );






    const createUser = async () => {
        await addDoc(usersRef, { name: newUser });
        setNewUser("")
    }
    const onSubmit = async (e: any) => {
        //console.log(newComment)
        e.preventDefault();
        console.log(newComment.slice(0, 5))
        if (newComment.slice(0, 5) === "https") {
            await addDoc(commentsRef, { reference: newComment, name: thisUser, timestamp: serverTimestamp() })
        } else {
            await addDoc(commentsRef, { comment: newComment, name: thisUser, timestamp: serverTimestamp() })
        }
        setNewComment("")
    }
    const deleteComment = async (id: string) => {
        //console.log(comment)
        const commentDoc = doc(db, "comments", id);
        await deleteDoc(commentDoc)
    }
    //const commentsRef= collection(db,"comments")
    return (
        <div>
            <div className="text-center items-center mt-2">
                <input onChange={(e) => setNewUser(e.target.value)} className="App ring-yellow-600 ring outline-none mr-3 rounded-xl p-2 " value={newUser} placeholder="Type the name" />
                <button className="bg-gray-200 rounded-full w-2/12 p-3 cursor-pointer hover:bg-gray-300" onClick={() => createUser()}>Add User</button>
            </div>
            <div className="flex-grow">
                <div className="">
                    { users2?.docs.map((user) => {
                        return (
                            <div key={user.id}  className=" inline-block mt-10 mb-10 bg-lime-300 rounded-xl w-5/12 ml-5 ">
                                <form  className="mt-5">
                                    <div className="text-gray-700 font-bold text-xl text-center">User : {user.data().name}</div>
                                    {messages?.docs.map(comment => {
                                        return (
                                            <div key={comment.id}>
                                                {user.data().name == comment.data().name ? (
                                                    <div key={comment.id} className=' grid text-left   justify-items-end     bg-lime-200 rounded-xl w-10/12 ml-10 mt-3'>
                                                        {comment.data().reference &&
                                                            <Link href={comment.data().reference}>{comment.data().reference}</Link>
                                                        }
                                                        <div className="  mr-4 text-2xl ">{comment.data().comment}</div>
                                                        <TrashIcon onClick={(e) => deleteComment(comment.id)} className="flex  h-4 text-gray-500 " />
                                                    </div>
                                                )
                                                    : (
                                                        <div key={comment.id} className='flex   bg-white rounded-xl w-10/12 ml-10 mt-3'>
                                                            <div className=" ml-4 flex text-xl text-blue-500">{comment.data().name} :</div>
                                                            <div className="ml-4 flex text-black text-2xl">{comment.data().comment}</div>
                                                            {comment.data().reference &&
                                                                <Link href={comment.data().reference} >{comment.data().reference}</Link>
                                                            }
                                                            <TrashIcon onClick={(e) => deleteComment(comment.id)} className="flex h-4 text-gray-500  " />
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    })}
                                    <div className='flex flex-grow mr-4 '>
                                    <input
                                        onChange={(e) => { setThisUser(user.data().name), setNewComment(e.target.value) }}
                                        type="text"
                                        className="flex ml-10 mt-5 mb-2 shadow border py-2 px-3 form-input   w-9/12  rounded-l-lg outline-none " placeholder="type your message here and hit Enter"
                                        value={newComment}
                                    />
                                    <button type="submit" className="flex  w-2/12 mr-4 mt-5 mb-2 shadow border py-2 px-3   bg-gray-300 rounded-r-lg hover:bg-gray-200" onClick={onSubmit} >Send</button>
                                    </div>
                                </form>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default Chat
