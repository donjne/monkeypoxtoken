"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCubes, FaCube, FaCandyCane, FaFilePdf, FaArrowRight } from "react-icons/fa6";
import { Layers, KeyRound, Tag, Candy, Badge, Wallet, PenTool, Puzzle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const tools = [
    {
        name: "Bubblegum v1",
        link: "#",
        icon: FaCubes,
        description: "The original tool for minting compressed NFTs at low cost, perfect for legacy collections. Launched as a pioneer in Solana’s NFT efficiency.",
        category: "Minting",
        visual: "compressed NFT stack"
    },
    {
        name: "Bubblegum v2",
        link: "#",
        icon: FaCube,
        description: "An upgraded version of Bubblegum, offering enhanced scalability for larger compressed NFT collections with improved performance.",
        category: "Minting",
        visual: "upgraded compressed NFT"
    },
    {
        name: "Candy Machine",
        link: "#",
        icon: FaCandyCane,
        description: "A classic launchpad for fair NFT minting, ideal for drops with customizable settings like dates and supply.",
        category: "Minting",
        visual: "candy dispenser"
    },
    {
        name: "Core",
        link: "/tools/launch-pad",
        icon: Badge,
        description: "The next-gen NFT standard, storing all data on-chain for 85% lower costs—great for modern collections.",
        category: "Minting",
        visual: "next-gen NFT badge"
    },
    {
        name: "Core Candy Machine",
        link: "#",
        icon: Candy,
        description: "Combines Core’s efficiency with bulk minting, perfect for large-scale NFT launches.",
        category: "Minting",
        visual: "modern candy dispenser"
    },
    {
        name: "Fusion",
        link: "#",
        icon: Layers,
        description: "Enables nesting NFTs inside NFTs, unlocking creative ownership structures for advanced projects.",
        category: "Advanced Assets",
        visual: "nested NFTs"
    },
    {
        name: "Hydra",
        link: "#",
        icon: Wallet,
        description: "Simplifies fund distribution with fanout wallets, ideal for team payouts or community airdrops.",
        category: "Management",
        visual: "multi-stream wallet"
    },
    {
        name: "Inscription",
        link: "#",
        icon: PenTool,
        description: "Inscribes data directly onto Solana, creating unique on-chain NFTs with lasting value.",
        category: "Advanced Assets",
        visual: "on-chain engraving"
    },
    {
        name: "MPL-Hybrid",
        link: "/tools/launch-pad",
        icon: Puzzle,
        description: "Blends fungible and non-fungible traits, offering dynamic assets for gaming or DeFi use cases.",
        category: "Advanced Assets",
        visual: "hybrid asset blend"
    },
    {
        name: "Token Auth Rules",
        link: "#",
        icon: KeyRound,
        description: "Sets customizable permissions for tokens and NFTs, ensuring secure and controlled access.",
        category: "Management",
        visual: "lock with permissions"
    },
    {
        name: "Token Metadata",
        link: "/tools/token-metadata",
        icon: Tag,
        description: "Standardizes asset details (name, image, etc.), linking to decentralized storage for all your creations.",
        category: "Management",
        visual: "metadata tag"
    },
];

const categories = [
    { label: "All", value: "all" },
    { label: "Minting", value: "Minting" },
    { label: "Advanced Assets", value: "Advanced Assets" },
    { label: "Management", value: "Management" },
];

export default function ToolsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const filteredTools = tools.filter(tool => {
        const matchesCategory = category === "all" || tool.category === category;
        const matchesSearch =
            tool.name.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase()) ||
            tool.visual.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#111827] to-gray-900 py-12 px-4 sm:px-8 lg:px-24">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">Tool Hub</h1>
                    <p className="text-gray-400 text-lg">Explore, mint, and manage with the best tools in the Solana ecosystem.</p>
                </div>

                {/* Search/Filter */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div className="flex-1 flex items-center gap-2 bg-gray-800/60 rounded-lg px-4 py-2">
                        <Sparkles className="text-yellow-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search tools (e.g., 'compressed', 'NFT')"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-gray-200 flex-1 placeholder-gray-400"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                            <Button
                                key={cat.value}
                                variant={category === cat.value ? "default" : "secondary"}
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${category === cat.value ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400 hover:bg-yellow-400/20"}`}
                                onClick={() => setCategory(cat.value)}
                            >
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Tool Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTools.map(tool => (
                        <motion.div
                            key={tool.name}
                            whileHover={{ y: -6, scale: 1.03 }}
                            className="bg-gray-900/80 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3 text-yellow-400 mb-2">
                                <tool.icon className="h-7 w-7" />
                                <h2 className="text-lg font-bold">{tool.name}</h2>
                            </div>
                            <div className="text-gray-300 text-sm flex-1 mb-2">
                                {tool.description}
                            </div>
                            {tool.link && tool.link !== "#" ? (
                                <Link href={tool.link} className="w-full" passHref>
                                    <Button asChild variant="secondary" className="flex items-center gap-2 w-full mt-auto">
                                        <span className="flex items-center gap-2">
                                            {tool.link.includes("Bubblegum") ? <Sparkles /> : <FaArrowRight />}
                                            {`Go to ${tool.name}`}
                                        </span>
                                    </Button>
                                </Link>
                            ) : (
                                <Button variant="secondary" className="flex items-center gap-2 w-full mt-auto" disabled>
                                    {tool.link.includes("Bubblegum") ? <Sparkles /> : <FaArrowRight />}
                                    Coming Soon
                                </Button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}