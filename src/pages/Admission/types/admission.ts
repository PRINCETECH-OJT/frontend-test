export interface ApplicationData {
  // Step 1: Application Details
  campus: string;
  academicYear: string;
  applicationType: string;
  department: string;
  gradeLevel: string;
  firstChoiceProgram: string;
  firstChoiceMajor: string;
  secondChoiceProgram: string;
  secondChoiceMajor: string;
  thirdChoiceProgram: string;
  thirdChoiceMajor: string;

  // Step 2: Personal Information
  surname: string;
  givenName: string;
  middleName: string;
  middleInitial: string;
  nameExtension: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  civilStatus: string;
  internetConnectivity: string;
  learningModality: string;
  digitalLiteracy: string;
  deviceUsed: string;

  // Address
  houseStreet: string;
  province: string;
  city: string;
  barangay: string;

  // Other Personal
  nationality: string;
  religion: string;
  ethnicAffiliation: string;
  telephoneNumber: string;
  mobileNumber: string;
  email: string;

  // Additional
  isSoloParent: boolean;
  isChildOfSoloParent: boolean;
  isPhilhealthMember: boolean;
  vaccinationStatus: string;
  isIndigenous: boolean;
  indigenousGroup: string;

  // Skills
  sports: string;
  arts: string;
  technical: string;

  // Step 3: Educational Background
  isLetPasser: string;
  lrn: string;
  isSped: boolean;
  isPwd: boolean;
  schoolHistory: SchoolHistory[];
  bachelorsDegree: string;
  bachelorsSchool: string;
  mastersDegree: string;
  mastersSchool: string;

  // Photo
  photoUrl: string;

  // Step 4: Family Information
  fatherName: string;
  fatherBirthday: string;
  fatherOccupation: string;
  fatherMonthlyIncome: string;
  fatherYearlyIncome: string;
  fatherContact: string;

  motherName: string;
  motherBirthday: string;
  motherOccupation: string;
  motherMonthlyIncome: string;
  motherYearlyIncome: string;
  motherContact: string;

  guardianName: string;
  guardianAddress: string;
  guardianProvince: string;
  guardianCity: string;
  guardianTelephone: string;
  guardianMobile: string;
  guardianEmail: string;

  siblings: Sibling[];

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactAddress: string;
  emergencyContactTelephone: string;
  emergencyContactMobile: string;
  emergencyContactEmail: string;

  // Step 5: Other Information
  howDidYouKnow: string;
  reasonForApplying: string;
  siteCoordinator: string;

  // For Transferee
  reasonForLeaving: string;
  hasBeenRepeater: boolean;
  repeaterGrade: string;
  hasDropped: boolean;
  droppedGrade: string;

  // Alumni Connection
  hasAlumniConnection: boolean;
  alumniName: string;
  alumniContact: string;

  // Documents
  documents: Document[];

  // Confirmation
  hasAgreedToTerms: boolean;
}

export interface SchoolHistory {
  id: string;
  schoolName: string;
  address: string;
  programStrand: string;
  yearOfGraduation: string;
  gwa: string;
  award: string;
  lastGradeLevel: string;
  isPrivate: boolean;
  isForeign: boolean;
}

export interface Sibling {
  id: string;
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  gradeLevel: string;
  schoolAttended: string;
}

export interface Document {
  id: string;
  name: string;
  required: boolean;
  file: File | null;
  fileName: string;
  remarks: string;
}

export interface SchoolHistory {
  id: string;
  schoolName: string;
  address: string;
  programStrand: string;
  yearOfGraduation: string;
  gwa: string;
  award: string;
  lastGradeLevel: string;
  isPrivate: boolean;
  isForeign: boolean;
}

export const CIVIL_STATUS = ["Single", "Married", "Separated", "Widow/er"];
export const SPORTS = [
  "None",
  "Basketball",
  "Volleyball",
  "Badminton",
  "Swimming",
  "Soccer",
  "Chess",
  "Table Tennis",
  "Others",
];
export const ARTS = [
  "None",
  "Dance",
  "Visual",
  "Vocal Music",
  "Instrumental Music",
  "Theatre",
  "Others",
];
export const TECHNICAL = [
  "None",
  "Computer Programming",
  "Web Development",
  "Graphic Design",
  "Electronics",
  "Automotive",
  "Others",
];

export const CAMPUSES = [
  "USTP-CDO",
  "USTP ALUBIJID",
  "USTP VILLANUEVA",
  "USTP CLAVERIA",
  "USTP BALUBAL",
  "USTP JASAAN",
  "USTP OROQUIETA",
  "USTP PANAON",
];

export const ACADEMIC_YEARS = [
  "2026-2027 - 1st Semester",
  "2025-2026 - 2nd Semester",
];

export const APPLICATION_TYPES = [
  "Please select Application type",
  "Freshman",
  "Transferee",
  "Second Courser",
  "Cross-Enrollee",
  "Returnee",
  "Earning Units",
  "Freshmen (Night Class)",
  "Transferee (Night Class)",
];

export const DEPARTMENTS = [
  "Please select department",
  "Senior High School",
  "Technical / Vocational",
  "College",
  "Post-Baccalaureate",
  "Masters",
  "PhD or Equivalent",
];

export const GRADE_LEVELS = [
  "Select Grade Level",
  "Grade 11",
  "Grade 12",
  "1st Year - Baccalaureate",
  "2nd Year - Baccalaureate",
  "3rd Year - Baccalaureate",
  "4th Year - Baccalaureate",
  "5th Year - Baccalaureate",
  "1st Year - Masters",
  "2nd Year - Masters",
  "1st Year - PhD",
  "2nd Year - PhD",
];

