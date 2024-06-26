import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { TableCell, TableRow } from './ui/table'

export function TableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-4 max-w-10" />
          <Skeleton className="h-4 max-w-10" />
        </TableCell>
        <TableCell>
          <Badge className={`text-xs`} variant="outline">
            <Skeleton className="h-4 max-w-10" />
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="h-4 max-w-10" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-4 max-w-10" />
        </TableCell>
      </TableRow>
    )
  })
}
