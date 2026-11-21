"use client"
import React from 'react';
import Loading from '@/components/ui/Loading';
import { useSession } from '@/lib/auth-client';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { CircleCheck, FileText, Persons, Thunderbolt } from '@gravity-ui/icons';
import RecentApplications from '@/components/dashboard/recruiter/RecentApplications';
import TopCompanies from '@/components/dashboard/recruiter/TopCompanies';

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

// recent applications
const recentApplications = [
    {
        id: 1,
        name: "Julianne Moore",
        role: "Senior Product Designer",
        dateApplied: "Oct 24, 2023",
        experience: "6 years",
        status: "Interviewing",
        avatar: null,
    },
    {
        id: 2,
        name: "Robert Downey",
        role: "Backend Engineer",
        dateApplied: "Oct 23, 2023",
        experience: "4 years",
        status: "New",
        avatar: null,
    },
    {
        id: 3,
        name: "Emma Stone",
        role: "Marketing Lead",
        dateApplied: "Oct 22, 2023",
        experience: "8 years",
        status: "Reviewing",
        avatar: null,
    },
    {
        id: 4,
        name: "Chris Pratt",
        role: "Product Manager",
        dateApplied: "Oct 21, 2023",
        experience: "5 years",
        status: "Rejected",
        avatar: null,
    },
];

// top companies
const topCompanies = [
    {
        id: 1,
        name: "Google Inc.",
        initials: "G",
        industry: "Technology",
        location: "Mountain View",
        activeJobs: 24,
        logo: null,
    },
    {
        id: 2,
        name: "Meta Platforms",
        initials: "M",
        industry: "Social Media",
        location: "Menlo Park",
        activeJobs: 18,
        logo: null,
    },
    {
        id: 3,
        name: "Stripe",
        initials: "S",
        industry: "Fintech",
        location: "San Francisco",
        activeJobs: 12,
        logo: null,
    },
    {
        id: 4,
        name: "Tesla",
        initials: "T",
        industry: "Automotive",
        location: "Austin",
        activeJobs: 31,
        logo: null,
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

            {/* Applications & Companies */}
            <div className="
                grid grid-cols-1 gap-6
                xl:grid-cols-[minmax(0,2fr)_minmax(320px,0.95fr)]
                items-start
            ">

                {/* Recent Applications */}
                <RecentApplications
                    applications={recentApplications}
                    viewAllHref="/dashboard/recruiter/applications"
                />


                {/* Top Companies */}
                <TopCompanies
                    companies={topCompanies}
                    viewAllHref="/dashboard/recruiter/companies"
                />

            </div>

        </div>
    );
};

export default RecruiterDashboardHomePage;