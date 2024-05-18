import { create } from "zustand";

const useStore = create((set) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),

  editProject: (editedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === editedProject.id ? editedProject : project
      ),
    })),
}));

export default useStore;
