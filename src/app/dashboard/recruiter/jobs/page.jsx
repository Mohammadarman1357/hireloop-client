import RecruiterJobsTable from '@/components/dashboard/recruiter/RecruiterJobsTable';
import { getCompanyJobs } from '@/lib/api/jobs';

const RecruiterJobs = async () => {
    const companyId = 'company_123'; // TODO: Get from authenticated session

    const jobs = await getCompanyJobs(companyId);

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <RecruiterJobsTable jobs={jobs || []} />
        </div>
    );
};

export default RecruiterJobs;
