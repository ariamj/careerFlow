export interface CustomData {
    id: string;
    company: string;
    position: string;
    status: string;
}

// Generate dummy data
const mockDatabase: CustomData[] = Array.from( { length: 50 }, (_, i) => ({
    id: `id-${i}`,
    company: `Company ${i}`,
    position: i % 2 == 0 ? 'SDE' : 'Web Developer',
    status: i % 2 == 0 ? 'Shortlisted' : 'Applied',
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