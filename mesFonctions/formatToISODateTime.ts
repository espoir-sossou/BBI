// Fonction pour formater la date et l'heure dans le format ISO 8601export 
export function formatToISODateTime(date: string, time: string): string {
    const combined = `${date}T${time}Z`; // Combine la date et l'heure en format ISO
    return new Date(combined).toISOString(); // Convertir en ISO 8601
}
