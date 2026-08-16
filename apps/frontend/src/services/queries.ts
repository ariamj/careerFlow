import { queryOptions } from '@tanstack/react-query'
import {
    type Application,
    type InterestLevel,
    type Status,
    type WorkMode,
    INTEREST_LEVEL_OPTIONS,
    STATUS_OPTIONS,
    WORK_MODE_OPTIONS
} from '../utils/types'

const base_url = import.meta.env.VITE_API_URL || "http://localhost:3000"

export const getApplicationsData = queryOptions({
    queryKey: ['applications'],
    queryFn: async (): Promise<Application[]> => {
        const response = await fetch(`${base_url}/api/applications`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()

        return data.map((application: any) => ({
            ...application,
            interest: INTEREST_LEVEL_OPTIONS[application.interest as keyof typeof INTEREST_LEVEL_OPTIONS] as InterestLevel | undefined,
            workMode: WORK_MODE_OPTIONS[application.workMode as keyof typeof WORK_MODE_OPTIONS] as WorkMode | undefined,
            applyDate: new Date(application.applyDate),
            status: application.status.map((status: string) => STATUS_OPTIONS[status as keyof typeof STATUS_OPTIONS] as Status)
        }));
        
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
})

export const testQuery = queryOptions({
    queryKey: ['test'],
    queryFn: async () => {
        const response = await fetch(`${base_url}/api/testing`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json();
    }
})