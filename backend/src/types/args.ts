export interface IdArgs {
  id: number;
}

export interface AddTeacherArgs {
  name: string;
}

export interface UpdateTeacherArgs extends IdArgs {
  name: string;
}

export interface AddPupilArgs {
  name: string;
  grade: number;
}

export interface UpdatePupilArgs extends IdArgs {
  name: string;
  grade: number;
}

export interface AddSubjectArgs {
  name: string;
  grade: number;
  teacherId: number;
}

export interface UpdateSubjectArgs extends IdArgs {
  name?: string;
  grade?: number;
  teacherId?: number;
}

export interface AssignSubjectToPupilArgs {
  pupilId: number;
  subjectId: number;
}
