// status.constants.ts
export const STATUS_CODES = {
    SUCCESS: {
        code: '0000',
        message: 'success',
    },
    USER_NOT_FOUND: {
        code: '0001',
        message: 'Utilisateur non trouvé',
    },
    INVALID_PASSWORD: {
        code: '0003',
        message: 'Mot de passe incorrect',
    },
    UNAUTHORIZED_ROLE: {
        code: '0003',
        message: 'Rôle non autorisé',
    },
    INTERNAL_ERROR: {
        code: '0001',
        message: 'Erreur interne',
    },
    TOKEN_INVALID: {
        code: '0006',
        message: 'Token invalide ou expiré',
    },
    OTHER_ERROR: {
        code: '0003',
        message: 'Autre erreur',
    },
};

// Fonction pour créer la réponse formatée
export const createResponse = (statusCode: string, data: any = null) => {
    const statusEntry = Object.values(STATUS_CODES).find(status => status.code === statusCode);
    
    // Si le code de statut n'est pas trouvé, renvoie undefined
    if (!statusEntry) {
        return {
            status: null,
            message: 'Code de statut inconnu',
            data,
        };
    }
    
    return {
        status: statusEntry.code,
        message: statusEntry.message,
        data,
    };
};
