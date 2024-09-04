"use client";

import React from 'react';

import { toast } from '~/hooks/use-toast';
import { JobStatus } from '~/types/jobStatus.types';
import { Button } from './button';

export default function JobForm() {
    const addJob = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        /* console.log(Array.from(formData.entries())); */

        const newJob = {
            title: formData.get('title') as string,
            company: formData.get('company') as string,
            status: formData.get('status') as JobStatus,
        };
        try {
            const response = await fetch('/api/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            if (!response.ok) {
                throw new Error('Failed to add job');
            }

            toast({
                title: "Job Added",
                description: `${newJob.title} at ${newJob.company} has been added to your tracker.`,
            });
            form.reset();
        } catch (error) {
            /* console.error('Error:', error); */
            toast({
                title: "Error",
                description: "Failed to add job. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={addJob} className="mb-8">
            <input type="text" name="title" placeholder="Job Title" className="p-2 rounded mr-2" required />
            <input type="text" name="company" placeholder="Company" className="p-2 rounded mr-2" required />
            <select name="status" className="p-2 rounded mr-2" required>
                <option value="TO_APPLY">To Apply</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEWING">Interviewing</option>
                <option value="OFFER">Offer</option>
            </select>
            <Button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">+ Add New Job</Button>
        </form>
    );
}