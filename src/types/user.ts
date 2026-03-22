export type User = {
    id: string
    userName: string
    email: string
    created: string
    roles: string[]
    firstName?: string
    lastName?: string
    modified?: string
}

// Utility function to get display name from user
export const getUserDisplayName = (user: User | null): string => {
    if (!user) return "User"

    // Try to construct from firstName + lastName
    const firstName = user.firstName?.trim()
    const lastName = user.lastName?.trim()

    if (firstName && lastName) {
        return `${firstName} ${lastName}`.trim()
    }

    if (firstName) return firstName
    if (lastName) return lastName

    // Fallback to userName or email
    const usernameFallback = user.userName?.trim()
    if (usernameFallback) return usernameFallback

    const emailFallback = user.email?.trim()
    if (emailFallback) {
        const emailParts = emailFallback.split("@")
        if (emailParts[0]) return emailParts[0]
        return emailFallback
    }

    return "User"
}

export type AuthResponse = {
    success: boolean
    token?: string
    message?: string
    errors?: string[]
    user?: User
    emailConfirmationUrl?: string
    emailSent?: boolean
}

export type RegisterRequest = {
    userName: string
    email: string
    password: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type UpdateProfileRequest = {
    userName?: string
    firstName?: string
    lastName?: string
}
