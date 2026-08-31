export type Department =
  | "Visualisation"
  | "Creative"
  | "Technology"
  | "People & Operations"
  | "Growth";

export interface Position {
  id: string;
  title: string;
  department: Department;
}

export const positions: Position[] = [
  { id: "3d-visualiser", title: "3D Visualiser", department: "Visualisation" },
  { id: "3d-modelling-artist", title: "3D Modelling Artist", department: "Visualisation" },
  { id: "interior-visualiser", title: "Interior Visualiser", department: "Visualisation" },
  { id: "post-production-artist", title: "Post-Production Artist", department: "Creative" },
  { id: "ui-ux-designer", title: "UI/UX Designer", department: "Creative" },
  { id: "branding-visual-communication", title: "Branding & Visual Communication", department: "Creative" },
  { id: "visual-film-communication", title: "Visual & Film Communication", department: "Creative" },
  { id: "full-stack-developer", title: "Full-Stack Developer", department: "Technology" },
  { id: "hr-generalist", title: "HR Generalist", department: "People & Operations" },
  { id: "hr-intern", title: "HR Intern", department: "People & Operations" },
  { id: "project-coordinator", title: "Project Coordinator", department: "People & Operations" },
  { id: "sales", title: "Sales", department: "Growth" },
  { id: "business-development", title: "Business Development", department: "Growth" },
  { id: "growth-strategy", title: "Growth & Strategy", department: "Growth" },
  { id: "marketing", title: "Marketing", department: "Growth" },
  { id: "digital-marketing", title: "Digital Marketing", department: "Growth" },
];

export const departmentGroups = [
  "Visualisation",
  "Creative",
  "Technology",
  "People & Operations",
  "Growth",
] as const;
