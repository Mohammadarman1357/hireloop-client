import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';

const RecruiterJobs = async () => {
    const companyId = 'company_123';     // todo
    const jobs = await getCompanyJobs(companyId);
    console.log("Jobs for Company", jobs);
    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <h2>Recruiter/Company Manage All Jobs</h2>
        </div>
    );
};

export default RecruiterJobs;