"use client"
import React from 'react';
import Loading from '@/components/ui/Loading';
import { useSession } from '@/lib/auth-client';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { CircleCheck, FileText, Persons, Thunderbolt } from '@gravity-ui/icons';

// Your stats data
const stats = [
    {
        id: 1,
        title: "Total Job Posts",
        value: "48",
        icon: FileText,
    },
    {
        id: 2,
        title: "Total Applicants",
        value: "1,284",
        icon: Persons,
    },
    {
        id: 3,
        title: "Active Jobs",
        value: "18",
        icon: Thunderbolt,
    },
    {
        id: 4,
        title: "Jobs Closed",
        value: "32",
        icon: CircleCheck,
    },
];

const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <Loading></Loading>
    }

    const user = session?.user;
    console.log("Session data in RecruiterDashboardHomePage :", session);

    return (
        <div className='space-y-6 p-4'>

            <h2 className='text-2xl font-bold'>Welcome back, {user?.name}</h2>

            <DashboardStats data={stats}></DashboardStats>
        </div>
    );
};

export default RecruiterDashboardHomePage;