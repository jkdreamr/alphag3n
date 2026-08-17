export const GENDER_OPTIONS = [
  "male",
  "female",
  "non_binary",
  "self_describe",
  "prefer_not_to_say",
] as const;

export const INTEREST_OPTIONS = [
  "Artificial Intelligence",
  "Robotics / Physical AI",
  "Web3 / Blockchain",
  "Startups & Entrepreneurship",
  "Software Engineering",
  "Hardware",
  "Research",
  "Hackathons",
  "Conferences",
  "College / Career",
  "Other",
] as const;

type Gender = (typeof GENDER_OPTIONS)[number];

export type MemberInput = {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender | null;
  genderSelfDescription: string | null;
  school: string | null;
  graduationYear: number | null;
  city: string | null;
  country: string | null;
  discordUsername: string | null;
  interests: string[];
  howHeard: string | null;
  emailConsent: true;
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function cleanText(value: unknown, label: string, maxLength: number) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") throw new ValidationError(`${label} is invalid.`);

  const cleaned = value.trim().replace(/\s+/g, " ");
  if (!cleaned) return null;
  if (cleaned.length > maxLength || /[\u0000-\u001F\u007F]/.test(cleaned)) {
    throw new ValidationError(`${label} is too long or contains invalid characters.`);
  }
  return cleaned;
}

function requiredText(value: unknown, label: string, maxLength: number) {
  const cleaned = cleanText(value, label, maxLength);
  if (!cleaned) throw new ValidationError(`${label} is required.`);
  return cleaned;
}

export function normalizeMemberInput(input: unknown): MemberInput {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new ValidationError("Please complete the required fields.");
  }

  const value = input as Record<string, unknown>;
  const firstName = requiredText(value.firstName, "First name", 80);
  const lastName = requiredText(value.lastName, "Last name", 80);
  const email = requiredText(value.email, "Email", 254).toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new ValidationError("Please enter a valid email address.");
  }
  if (value.emailConsent !== true) {
    throw new ValidationError("Please agree to receive ALPHAG3N community emails.");
  }

  const genderValue = cleanText(value.gender, "Gender", 30);
  const gender = genderValue && GENDER_OPTIONS.includes(genderValue as Gender)
    ? genderValue as Gender
    : genderValue
      ? (() => { throw new ValidationError("Please choose a valid gender option."); })()
      : null;
  const genderSelfDescription = gender === "self_describe"
    ? cleanText(value.genderSelfDescription, "Gender description", 80)
    : null;

  let graduationYear: number | null = null;
  if (value.graduationYear !== undefined && value.graduationYear !== null && value.graduationYear !== "") {
    const parsed = typeof value.graduationYear === "number"
      ? value.graduationYear
      : Number(value.graduationYear);
    const currentYear = new Date().getUTCFullYear();
    if (!Number.isInteger(parsed) || parsed < currentYear - 2 || parsed > currentYear + 12) {
      throw new ValidationError("Please choose a valid graduation year.");
    }
    graduationYear = parsed;
  }

  if (value.interests !== undefined && !Array.isArray(value.interests)) {
    throw new ValidationError("Areas of interest are invalid.");
  }
  const rawInterests = Array.isArray(value.interests) ? value.interests : [];
  if (rawInterests.length > INTEREST_OPTIONS.length) {
    throw new ValidationError("Too many areas of interest were selected.");
  }
  const interests = Array.from(new Set(rawInterests.map((interest) => {
    if (typeof interest !== "string" || !INTEREST_OPTIONS.includes(interest as typeof INTEREST_OPTIONS[number])) {
      throw new ValidationError("Please choose valid areas of interest.");
    }
    return interest;
  })));

  const otherInterest = interests.includes("Other")
    ? cleanText(value.otherInterest, "Other interest", 100)
    : null;
  const storedInterests = interests.map((interest) =>
    interest === "Other" && otherInterest ? `Other: ${otherInterest}` : interest
  );

  return {
    firstName,
    lastName,
    email,
    gender,
    genderSelfDescription,
    school: cleanText(value.school, "School", 160),
    graduationYear,
    city: cleanText(value.city, "City", 100),
    country: cleanText(value.country, "Country", 100),
    discordUsername: cleanText(value.discordUsername, "Discord username", 80),
    interests: storedInterests,
    howHeard: cleanText(value.howHeard, "How you heard about ALPHAG3N", 160),
    emailConsent: true,
  };
}
