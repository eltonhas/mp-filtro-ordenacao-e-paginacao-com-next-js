interface Link {
  url: null | string
  label: string
  active: boolean
}

export interface Links {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  order_date: string
  amount_in_cents: number
  status: string
  created_at: string
  updated_at: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Orders {
  data: Order[]
  links: Links
  meta: Meta
}
