import { api, HydrateClient } from "~/trpc/server";
import JobForm from "~/components/ui/createJobForm";
import { JobStatus } from "~/types/jobStatus.types";

async function renderJobs(status: JobStatus) {
  const jobs = await api.job.getJobs();
  return jobs
    .filter(job => job.status === status)
    .map((job, index) => (
      <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow">
        <h4 className="text-md font-semibold">{job.title}</h4>
        <p className="text-sm text-gray-600">{job.company}</p>
      </div>
    ));
}

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-300 via-emerald-300 to-green-200 text-gray-900">
        <div className="w-full max-w-5xl px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-green-800 mb-6">Add New Job</h1>
            <div className="w-full max-w-lg mx-auto">
              <JobForm />
            </div>
          </div>
          <section>
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Job Application Tracker</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">To Apply</h3>
                <div>{await renderJobs('TO_APPLY')}</div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Applied</h3>
                <div>{await renderJobs('APPLIED')}</div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Interviewing</h3>
                <div>{await renderJobs('INTERVIEWING')}</div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Offer</h3>
                <div>{await renderJobs('OFFER')}</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}