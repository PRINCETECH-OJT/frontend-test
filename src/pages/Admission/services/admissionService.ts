import api from "../../../api";
import type { ApplicationData } from "../types/admission";

const splitName = (fullName: string) => {
  if (!fullName) return { first: "", last: "" };
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return { first: parts[0], last: "." };
  const last = parts.pop() || "";
  const first = parts.join(" ");
  return { first, last };
};

const parseNumber = (value: string | undefined | null) => {
  if (!value) return 0;
  return parseInt(String(value).replace(/,/g, ""), 10) || 0;
};

const generateStudentId = () => {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);

  return parseInt(`${year}${timestamp}${random}`);
};

const CURRICULUM_MAP: Record<string, number> = {
  "BS Information Technology": 1,
  "BS Computer Science": 2,
  "BS Civil Engineering": 3,
};

export const submitAdmission = async (data: ApplicationData) => {
  const token = localStorage.getItem("token");
  await api.get("/sanctum/csrf-cookie");

  const myStudentId = generateStudentId();

  const parents = [];
  if (data.fatherName) {
    const { first, last } = splitName(data.fatherName);
    parents.push({
      role: "father",
      first_name: first,
      last_name: last,
      middle_name: "",
      date_of_birth: data.fatherBirthday || null,
      occupation: data.fatherOccupation || "N/A",
      monthly_income: parseNumber(data.fatherMonthlyIncome),
      yearly_compensation: data.fatherYearlyIncome || "N/A",
      phone_number: data.fatherContact || "N/A",
    });
  }
  if (data.motherName) {
    const { first, last } = splitName(data.motherName);
    parents.push({
      role: "mother",
      first_name: first,
      last_name: last,
      middle_name: "",
      date_of_birth: data.motherBirthday || null,
      occupation: data.motherOccupation || "N/A",
      monthly_income: parseNumber(data.motherMonthlyIncome),
      yearly_compensation: data.motherYearlyIncome || "N/A",
      phone_number: data.motherContact || "N/A",
    });
  }

  const education = data.schoolHistory.map((school) => ({
    level: "junior_high",
    is_private: school.isPrivate,
    school_name: school.schoolName,
    school_address: school.address,
    program: school.programStrand || null,
    major: null,
    year_started: 2000,
    year_ended: parseInt(school.yearOfGraduation) || 2024,
    gwa: school.gwa,
    awards: school.award || "None",
    last_grade: school.lastGradeLevel || "",
    status: "completed",
  }));

  const payload = {
    program: {
      curriculum_id: CURRICULUM_MAP[data.firstChoiceProgram] || 1,

      student_id: 1,
      enrolled_at: new Date().toISOString().split("T")[0],
      status: "pending",
    },

    profile: {
      first_name: data.givenName,
      middle_name: data.middleName,
      last_name: data.surname,
      gender: data.gender ? data.gender.toLowerCase() : null,
      date_of_birth: data.dateOfBirth,
      place_of_birth: data.placeOfBirth,
      civil_status: data.civilStatus
        ? data.civilStatus.toLowerCase()
        : "single",
      nationality: data.nationality,
      religion: data.religion,
      contact_no: data.mobileNumber,
    },

    addresses: [
      {
        type: "current",
        line_1: data.houseStreet,
        line_2: "",
        province: data.province,
        municipality: data.city,
        barangay: data.barangay,
        zip_code: "0000",
        country: "Philippines",
        is_primary: true,
      },
    ],

    student_profile: {
      lrn: data.lrn,
      is_sped: data.isSped,
      is_pwd: data.isPwd,
    },

    educational_backgrounds: education,
    parents: parents,

    siblings: data.siblings.map((sib) => ({
      name: sib.fullName,
      relationship: sib.gender === "M" ? "brother" : "sister",
      date_of_birth: sib.dateOfBirth,
      occupation: "Student",
      gender: sib.gender === "M" ? "male" : "female",
      grade_level: sib.gradeLevel,
      school_attended: sib.schoolAttended,
    })),

    guardian: data.guardianName
      ? {
          first_name: splitName(data.guardianName).first,
          last_name: splitName(data.guardianName).last,
          middle_name: "",
          address: data.guardianAddress,
          province: data.guardianProvince,
          municipality: data.guardianCity,
          telephone_number: data.guardianTelephone,
          phone_number: data.guardianMobile,
          email: data.guardianEmail,
          revenue_other: "N/A",
          business_nature: "N/A",
          monthly_income: "0",
          yearly_income: "0",
        }
      : null,

    emergency_contact: {
      name: data.emergencyContactName,
      address: data.emergencyContactAddress,
      telephone_number: data.emergencyContactTelephone,
      phone_number: data.emergencyContactMobile,
      email: data.emergencyContactEmail,
    },
  };

  return api.post("/api/student-admission", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
