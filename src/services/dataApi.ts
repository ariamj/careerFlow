import { STATUS_OPTIONS, WORK_MODE_OPTIONS, type Application } from "@/utils/types";

export interface CustomData {
    id: string;
    company: string;
    position: string;
    workMode: string;
    status: string;
}

// Generate dummy data
const mockDatabase: Application[] = Array.from( { length: 50 }, (_, i) => ({
    id: `id-${i}`,
    company: `Company ${i}`,
    position: i % 2 == 0 ? 'SDE' : 'Web Developer',
    workMode: i % 4 == 0 ? WORK_MODE_OPTIONS.REMOTE : (i % 4 == 1 ? WORK_MODE_OPTIONS.HYBRID : (i % 4 == 2 ? WORK_MODE_OPTIONS.ON_SITE : undefined)),
    applyDate: new Date(2026, 0, i+1),
    status: i % 3 == 0 ? [STATUS_OPTIONS.SHORTLISTED] : (i % 3 == 1 ? [STATUS_OPTIONS.SHORTLISTED, STATUS_OPTIONS.APPLIED] : [STATUS_OPTIONS.REJECTED])
}));

// Simulate backend query endpoint
export const fetchCustomData = async (search?: string, page = 1) => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    let filtered = [...mockDatabase];
    if (search) {
        filtered = filtered.filter(item => item.company.toLowerCase().includes(search.toLowerCase()));
    }

    const pageSize = 10;
    const start = (page - 1) * pageSize;
    return {
        items: filtered.slice(start, start + pageSize),
        totalPages: Math.ceil(filtered.length / pageSize),
    };
};

export const fetchApplications = async (): Promise<Application[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

    return [...mockDatabase];
};