import { queryOptions } from '@tanstack/react-query'
import { type Application } from './types'
import { fetchApplications } from '@/services/dataApi'

export const applicationQueryOptions = queryOptions({
    queryKey: ['applications'],
    queryFn: async (): Promise<Application[]> => {
        // const response = await fetch('/api/applications')
        // if (!response.ok) {
        //     throw new Error('Network response was not ok')
        // }
        // return response.json() as Promise<Application[]>
        
        const response = await fetchApplications() // Use the mock fetch function
        return response
        
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
})