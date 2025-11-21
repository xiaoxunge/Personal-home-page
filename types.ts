export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}

export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT'
}