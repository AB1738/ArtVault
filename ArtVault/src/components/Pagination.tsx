import Pagination from '@mui/material/Pagination';
import { useContext } from 'react';
import { ArtContext } from '../contexts/ArtContext';
import { useMediaQuery } from '@mui/material';


const PaginationComponent = () => {
    const context=useContext(ArtContext)
    const handleChange=(event:React.ChangeEvent<unknown>,value:number)=>{
        console.log(event)
        context?.setPage(prevPage=>prevPage=value)
    }
    const isSmallScreen = useMediaQuery('(max-width: 460px)');

  return (
    <Pagination 
    className='pagination-component'
    count={context?.totalPages}         // Total number of pages
    page={context?.page}        // Current page number
    sx={{
        '& .MuiPaginationItem-root': {
          fontWeight:'bold',
          backgroundColor: '#fff', 
          color: '#000', 
          '&:hover': {
            backgroundColor: '#91505d', 
            color:'white'
          },
        },
        '& .Mui-selected': {
          backgroundColor: '#7C444F', 
          color:'black'
        },

  
        
      }}   
       onChange={handleChange}
       size={isSmallScreen ? 'small' : 'large'}  
       
       

  />
  )
}

export default PaginationComponent


