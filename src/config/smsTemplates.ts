//.padStart(2, '0') method is called on the resulting string. This method ensures that the string has a minimum length by adding padding characters to the start of the string.
// The first argument 2 specifies the minimum length of the resulting string.
// The second argument '0' is the padding character that will be added if necessary.

const padNumber = (num: number) => String(num).padStart(2, "0");

export const APPOINTMENT_REMINDER = (
    time: Date,
    appointmentId: string,
    shortUrl?: string
) => {
    const year = time.getFullYear();
    const month = padNumber(time.getMonth() + 1); // +1 because months are 0-based
    const day = padNumber(time.getDate());
    const hours = padNumber(time.getHours());
    const minutes = padNumber(time.getMinutes());

    // Use template literals to construct the string
    return `Вітаємо! Ви успішно записались на прийом до медичного центру TilkiDity: ${day}-${month}-${year} о ${hours}:${minutes}. Деталі запису за посиланням: ${shortUrl}. Чекаємо на Вас та вашу посмішку!`;
};

export const APPOINTMENT_CONFIRMATION = (time: Date, appointmentId: string) =>
    `APPOINTMENT CONFIRMATION ID${appointmentId} on ${time}.`;

export const APPOINTMENT_CANCELATION = (time: Date, appointmentId: string) =>
    `APPOINTMENT CANCELATION ID${appointmentId} on ${time}.`;

// Add more templates as needed
