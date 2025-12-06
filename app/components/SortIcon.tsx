import { ChevronUp } from 'lucide-react'
import { Coin } from '../api/api'

const SortIcon = ({
  column,
  sortConfig,
}: {
  column: keyof Coin
    sortConfig: { key: keyof Coin | null; direction: 'asc' | 'desc' }
}) => {
  const isActive = sortConfig.key === column
  return (
    <span
      className={`   ml-1 inline-block transition-transform ${
        isActive ? 'text-white' : 'text-gray-400'
      }  ${isActive && sortConfig.direction === 'desc' ? 'rotate-180' : '' }`}
    >
      <ChevronUp size={14} />
    </span>
  )
}

export default SortIcon