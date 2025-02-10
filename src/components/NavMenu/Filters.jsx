export default function ({ filterBy, setFilterBy }) {
    return (
        <section id="filters">
            <select name="filterBy" value={filterBy} onChange={(event) => {
                const value = event.target.value
                setFilterBy(value)}
            }>
                <option value="All">All</option>
                <option  value="1970">1970's</option>
                <option  value="1980">1980's</option>
                <option  value="1990">1990's</option>
                <option  value="2000">2000's</option>
                <option  value="2010">2010's</option>
            </select>
        </section>
    )
}