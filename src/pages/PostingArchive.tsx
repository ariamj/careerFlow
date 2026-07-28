import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/PostingArchive')({
    component: () => <div>Posting Archive</div>,
})