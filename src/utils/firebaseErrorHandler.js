export default function firebaseErrorHandler(errors) {
    if (
        errors.message === 'Firebase: Error (auth/user-not-found).' ||
        errors.message === 'Firebase: Error (auth/wrong-password).' ||
        errors.message === 'Firebase: Error (auth/invalid-email).'
    ) {
        return {
            status: 'failed',
            message: `Email and password didn't match.`,
        }
    } else if (
        errors.message.toLowerCase().includes('auth/too-many-requests')
    ) {
        return {
            status: 'failed',
            message: `Too many login requests.`,
        }
    } else if (
        errors.message.toLowerCase().includes('auth/unauthorized-domain')
    ) {
        return {
            status: 'failed',
            message: `Can't login on unauthorized domain.`,
        }
    }

    return {
        status: 'failed',
        message: errors?.message || errors.toString(),
    }
}
