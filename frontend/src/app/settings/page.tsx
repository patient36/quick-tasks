import { Metadata } from "next"
import SettingsPage from "@/components/settings/settings-page"

export const metadata: Metadata = {
    title: " Account Settings",
    description: "Manage your account settings and preferences.",
}

export default function Settings() {
    return (
        <div className="container flex items-center justify-center px-4 w-screen py-10">
            <div className="space-y-6 ">
                <SettingsPage />
            </div>
        </div>
    )
}
