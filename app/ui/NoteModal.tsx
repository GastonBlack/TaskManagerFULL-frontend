import React from "react";
import { useState, useEffect } from "react";
import { Task } from "../Components/Types/Task";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type NoteModalProps = {
    task?: Task;
    onAdd: (content: string, deadline: Date | null) => void;
    isEditing: boolean;
    onShowNoteModal: (value: boolean) => void;
}

export default function NoteModal({ task, onAdd, isEditing, onShowNoteModal }: NoteModalProps) {
    const [content, setContent] = useState<string>(task?.content ?? "");
    const [deadline, setDeadline] = useState<Date | null>(task?.deadline ?? null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
            onClick={() => onShowNoteModal(false)}
        >
            <div className="bg-white rounded-2xl shadow-lg px-4 py-2 w-[60%] max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <section className="flex justify-end items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex justify-center items-center cursor-pointer" viewBox="0 0 92 92"
                        onClick={() => onShowNoteModal(false)}
                    >
                        <path fill="black" d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z"></path>
                    </svg>
                </section>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="
                        noteModal-textarea text-black mt-5
                    "
                    placeholder="Write your note..."
                />

                {/* Sección de deadline */}
                <section className="flex flex-col items-center mt-4">
                    <p className="text-gray-500 text-xs mb-2">(Opcional)</p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowCalendar(!showCalendar)}
                            className="bg-black text-white py-2 px-[16px] rounded-md hover:scale-105 transition  cursor-pointer"
                        >
                            {deadline
                                ? deadline.toLocaleDateString("en", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })
                                : "Deadline"}
                        </button>

                        {deadline && (
                            <button
                                onClick={() => setDeadline(null)}
                                className="text-sm text-gray-500 hover:text-red-500 smooth-transition  cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex justify-center items-center cursor-pointer" viewBox="0 0 92 92"
                                >
                                    <path fill="red" d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z"></path>
                                </svg>
                            </button>
                        )}
                    </div>

                    {showCalendar && (
                        <div className="mt-3 rounded-lg p-2">
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => {
                                    setDeadline(date);
                                    setShowCalendar(false);
                                }}
                                inline
                            />
                        </div>
                    )}
                </section>

                <section className="
                    w-full flex justify-center items-center
                ">
                    <button
                        onClick={() => {
                            onAdd(content, deadline)
                            onShowNoteModal(false)
                        }}
                        className="
                                bg-green-400 text-white py-2 px-[24px] rounded-md cursor-pointer mt-10
                                hover:scale-105 hover:bg-green-500 transition
                            "
                    >
                        {isEditing ? "Edit note" : "Add note"}
                    </button>
                </section>
            </div>
        </div>
    );
}