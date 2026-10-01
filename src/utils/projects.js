import { COVERS, JOBS, PROJECTS } from "../data/content";

export const jobName = (id) => (id === "academic" ? "Academic Project" : (JOBS.find((j) => j.id === id) || {}).company);

export const projectCover = (project) => COVERS[PROJECTS.indexOf(project) % COVERS.length];
