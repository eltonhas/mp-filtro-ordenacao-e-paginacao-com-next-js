import FilterDropdown from '@/components/filter-dropdown'
import OrdersTable from '@/components/orders-table'
import Pagination from '@/components/pagination'
import SearchInput from '@/components/search-input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProducts } from '@/lib/api'

interface HomeProps {
  searchParams: {
    page: string
    status: string
    search: string
    sortValor: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page === undefined ? '1' : searchParams.page
  const status = searchParams.status
  const search = searchParams.search
  const sortValor =
    searchParams.sortValor === undefined || searchParams.sortValor === 'asc'
      ? '-'
      : ''

  const { orders } = await getProducts({
    page,
    status,
    search,
    sortValor,
  })

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex gap-4 pt-10">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          {orders.data.length !== 0 ? (
            <>
              <OrdersTable orders={orders.data} />
              <div className="mt-8">
                <Pagination links={orders.links} meta={orders.meta} />
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <p>Nenhuma registro encontrado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
