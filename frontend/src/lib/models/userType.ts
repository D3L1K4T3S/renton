export type UserResponseType = {
    type: string,
    accessToken: string,
    refreshToken: string
}

export type AuthQueryType = {
    username: string,
    password: string
}

export type RefreshType = {
    refreshToken: string
}

export type AccessType = {
    accessToken: string
}
