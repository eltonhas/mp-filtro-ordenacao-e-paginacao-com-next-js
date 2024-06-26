import { ChevronsUpDown } from 'lucide-react'

import type { Order } from '@/@types/order'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TableCellHeadValor } from './table-cell-head-valor'
import { TableSkeleton } from './table-skeleton'
import { Badge } from './ui/badge'

interface OrdersTableProps {
  orders: Order[]
}

export default async function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell cursor-pointer items-center justify-end gap-1">
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableCellHeadValor />
        </TableRow>
      </TableHeader>
      <TableBody>
        {!orders && <TableSkeleton />}
        {orders &&
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="font-medium">{order.customer_name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {order.customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {order.order_date}
              </TableCell>
              <TableCell className="text-right">
                {(order.amount_in_cents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
