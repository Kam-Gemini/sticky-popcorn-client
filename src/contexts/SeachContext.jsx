import { createContext, useState } from 'react'

const SearchContext = createContext('')

function SearchProvider({ children }){
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  return (
      <SearchContext.Provider value={{ searchTerm, setSearchTerm, handleSearch }}>
      { children }
      </SearchContext.Provider>
  )
}

export { SearchContext, SearchProvider }