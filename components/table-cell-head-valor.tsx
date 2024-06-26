'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { TableHead } from './ui/table'

export function TableCellHeadValor() {
  const searchParams = useSearchParams()
  const urlSort = searchParams.get('sortValor')

  const [sort, setSort] = useState(urlSort === null ? 'desc' : urlSort)
  const pathName = usePathname()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  function handleSort() {
    if (sort === 'asc') {
      setSort('desc')
      return router.push(
        pathName + '?' + createQueryString('sortValor', 'desc'),
      )
    } else {
      setSort('asc')
      return router.push(pathName + '?' + createQueryString('sortValor', 'asc'))
    }
  }
  return (
    <TableHead
      className="flex cursor-pointer items-center justify-end gap-1 text-right"
      onClick={handleSort}
    >
      Valor
      {sort === 'asc' ? (
        <ChevronUp className="w-4" />
      ) : (
        <ChevronDown className="w-4" />
      )}
    </TableHead>
  )
}
