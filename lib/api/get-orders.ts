import type { Orders } from '@/@types/order'

const BASE_URL = 'https://apis.codante.io/api/orders-api/orders'

interface GetProductsQuery {
  page?: string | null
  status?: string | null
  search?: string | null
  sortValor?: string | null
}

export async function getProducts({
  page,
  status,
  search,
  sortValor,
}: GetProductsQuery) {
  let response
  if (status && search && sortValor) {
    response = await fetch(
      `${BASE_URL}?status=${status}&search=${search}&sort=${sortValor}amount_in_cents`,
    )
  } else if (status && sortValor) {
    response = await fetch(
      `${BASE_URL}?status=${status}&sort=${sortValor}amount_in_cents`,
    )
  } else if (search && sortValor) {
    response = await fetch(
      `${BASE_URL}?search=${search}&sort=${sortValor}amount_in_cents`,
    )
  } else if (sortValor) {
    response = await fetch(`${BASE_URL}?sort=${sortValor}amount_in_cents`)
  } else if (status) {
    response = await fetch(`${BASE_URL}?page=${page}&status=${status}`)
  } else if (search) {
    response = await fetch(`${BASE_URL}?page=${page}&search=${search}`)
  } else {
    response = await fetch(`${BASE_URL}?page=${page}`)
  }

  const orders: Orders = await response.json()

  return { orders }
}
