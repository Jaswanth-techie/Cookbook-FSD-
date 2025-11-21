import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, filterCuisine, setFilterCuisine, cuisines, sortBy, setSortBy }) => {
    return (
        <div className="relative z-10 mb-12">
            <div className="bg-surface border border-black/5 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="text-textMuted group-focus-within:text-primary transition-colors" size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent text-textMain placeholder-textMuted/50 focus:outline-none rounded-xl transition-all"
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative min-w-[160px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={16} className="text-secondary" />
                        </div>
                        <select
                            value={filterCuisine}
                            onChange={(e) => setFilterCuisine(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-surfaceHighlight/30 hover:bg-surfaceHighlight/50 text-textMain border-none rounded-xl focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer transition-colors text-sm font-medium"
                        >
                            <option value="">All Cuisines</option>
                            {cuisines.map((cuisine) => (
                                <option key={cuisine} value={cuisine}>{cuisine}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative min-w-[180px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <ArrowUpDown size={16} className="text-secondary" />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-surfaceHighlight/30 hover:bg-surfaceHighlight/50 text-textMain border-none rounded-xl focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer transition-colors text-sm font-medium"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="time">Prep Time (Low to High)</option>
                            <option value="title">Title (A-Z)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
