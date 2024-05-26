import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    telegramCheckRequest,
    telegramCheckResponse,
    telegramVerifyRequest,
    telegramVerifyResponse
} from "@/lib/models/telegramType";

export const telegramAPI = createApi({
    reducerPath: 'telegramAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_LINK
    }),
    endpoints: (build) => ({
        verify: build.mutation<telegramVerifyResponse, telegramVerifyRequest>({
            query: (body) => ({
                url: 'private/verifytg',
                method: 'POST',
                body: {
                    tgName: body.tgName
                },
                headers: {
                    Authorization: 'Bearer ' + body.access,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
        }),
        check: build.query<telegramCheckResponse, telegramCheckRequest>({
            query: (body) => ({
                url: 'private/isactive',
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + body.access,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
        })
    })
})
