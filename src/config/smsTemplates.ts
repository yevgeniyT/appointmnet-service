export const APPOINTMENT_REMINDER = (
    time: Date,
    appointmentId: string,
    token?: string
) => `APPOINTMENT REMINDER ID${appointmentId} on ${time}. token:${token}}`;

export const APPOINTMENT_CONFIRMATION = (time: Date, appointmentId: string) =>
    `APPOINTMENT CONFIRMATION ID${appointmentId} on ${time}.`;

export const APPOINTMENT_CANCELATION = (time: Date, appointmentId: string) =>
    `APPOINTMENT CANCELATION ID${appointmentId} on ${time}.`;

// Add more templates as needed
