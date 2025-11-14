"use client";

import SearchBar from "./Components/SearchBar";
import "./globals.css";
import { useState, useEffect } from "react";
import { Task } from "./Components/Types/Task";
import TaskGrid from "./ui/TaskGrid";
import HeaderButtons from "./ui/HeaderButtons";
import NoteModal from "./ui/NoteModal";
import {
  getAllTasks,
  addTask,
  deleteAllTasks,
  deleteTask,
  loadWelcomeNote,
  loadTestNotes,
  toggleTask,
  updateTask,
} from "./services/tasksService";
import sortTasks from "./services/helpers";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);

  // Inicializacion
  useEffect(() => {
    async function init() {
      try {
        const data = await getAllTasks();

        if (data.length === 0) {
          const welcome = await loadWelcomeNote();
          setTasks([welcome]);
        } else {
          setTasks(sortTasks(data));
        }
      } catch {
        setTasks([
          {
            id: 0,
            content: "No se pudo conectar con el servidor.",
            deadline: null,
            isCompleted: false,
          },
        ]);
      }
    }

    init();
  }, []);

  // Cargar notas de prueba
  async function handleLoadTestNotes() {
    const testNotes = await loadTestNotes();
    setTasks(sortTasks(testNotes));
  }

  // Agregar nueva nota
  async function handleAddNote(content: string, deadline: Date | null) {
    const newTask = { content, deadline, isCompleted: false };
    const savedTask = await addTask(newTask);
    setTasks((prev) => sortTasks([...prev, savedTask]));
  }

  // Eliminar una nota
  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // Eliminar todas las notas
  async function handleDeleteNotes() {
    await deleteAllTasks();
    const welcome = await loadWelcomeNote();
    setTasks([welcome]);
  }

  // Marcar / desmarcar como completada
  async function handleToggleDone(id: number) {
    const updatedTask = await toggleTask(id);
    setTasks((prev) =>
      sortTasks(prev.map((t) => (t.id === id ? updatedTask : t)))
    );
  }

  // Editar nota
  async function handleModify(content: string, deadline: Date | null) {
    if (!taskBeingEdited) return;

    const updatedTask = {
      ...taskBeingEdited,
      content,
      deadline,
    };

    const saved = await updateTask(updatedTask);
    setTasks((prev) =>
      sortTasks(prev.map((t) => (t.id === updatedTask.id ? saved : t)))
    );

    setTaskBeingEdited(null);
    setIsEditing(false);
    setShowNoteModal(false);
  }

  // Filtrado
  const filteredTasks = tasks.filter((task) =>
    task.content.toLowerCase().includes(searchInput.toLowerCase())
  );

  function openAddModal() {
    setTaskBeingEdited(null);
    setIsEditing(false);
    setShowNoteModal(true);
  }

  function openEditModal(task: Task) {
    setTaskBeingEdited(task);
    setIsEditing(true);
    setShowNoteModal(true);
  }
  return (
    <main className="flex flex-col h-screen w-screen items-center pt-4 px-8 bg-gray-200 m-0">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

      <HeaderButtons
        onShowNoteModal={openAddModal}
        onDeleteNotes={handleDeleteNotes}
        onLoadTestNotes={handleLoadTestNotes}
      />

      <TaskGrid
        tasks={filteredTasks}
        onDelete={handleDelete}
        onModify={openEditModal}
        onDone={handleToggleDone}
      />

      {showNoteModal && (
        <NoteModal
          task={taskBeingEdited || undefined}
          onAdd={isEditing ? handleModify : handleAddNote}
          isEditing={isEditing}
          onShowNoteModal={setShowNoteModal}
        />
      )}
    </main>
  );
}
