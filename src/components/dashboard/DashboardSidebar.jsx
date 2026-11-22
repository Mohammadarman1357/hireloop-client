
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    LayoutSideContentLeft,
    Briefcase,
    Envelope,
    Gear,
    House,
    Magnifier,
    Person,
    CirclePlus,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();

    const user = session?.user;
    const userName = user?.name || "Recruiter";
    const userImage = user?.image;

    const userInitial = userName.charAt(0).toUpperCase();

    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
        { icon: CirclePlus, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "My Company" },
        { icon: Envelope, href: "/messages", label: "Applications" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const isActive = (href) => {
        const matchedItem = navItems
            .filter((item) => {
                if (item.href === "/dashboard/recruiter") {
                    return pathname === item.href;
                }

                return (
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                );
            })
            .sort((a, b) => b.href.length - a.href.length)[0];

        return matchedItem?.href === href;
    };
    
    const profileContent = (
        <div className="mb-8 flex items-center gap-3 px-1">
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#292929]">
                {userImage ? (
                    <img
                        src={userImage}
                        alt={userName}
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-lg font-semibold text-white">
                        {userInitial}
                    </span>
                )}
            </div>

            <div className="min-w-0">
                <h3 className="truncate text-base font-medium text-white">
                    {userName}
                </h3>
                <p className="text-sm text-white/50">
                    Recruiter
                </p>
            </div>
        </div>
    );

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`
                            group relative flex items-center gap-4
                            rounded-none px-3 py-4
                            text-[15px] font-medium
                            transition-all duration-200
                            ${active
                                ? "bg-[#292929] text-white"
                                : "text-white/45 hover:bg-white/[0.06] hover:text-white"
                            }
                        `}
                    >
                        <item.icon
                            className={`size-5 shrink-0 transition-colors ${active
                                    ? "text-white"
                                    : "text-white/45 group-hover:text-white"
                                }`}
                        />

                        <span>{item.label}</span>

                        {active && (
                            <span className="absolute right-0 top-0 h-full w-1 bg-white" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#121212] px-6 py-6 lg:block">
                {profileContent}
                {navContent}
            </aside>

            {/* Mobile Sidebar Trigger */}
            <div className="px-4 pt-4 lg:hidden">
                <Button
                    isIconOnly
                    variant="ghost"
                    onPress={() => setIsOpen(true)}
                    className="text-white"
                    aria-label="Open dashboard navigation"
                >
                    <LayoutSideContentLeft className="size-6" />
                </Button>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            >
                <Drawer.Backdrop>
                    <Drawer.Content
                        placement="left"
                        className="bg-[#121212] text-white"
                    >
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />

                            <Drawer.Body className="px-5 py-6">
                                {profileContent}
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}
