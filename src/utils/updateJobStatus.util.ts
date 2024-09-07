"use server";

import { revalidatePath } from "next/cache";

import { api } from "~/trpc/server";
import { JobStatus } from "~/types/jobStatus.types";

async function updateJobStatus(formData: FormData) {
    const jobId = parseInt(formData.get('jobId') as string);
    const newStatus = formData.get('newStatus') as JobStatus;
    if (isNaN(jobId) || !newStatus) {
        throw new Error('Invalid input');
    }
    await api.job.updateStatus({ id: jobId, status: newStatus });
    revalidatePath('/');
}

export default updateJobStatus;