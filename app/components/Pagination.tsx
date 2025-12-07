import { ArrowLeft, ArrowRight } from 'lucide-react';

interface  PaginationProps {
  goToPage: (page: number) => void;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
const Pagination = ({goToPage , totalItems , totalPages , currentPage}: PaginationProps) => {
  return (
    <div className='flex mt-2'> 
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex justify-center items-center px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600'}`}
        >
            <ArrowLeft  />
        </button>

        <div>
             {Array.from({ length:totalPages}, (_, i) => i + 1).map((p) => (
                <button 
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`mx-1 px-3 py-1 rounded ${p === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}  
                  >{p}</button>))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex justify-center items-center px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600'}`}
        >
            <ArrowRight />
        </button>
    </div>
  )
}

export default Pagination