export const PROGRAMS = [
  "Select Program",
  "Bachelor of Science in Information Technology",
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Civil Engineering",
  "Bachelor of Science in Electrical Engineering",
  "Bachelor of Science in Mechanical Engineering",
  "Bachelor of Science in Electronics Engineering",
  "Bachelor of Science in Architecture",
  "Bachelor of Science in Accountancy",
  "Bachelor of Science in Business Administration",
  "Bachelor of Science in Education",
  "Bachelor of Science in Nursing",
  "Bachelor of Science in Agriculture",
  "Bachelor of Arts in Communication",
  "Bachelor of Arts in Political Science",
];

export const MAJORS = [
  "None",
  "Major in Web Development",
  "Major in Data Science",
  "Major in Network Administration",
  "Major in Software Engineering",
  "Major in Artificial Intelligence",
  "Major in Cybersecurity",
];

export const NATIONALITIES = [
  "Please Select",
  "Filipino",
  "American",
  "Australian",
  "British",
  "Canadian",
  "Chinese",
  "Indian",
  "Indonesian",
  "Japanese",
  "Korean",
  "Malaysian",
  "Singaporean",
  "Thai",
  "Vietnamese",
  "Other",
];

export const RELIGIONS = [
  "Select",
  "Roman Catholic",
  "Iglesia ni Cristo",
  "Islam",
  "Protestant",
  "Buddhism",
  "Born Again",
  "Baptist",
  "Methodist",
  "Seventh Day Adventist",
  "Jehovah's Witness",
  "Other",
  "No Religion",
];

export const PROVINCES = [
  "Select",
  "Agusan del Norte",
  "Agusan del Sur",
  "Bukidnon",
  "Camiguin",
  "Davao de Oro",
  "Davao del Norte",
  "Davao del Sur",
  "Davao Occidental",
  "Davao Oriental",
  "Lanao del Norte",
  "Misamis Occidental",
  "Misamis Oriental",
  "Surigao del Norte",
  "Surigao del Sur",
  "Zamboanga del Norte",
  "Zamboanga del Sur",
  "Zamboanga Sibugay",
  "Other",
];

export const YEARLY_INCOMES = [
  "Select",
  "Php 0-250,000",
  "Php 250,001-500,000",
  "Php 500,001-750,000",
  "Php 750,001-1,000,000",
  "Php 1,000,001 above",
];

export const VACCINATION_STATUS = [
  "Please select",
  "First Dose",
  "Second Dose",
  "With 1st Booster",
  "With 2nd Booster",
  "Unvaccinated",
];

export const REQUIRED_DOCUMENTS = [
  { name: "Form 137 / Transcript of Records", required: true },
  { name: "PSA Birth Certificate", required: true },
  { name: "Certificate of Good Moral Character", required: true },
  { name: "2x2 ID Picture (White Background)", required: true },
  { name: "Grade 12 Report Card / Form 138", required: false },
  { name: "Certificate of Transfer / Honorable Dismissal", required: false },
];

export const initialApplicationData: ApplicationData = {
  campus: "",
  academicYear: "2026-2027 - 1st Semester",
  applicationType: "",
  department: "",
  gradeLevel: "",
  firstChoiceProgram: "",
  firstChoiceMajor: "",
  secondChoiceProgram: "",
  secondChoiceMajor: "",
  thirdChoiceProgram: "",
  thirdChoiceMajor: "",
  surname: "",
  givenName: "",
  middleName: "",
  middleInitial: "",
  nameExtension: "",
  dateOfBirth: "",
  placeOfBirth: "",
  gender: "",
  civilStatus: "",
  internetConnectivity: "",
  learningModality: "",
  digitalLiteracy: "",
  deviceUsed: "",
  houseStreet: "",
  province: "",
  city: "",
  barangay: "",
  nationality: "",
  religion: "",
  ethnicAffiliation: "",
  telephoneNumber: "",
  mobileNumber: "",
  email: "",
  isSoloParent: false,
  isChildOfSoloParent: false,
  isPhilhealthMember: false,
  vaccinationStatus: "",
  isIndigenous: false,
  indigenousGroup: "",
  sports: "",
  arts: "",
  technical: "",
  isLetPasser: "",
  lrn: "",
  isSped: false,
  isPwd: false,
  schoolHistory: [],
  bachelorsDegree: "",
  bachelorsSchool: "",
  mastersDegree: "",
  mastersSchool: "",
  photoUrl: "",
  fatherName: "",
  fatherBirthday: "",
  fatherOccupation: "",
  fatherMonthlyIncome: "",
  fatherYearlyIncome: "",
  fatherContact: "",
  motherName: "",
  motherBirthday: "",
  motherOccupation: "",
  motherMonthlyIncome: "",
  motherYearlyIncome: "",
  motherContact: "",
  guardianName: "",
  guardianAddress: "",
  guardianProvince: "",
  guardianCity: "",
  guardianTelephone: "",
  guardianMobile: "",
  guardianEmail: "",
  siblings: [],
  emergencyContactName: "",
  emergencyContactRelation: "",
  emergencyContactAddress: "",
  emergencyContactTelephone: "",
  emergencyContactMobile: "",
  emergencyContactEmail: "",
  howDidYouKnow: "",
  reasonForApplying: "",
  siteCoordinator: "",
  reasonForLeaving: "",
  hasBeenRepeater: false,
  repeaterGrade: "",
  hasDropped: false,
  droppedGrade: "",
  hasAlumniConnection: false,
  alumniName: "",
  alumniContact: "",
  documents: [],
  hasAgreedToTerms: false,
};
