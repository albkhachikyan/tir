export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Pupil {
  id: number;
  name: string;
  grade: number;
}

export interface Subject {
  id: number;
  name: string;
  grade: number;
  teacherId: number;
}
