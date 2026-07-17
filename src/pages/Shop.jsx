import { useState } from "react";
import productsData from "../data/productsData";
import { useCart } from "../context/CartContext";

const categories = ["All", ...new Set(productsData.map((p) => p.category))];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSizes, setSelectedSizes] = useState({});
    const [addedFeedback, setAddedFeedback] = useState({});
    const { addToCart } = useCart();

    const filteredProducts =
        selectedCategory === "All"
            ? productsData
            : productsData.filter((p) => p.category === selectedCategory);

    const handleAdd = (product) => {
        const size = selectedSizes[product.id] || product.sizes[0];
        addToCart(product, size);
        setAddedFeedback((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(
            () => setAddedFeedback((prev) => ({ ...prev, [product.id]: false })),
            1500
        );
    };

    return (
        <main className="max-w-7xl mx-auto px-6 pt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.15em] uppercase text-center mb-2">
                The <span className="text-[#00F0FF] neon-text">Collection</span>
            </h1>
            <p className="text-center text-[#E2E8F0]/70 text-sm mb-10 uppercase tracking-widest">
                Curated for the new avant-garde
            </p>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 text-xs uppercase tracking-[0.2em] border rounded-full transition-all duration-300 ${selectedCategory === cat
                                ? "border-[#00F0FF] text-[#00F0FF] neon-border bg-[#00F0FF]/10"
                                : "border-white/20 text-[#E2E8F0] hover:border-white/60"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden hover:border-[#00F0FF]/50 transition-all duration-500 hover:shadow-neon-glow"
                    >
                        {/* Image placeholder */}
                        <div className="h-64 bg-[#111] flex items-center justify-center relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                            />
                            {/* overlay hover effect */}
                            <div className="absolute inset-0 bg-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-white">
                                    {product.name}
                                </h3>
                                <span className="text-[#00F0FF] font-bold text-lg ml-2">
                                    ${product.price}
                                </span>
                            </div>
                            <p className="text-[#E2E8F0]/60 text-xs mt-1 h-10">
                                {product.description}
                            </p>

                            <div className="mt-3 flex items-center justify-between">
                                {/* Size selector */}
                                <select
                                    className="bg-[#050505] border border-white/20 text-xs uppercase text-[#E2E8F0] p-2 rounded focus:border-[#00F0FF] focus:outline-none"
                                    value={selectedSizes[product.id] || product.sizes[0]}
                                    onChange={(e) =>
                                        setSelectedSizes((prev) => ({
                                            ...prev,
                                            [product.id]: e.target.value,
                                        }))
                                    }
                                >
                                    {product.sizes.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>

                                {/* Add to bag button */}
                                <button
                                    onClick={() => handleAdd(product)}
                                    className={`text-xs uppercase tracking-widest font-bold px-4 py-2 rounded border transition-all duration-300 ${addedFeedback[product.id]
                                            ? "bg-[#00F0FF] text-[#050505] border-[#00F0FF]"
                                            : "border-white/30 text-[#E2E8F0] hover:bg-[#00F0FF] hover:text-[#050505] hover:border-[#00F0FF]"
                                        }`}
                                >
                                    {addedFeedback[product.id] ? "Added ✓" : "Add to Bag"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}