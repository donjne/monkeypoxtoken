"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Menu, X, Wrench, BarChart3, Store, User, Users } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

const navItems = [
    {
        id: "education",
        label: "Education Hub",
        shortLabel: "Education",
        icon: Users,
        path: "/education",
    },
    {
        id: "tools",
        label: "Tool Hub",
        shortLabel: "Tools",
        icon: Wrench,
        path: "/tools",
    },
    {
        id: "dashboard",
        label: "Dashboard",
        shortLabel: "Dashboard",
        icon: BarChart3,
        path: "/dashboard",
    },
    {
        id: "marketplace",
        label: "Marketplace",
        shortLabel: "Market",
        icon: Store,
        path: "/marketplace",
    },
    // {
    //     id: "profile",
    //     label: "Profile",
    //     shortLabel: "Profile",
    //     icon: User,
    //     path: "/profile",
    // },
]

const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const WalletButton = () => (
        <WalletMultiButton />
        // <Button
        //     variant="outline"
        //     className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-purple-500 hover:border-purple-400 font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
        // >
        //     Connect Wallet
        // </Button>
    )

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-slate-900/95 backdrop-blur-xl shadow-xl border-b border-slate-800/50"
                    : "bg-slate-900/80 backdrop-blur-md"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-3 cursor-pointer group"
                            onClick={() => router.push("/")}
                        >
                            <div className="relative">
                                <Rocket className="text-yellow-400 h-8 w-8 group-hover:text-yellow-300 transition-colors duration-200" />
                                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-300/30 transition-all duration-200" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                MOONLAMBO
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map(({ id, label, shortLabel, icon: Icon, path }) => (
                                <motion.button
                                    key={id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${pathname === path
                                        ? "text-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                        }`}
                                    onClick={() => router.push(path)}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="hidden xl:inline-block">{label}</span>
                                    <span className="xl:hidden">{shortLabel}</span>
                                    {pathname === path && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-xl border border-yellow-400/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Desktop Wallet Button */}
                        <div className="hidden lg:flex items-center">
                            <WalletButton />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center space-x-3">
                            <div className="hidden sm:block">
                                <WalletButton />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800/50 z-50 lg:hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-800/50">
                                <div className="flex items-center space-x-3">
                                    <Rocket className="text-yellow-400 h-6 w-6" />
                                    <span className="text-lg font-bold text-white">Menu</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Navigation Items */}
                            <div className="flex flex-col p-6 space-y-2">
                                {navItems.map(({ id, label, icon: Icon, path }) => (
                                    <motion.button
                                        key={id}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex items-center gap-4 w-full p-4 rounded-xl text-left font-medium transition-all duration-200 ${pathname === path
                                            ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                            }`}
                                        onClick={() => {
                                            router.push(path)
                                            setIsMobileMenuOpen(false)
                                        }}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{label}</span>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Mobile Wallet Button */}
                            <div className="p-6 border-t border-slate-800/50 mt-auto">
                                <div className="sm:hidden mb-4">
                                    <WalletButton />
                                </div>
                                <div className="text-xs text-slate-500 text-center">© 2024 MOONLAMBO. All rights reserved.</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default NavBar
