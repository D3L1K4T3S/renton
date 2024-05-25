'use client'

import {FC} from "react";
import AuthPage from "@/components/pages/authPage/authPage";

const Page: FC = () => {
    return (
        <AuthPage onSubmit={()=>{}} type='reg'/>
    );
};

export default Page;
