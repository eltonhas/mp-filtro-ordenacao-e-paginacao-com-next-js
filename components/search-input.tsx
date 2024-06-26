'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'

import { Input } from '@/components/ui/input'

import { Button } from './ui/button'

const inputSchema = z.object({
  search: z.string().min(1, { message: 'Preencha o campo de busca.' }),
})

type InputSchemaProps = z.infer<typeof inputSchema>

export default function SearchInput() {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputSchemaProps>({
    resolver: zodResolver(inputSchema),
  })

  const handleForm = useDebouncedCallback(({ search }: InputSchemaProps) => {
    router.push(pathName + '?' + createQueryString('search', search))
  }, 1000)

  // function handleSearch({ search }: InputSchemaProps) {
  //   router.push(pathName + '?' + createQueryString('search', search))
  // }

  function handleClearSearch() {
    reset({ search: '' })
    router.push(pathName)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(handleForm)}>
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Busque por nome..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            {...register('search')}
          />
        </div>
        {errors.search && (
          <p className="text-xs font-semibold text-red-500 dark:text-red-400">
            {errors.search.message}
          </p>
        )}
      </div>
      <Button
        variant={'ghost'}
        type="button"
        className="text-sm"
        onClick={handleClearSearch}
      >
        Limpar Busca
      </Button>
    </form>
  )
}
