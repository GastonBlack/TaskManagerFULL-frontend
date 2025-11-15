import { error } from "console";
import { Task } from "../Components/Types/Task";

const API_URL = "https://taskmanagerfull-backend.onrender.com/api/Tasks";

export async function getAllTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Could not load tasks.");
    const data = await response.json();
    // HydrateTask convierte todas las fechas de las tasks para que sean compatibles.
    return data.map(hydrateTask);
}

export async function addTask(task: any) {
    // Convertir fecha antes de enviar.
    const preparedTask = {
        ...task,
        deadline: task.deadline ? task.deadline.toISOString() : null,
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedTask),
    });

    if (!response.ok) throw new Error("There was an error while adding the task.");
    const saved = await response.json();
    // Convertir la fecha que vuelve de la API
    return hydrateTask(saved);
}

export async function updateTask(task: any) {
    const preparedTask = {
        ...task,
        deadline: task.deadline ? task.deadline.toISOString() : null,
    };

    const response = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedTask),
    });

    if (!response.ok) throw new Error("Could not update task.");
    const updated = await response.json();
    return hydrateTask(updated);
}

export async function deleteTask(id: number) {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not delete the task.");
}

export async function deleteAllTasks() {
    const response = await fetch(`${API_URL}/all`, { method: "DELETE" });
    if (!response.ok) throw new Error("Could not delete all the tasks.")
}

export async function loadWelcomeNote() {
    const response = await fetch(`${API_URL}/welcome`, { method: "POST" });
    if (!response.ok) throw new Error("Could not load welcome note.");

    const note = await response.json();
    return hydrateTask(note);
}

export async function loadTestNotes() {
    const response = await fetch(`${API_URL}/test`, { method: "POST" });
    if (!response.ok) throw new Error("Could not load test notes.");

    const data = await response.json();
    return data.map(hydrateTask);
}

export async function toggleTask(id: number) {
    const response = await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
    if (!response.ok) throw new Error("Could not toggle task.");
    const updated = await response.json();
    return hydrateTask(updated);
}


// HELPERS
function hydrateTask(raw: any): Task {
    return {
        ...raw,
        deadline: raw.deadline ? new Date(raw.deadline) : null,
    };
}