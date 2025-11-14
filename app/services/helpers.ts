import { Task } from "../Components/Types/Task";

// ORDENAR TASKS POR isCompleted.
export default function sortTasks(tasks: Task[]) {
  return [...tasks].sort((a, b) => {

    // Pendientes antes que completadas
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }

    // Si ambas estan pendienteas (o ambas completadas):
    // las que tienen fecha van antes que las que no
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;

    // Si ambas tienen fecha, ordenar por fecha mas proxima
    if (a.deadline && b.deadline) {
      const timeA = new Date(a.deadline).getTime();
      const timeB = new Date(b.deadline).getTime();
      return timeA - timeB;
    }

    // Si ninguna tiene fecha -> mantiene el orden actual
    return 0;
  });
}