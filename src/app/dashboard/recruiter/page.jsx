"use client"
import React from 'react';
import Loading from '@/components/ui/Loading';
import { useSession } from '@/lib/auth-client';

const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <Loading></Loading>
    }

    const user = session?.user;
    console.log("Session data in RecruiterDashboardHomePage :", session);

    return (
        <div className='p-4'>
            <h2 className='text-2xl font-bold'>Welcome back, {user?.name}</h2>
        </div>
    );
};

export default RecruiterDashboardHomePage;