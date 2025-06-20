"use client"

import { ChevronDown, User2 } from 'lucide-react'
import Link from "next/link"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/useAuth"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function Navbar() {
    const { userData, isError, isLoading, logout } = useAuth();
    const { user } = userData || {};
    const router = useRouter()

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logged out successfully")
                router.push('/')
            },
            onError: () => {
                toast.error("Failed to log out")
            }
        });
    };
    if (isLoading || !user || isError) return <NavbarSkeleton />

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="max-sm:text-xl text-2xl font-bold tracking-tight  cursor-pointer">
                    Task Master
                </Link>
                <div className="flex items-center gap-2">
                    <ModeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 pl-2 pr-1">
                                <Avatar className="h-7 w-7">
                                    <AvatarFallback>
                                        <User2 className="h-4 w-4 text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                                <span
                                    className="hidden truncate text-sm font-medium md:inline-block max-w-[100px]"
                                    title={user.name}
                                >
                                    {user.name}
                                </span>

                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link href="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                            <DropdownMenuSeparator />
                            <Link href="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}


const NavbarSkeleton = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="max-sm:text-xl text-2xl font-bold tracking-tight  cursor-pointer">
                    Task Master
                </Link>

                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}