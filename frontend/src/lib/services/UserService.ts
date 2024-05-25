import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    AccessType,
    AuthQueryType,
    RefreshType,
    UserResponseType
} from "../models/userType";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_LINK
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<UserResponseType, AuthQueryType>({
            query: (body) => ({
                url: 'public/reg',
                method: 'POST',
                body
            })
        }),
        authUser: build.mutation<UserResponseType, AuthQueryType>({
            query: (body) => ({
                url: 'public/log',
                method: 'POST',
                body
            })
        }),
        refreshUser: build.mutation<AccessType, RefreshType>({
            query: (body) => ({
                url: 'public/auth/refresh',
                method: 'POST',
                body
            })
        })
    })
})
