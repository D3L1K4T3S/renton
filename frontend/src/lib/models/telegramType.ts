export type telegramVerifyRequest = {
    tgName: string,
    access: string
}

export type telegramCheckRequest = {
    access: string
}

export type telegramVerifyResponse = {
    code: string
}

export type telegramCheckResponse = {
    activated: boolean
}
