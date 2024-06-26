'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import type { Links, Meta } from '@/@types/order'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  links: Links
  meta: Meta
}

export default function Pagination({ meta }: PaginationProps) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const page = searchParams.get('page')

  function handleClickPreview() {
    const newPage = Number(page) - 1

    router.push(pathName + '?' + createQueryString('page', String(newPage)))
  }

  function handleClickNext() {
    let newPage

    if (page !== null) {
      newPage = Number(page) + 1
    } else {
      newPage = Number(page) + 2
    }

    router.push(pathName + '?' + createQueryString('page', String(newPage)))
  }

  function handleClick(page: string) {
    router.push(pathName + '?' + createQueryString('page', String(page)))
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        {page === '1' || page === null ? null : (
          <PaginationItem>
            <PaginationPrevious
              onClick={handleClickPreview}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        {meta.links.map((item) => {
          if (
            item.label !== '...' &&
            !item.label.includes('Anterior') &&
            !item.label.includes('Próximo')
          ) {
            return (
              <PaginationItem
                className="hidden md:inline-flex"
                key={item.label}
              >
                <PaginationLink
                  isActive={item.label === page}
                  className="cursor-pointer"
                  onClick={() => handleClick(item.label)}
                >
                  {item.label}
                </PaginationLink>
              </PaginationItem>
            )
          }

          if (item.label === '...') {
            return (
              <PaginationItem
                className="hidden md:inline-flex"
                key={item.label}
              >
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return null
        })}

        {page !== String(meta.last_page) && (
          <PaginationItem>
            <PaginationNext
              onClick={handleClickNext}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationComponent>
  )
}
