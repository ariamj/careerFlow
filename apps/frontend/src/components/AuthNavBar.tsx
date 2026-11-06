import { Link } from "@tanstack/react-router";
import { BriefcaseBusiness } from "lucide-react";

export default function AuthNavBar() {
    return (
        <header className="bg-white dark:bg-gray-900">
            <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6 lg:px-8 lg:mx-0">
                <div className="flex lg:flex-1">
                    <Link to="/Dashboard" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <BriefcaseBusiness size={48} className = "h-8 w-auto dark:hidden" />
                        <BriefcaseBusiness size={48} color="#f5f5f5" className = "h-8 w-auto not-dark:hidden" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}