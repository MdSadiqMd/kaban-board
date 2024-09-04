import { api, HydrateClient } from "~/trpc/server";
import JobForm from "~/components/ui/createJobForm";
import { JobStatus } from "~/types/jobStatus.types";

async function fetchJobs() {
  return await api.job.getJobs();
}

async function renderJobs(status: JobStatus) {
  const jobs = await fetchJobs();
  return jobs
    .filter(job => job.status === status)
    .map((job, index) => (
      <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg shadow">
        <h4 className="text-md font-semibold">{job.title}</h4>
        <p className="text-sm text-gray-600">{job.company}</p>
      </div>
    ));
}

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#4AC29A] to-[#BDFFF3] text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Job Application Tracker</h1>
            <JobForm />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 text-center">To Apply</h3>
              <div>{await renderJobs('TO_APPLY')}</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 text-center">Applied</h3>
              <div>{await renderJobs('APPLIED')}</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 text-center">Interviewing</h3>
              <div>{await renderJobs('INTERVIEWING')}</div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4 text-center">Offer</h3>
              <div>{await renderJobs('OFFER')}</div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}