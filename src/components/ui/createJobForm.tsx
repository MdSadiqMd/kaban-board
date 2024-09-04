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
            if (!response.ok) throw new Error('Failed to add job');
            toast({
                title: "Job Added",
                description: `${newJob.title} at ${newJob.company} has been added to your tracker.`,
            });
            form.reset();
            window.location.reload();
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
        <form onSubmit={addJob} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter job title"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        id="company"
                        type="text"
                        name="company"
                        placeholder="Enter company name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="TO_APPLY">To Apply</option>
                        <option value="APPLIED">Applied</option>
                        <option value="INTERVIEWING">Interviewing</option>
                        <option value="OFFER">Offer</option>
                    </select>
                </div>
                <div className="flex-none">
                    <Button
                        type="submit"
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        + Add New Job
                    </Button>
                </div>
            </div>
        </form>
    );
}