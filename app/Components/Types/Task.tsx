export interface Task {
    id: number;
    content: string;
    deadline?: Date | null;
    isCompleted: boolean;
}