import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard')({
    component: () => (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-2xl font-bold bg-gray-200 p-4 rounded-lg">
                    Top Shortlist
                </div>
                <div className="text-2xl font-bold bg-gray-200 p-4 rounded-lg">
                    Total Applications
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="text-2xl font-bold bg-gray-200 p-4 rounded-lg">
                    Tracking Sites
                </div>
            </div>
        </div>
    )
});