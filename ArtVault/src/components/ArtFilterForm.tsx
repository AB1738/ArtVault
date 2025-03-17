import { useState,useContext,FormEvent } from "react"
import { ArtContext } from "../contexts/ArtContext"
import SearchIcon from '@mui/icons-material/Search';
import { MdReadMore } from "react-icons/md";


const ArtFilterForm = () => {
    const context=useContext(ArtContext)
    const [query,setQuery]=useState<string>('')
    const handleSubmit=(e:FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        context?.setArtQuery(query)
        setQuery('')
    }
    const viewAllArt=()=>{
        context?.setArtQuery('')
    }
  return (
    <div className="art-filter-form-container">
        <h3>Search the Art Vault or explore all our collections</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" name="art-search"
             id="art-search" value={query} 
             placeholder="Search for art..."
             onChange={(e)=>setQuery(e.target.value)} />
            <button className="search-btn"><SearchIcon className="search-icon"/></button>
        </form>
        <p>Or, explore everything</p>
        <button onClick={viewAllArt} className="btn">
            <div className="link-content">
                <p>
                     View All
                </p>
                <MdReadMore/>
            </div>
            </button>
    </div>
  )
}

export default ArtFilterForm