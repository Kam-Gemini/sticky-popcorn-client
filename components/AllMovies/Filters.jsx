export default function ({ filterBy, setFilterBy, listAllYears }) {
    return (
        <section id="filters">
            <select name="filterBy" value={filterBy} onChange={(event) => {
                const value = event.target.value
                setFilterBy(value === "All" ? "All" : parseInt(value))}
            }>
                <option value="All">All</option>
                {listAllYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </section>
    )
}