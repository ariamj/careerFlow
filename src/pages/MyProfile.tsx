import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/MyProfile')({
    component: () => <div>My Profile</div>,
})