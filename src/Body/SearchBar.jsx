import { memo } from "react";

const SearchBar = memo(({term, setSearchTerm}) => {
    
    return(
        <>
        <input 
          type="text" 
          placeholder={ `Search by ${term}` }
          onChange={e => setSearchTerm(e.target.value, term)}
        >
        </input>
        </>
    )
})

export default SearchBar;