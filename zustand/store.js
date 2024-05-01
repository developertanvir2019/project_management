import create from "zustand";

const useStore = create((set) => ({
  tasks: [],

  // Function to update task status
  updateTaskStatus: (taskIndex, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task, index) =>
        index === taskIndex ? { ...task, status: newStatus } : task
      ),
    })),

  // Add more state and actions as needed
}));

export default useStore;
