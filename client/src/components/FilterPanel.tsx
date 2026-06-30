
const FilterPanel = ({categories , category, minPrice ,maxPrice,updateFilter ,hasFilters ,clearFilters} :any) => {
    const categoriesWithAll = [{slug:"" , name:"All Categories"}, ...categories ]
  return (
    <div className="space-y-6">
        {/* categories */}
        <div >
            <h3 className="text-sm font-semibold text-app-green mb-3">categories</h3>
            <div className="space-y-1.5">{categoriesWithAll.map((cat:any)=>(
                <button key={cat.slug} 
                onClick ={()=> updateFilter( "category" , cat.slug )}
                className={` block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${category=== cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"} `}>
                    {cat.name}
                </button>
            ))}</div>
        </div>
        <div>
            <h3 className="text-sm font-semibold text-app-green mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" value={minPrice} onChange={(e)=>updateFilter('minPrice', e.target.value)} className="w-full px-3 py-2 bg-white rounded-lg border not-focus:border-app-border" />
                <span> - </span>
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e)=>updateFilter('maxPrice', e.target.value)} className="w-full bg-white px-3 py-2  rounded-lg border not-focus:border-app-border" />
            </div>
        </div>
        {hasFilters && (
            <button onClick={clearFilters} className="w-full  px-3 py-2 bg-red-50 text-app-error rounded-lg hover:bg-red-100   ">
                Clear Filter
            </button>
        )}
    </div>
  )
}

export default FilterPanel
