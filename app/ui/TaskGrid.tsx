import { Task } from "../Components/Types/Task"
import { TaskItem } from "../Components/TaskItem"

type TaskGridProps = {
    tasks: Task[];
    onDelete: (id: number) => void;
    onModify: (task: Task) => void;
    onDone: (id: number) => void;
}

export default function TaskGrid({ tasks, onDelete, onModify, onDone }: TaskGridProps) {
    return (
        <section className="w-screen h-screen notes-grid">
            {tasks.map((task) => (
                <TaskItem
                    key={`${task.id}`}
                    task={task}
                    onDelete={() => onDelete(task.id)}
                    onModify={() => onModify(task)}
                    onDone={() => onDone(task.id)}
                />
            ))}
        </section>
    );
}