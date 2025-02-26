export function validateUsername(username) {
    const minLength = 3
    const maxLength = 20
    const regex = /^[a-zA-Z0-9_]+$/

    if (username.length < minLength || username.length > maxLength) {
        return "Username must be between 3 and 20 characters long."
    }
    if (!regex.test(username)) {
        return "Username can only contain letters, numbers, and underscores."
    }
    return true
}

export function validatePassword(password) {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    if (password.length < minLength) {
        return "Password must be at least 8 characters long."
    }
    if (!hasUpperCase) {
        return "Password must include at least one uppercase letter."
    }
    if (!hasLowerCase) {
        return "Password must include at least one lowercase letter."
    }
    if (!hasNumber) {
        return "Password must include at least one number."
    }
    if (!hasSpecialChar) {
        return "Password must include at least one special character."
    }
    return true
}