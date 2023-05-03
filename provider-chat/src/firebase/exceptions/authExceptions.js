export function AuthExceptions(code) {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'Email já cadastrado.';
        case 'auth/invalid-email':
            return 'Este email não é válido!';
        case 'auth/operation-not-allowed':
            return 'Conta desabilitada!';
        case 'auth/weak-password':
            return 'Senha fraca!';
        default:
            return 'Ocorreu um erro inesperado.';
    }
}