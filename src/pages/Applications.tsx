import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Applications')({
    component: () => (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-2xl font-bold bg-gray-200 p-4 rounded-lg">
                    Stats 1
                </div>
                <div className="text-2xl font-bold bg-gray-200 p-4 rounded-lg">
                    Stats 2
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-around font-bold">
                    <div>
                        Company
                    </div>
                    <div>
                        Position
                    </div>
                    <div>
                        Status
                    </div>
                </div>
                <div className="mt-2 bg-gray-200 p-4 rounded-lg">
                    Table
                </div>
            </div>
        </div>
    )
})