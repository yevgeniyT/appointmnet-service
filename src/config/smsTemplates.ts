export const APPOINTMENT_REMINDER = (time: Date) =>
    `Don't forget your appointment tomorrow at ${time}.`;

export const APPOINTMENT_CONFIRMATION = (date: string, doctorName: string) =>
    `Your appointment with Dr. ${doctorName} has been confirmed for ${date}.`;

// Add more templates as needed
