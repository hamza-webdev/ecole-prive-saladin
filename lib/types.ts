
import { User, Student, Class, StudentClass, UserRole, Gender } from '@prisma/client';

// Types étendus pour les relations
export interface UserWithClasses extends User {
  classes: Class[];
}

export interface StudentWithClasses extends Student {
  studentClasses: (StudentClass & {
    class: Class;
  })[];
}

export interface ClassWithStudents extends Class {
  studentClasses: (StudentClass & {
    student: Student;
  })[];
  teacher?: User | null;
}

// Types pour les formulaires
export interface CreateStudentData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  placeOfBirth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalInfo?: string;
}

export interface CreateClassData {
  name: string;
  level: string;
  section?: string;
  schoolYear: string;
  maxStudents: number;
  teacherId?: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Types pour les filtres
export interface StudentFilter {
  search?: string;
  classId?: string;
  level?: string;
  isActive?: boolean;
}

export interface ClassFilter {
  search?: string;
  level?: string;
  schoolYear?: string;
  teacherId?: string;
}

// Extension des types de session NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      role: UserRole;
    };
  }

  interface User {
    firstName: string;
    lastName: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    firstName: string;
    lastName: string;
  }
}
