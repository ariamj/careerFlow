import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Dashboard')({
    component: () => (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    Top Shortlist
                </div>
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    Total Applications
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="text-2xl font-bold bg-card text-card-foreground shadow-sm ring-1 ring-border p-4 rounded-md">
                    Tracking Sites
                </div>
            </div>
        </div>
    )
});