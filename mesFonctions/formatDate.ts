// mesFonctions/formatDate.ts
export function formatConsultationDateTime(dateString: string, heureString: string): Date {
    const date = new Date(dateString);
    const [hours, minutes, seconds] = heureString.split(':').map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date; // Retourne l'objet Date
}
