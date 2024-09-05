import { api } from "~/trpc/server";
import JobForm from "~/components/ui/createJobForm";
import { JobStatus } from "~/types/jobStatus.types";
import updateJobStatus from "~/utils/updateJobStatus.util";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const jobs = await api.job.getJobs();

  const groupedJobs = jobs.reduce((acc: Record<JobStatus, any[]>, job) => {
    if (!acc[job.status]) acc[job.status] = [];
    acc[job.status].push(job);
    return acc;
  }, {
    TO_APPLY: [],
    APPLIED: [],
    INTERVIEWING: [],
    OFFER: [],
  });

  const statusOrder: JobStatus[] = ['TO_APPLY', 'APPLIED', 'INTERVIEWING', 'OFFER'];

  const renderJobs = (status: JobStatus) => {
    return groupedJobs[status]?.map((job) => (
      <div key={job.id} className="bg-white p-4 mb-4 rounded-lg shadow">
        <h4 className="text-md font-semibold">{job.title}</h4>
        <p className="text-sm text-gray-600">{job.company}</p>
        <div className="mt-2 flex justify-between">
          <form action={updateJobStatus}>
            <input type="hidden" name="jobId" value={job.id} />
            <input type="hidden" name="newStatus" value={statusOrder[statusOrder.indexOf(status) - 1]} />
            <Button
              type="submit"
              disabled={status === 'TO_APPLY'}
              className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              ←
            </Button>
          </form>
          <form action={updateJobStatus}>
            <input type="hidden" name="jobId" value={job.id} />
            <input type="hidden" name="newStatus" value={statusOrder[statusOrder.indexOf(status) + 1]} />
            <Button
              type="submit"
              disabled={status === 'OFFER'}
              className="px-2 py-1 bg-green-500 text-white rounded disabled:bg-gray-300"
            >
              →
            </Button>
          </form>
        </div>
      </div>
    ));
  };

  return (
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
            {statusOrder.map((status) => (
              <div key={status} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">{status.replace('_', ' ')}</h3>
                <div>{renderJobs(status)}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}