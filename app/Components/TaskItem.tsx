import React from "react";
import { Task } from "./Types/Task";

type TaskItemProps = {
    task: Task;
    onDelete: () => void;
    onModify: () => void;
    onDone: () => void;
}

export function TaskItem({ task, onDelete, onModify, onDone }: TaskItemProps) {
    return (
        <div className={`
            w-64 min-h-40 max-h-60 bg-gray-100 rounded-xl p-4 shadow-lg flex flex-col justify-between text-black gap-3
            ${task.isCompleted ? "opacity-40" : ""}
        `}>
            {task.deadline && (
                <p className={`text-xs text-gray-500 ${task.isCompleted ? "line-through text-gray-400" : ""}`}
                >
                    Vence: {task.deadline?.toLocaleDateString()}
                </p>
            )}

            <p className="
                font-medium w-full m-0
                break-words whitespace-pre-wrap
                text-center overflow-y-auto
            ">{task.content}</p>

            <section className="
                flex justify-center items-center gap-8 h-8
            ">
                <button
                    className="flex w-8  justify-center items-center p-1 cursor-pointer rounded-3xl"
                    onClick={onModify}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path fill="orange" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                    </svg>
                </button>

                <button
                    className="flex w-12 justify-center items-center p-1 cursor-pointer rounded-3xl"
                    onClick={onDone}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                    >

                        {/* Circulo de borde */}
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke={task.isCompleted ? "black" : "black"}
                            strokeWidth="2"
                        />
                        {/* Circulo de fondo */}
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill={task.isCompleted ? "black" : "white"}   // fondo circular
                        />

                        {/* Tilde */}
                        <path
                            d="M16.0304 9.13633C16.3232 9.42923 16.3232 9.9041 16.0304 10.197L11.3637 14.8637C11.0708 15.1566 10.5959 15.1566 10.303 14.8637L7.96969 12.5303C7.6768 12.2374 7.6768 11.7626 7.96969 11.4697C8.26259 11.1768 8.73746 11.1768 9.03035 11.4697L10.8334 13.2727L14.9697 9.13633C15.2626 8.84344 15.7375 8.84344 16.0304 9.13633Z"
                            fill={task.isCompleted ? "white" : "black"}   // tilde
                        />
                    </svg>
                </button>

                <button
                    className="flex w-8 h-8 justify-center items-center p-1 cursor-pointer rounded-3xl"
                    onClick={onDelete}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 512 512">
                        <path fill="red" d="M44.519,94.026H467.48c8.284,0,15-6.716,15-15s-6.716-15-15-15h-117.144v-9.41c0-21.293-17.323-38.616-38.616-38.616h-111.441c-21.293,0-38.616,17.323-38.616,38.616v9.41H44.519c-8.284,0-15,6.716-15,15s6.716,15,15,15ZM191.663,54.616c0-4.751,3.865-8.616,8.616-8.616h111.441c4.751,0,8.616,3.865,8.616,8.616v9.41H191.663v-9.41Zm275.821,62.771H44.516c-8.284,0-15,6.716-15,15s6.716,15,15,15h13.297l40.164,314.882c2.452,19.229,18.92,33.73,38.306,33.73h239.434c19.386,0,35.854-14.501,38.306-33.73l40.164-314.882h13.298c8.284,0,15-6.716,15-15s-6.716-15-15-15Zm-83.221,341.087c-.556,4.36-4.15,7.525-8.547,7.525H136.283c-4.396,0-7.991-3.165-8.547-7.526L88.056,147.388H423.943l-39.68,311.087Zm-72.781-54.279l16.008-197.428c.671-8.257,7.92-14.407,16.163-13.738,8.258,.669,14.408,7.906,13.739,16.163l-16.008,197.428c-.637,7.844-7.2,13.789-14.935,13.789-.407,0-.816-.017-1.229-.05-8.258-.669-14.408-7.906-13.739-16.163ZM154.607,209.192c-.669-8.257,5.481-15.494,13.739-16.163,8.263-.681,15.492,5.481,16.163,13.738l16.008,197.428c.669,8.257-5.481,15.494-13.739,16.163-.412,.034-.822,.05-1.229,.05-7.734,0-14.298-5.944-14.935-13.789l-16.008-197.428Zm86.393,196.216V207.979c0-8.284,6.716-15,15-15s15,6.716,15,15v197.428c0,8.284-6.716,15-15,15s-15-6.716-15-15Z"></path>
                    </svg>
                </button>
            </section>

        </div>
    );
}