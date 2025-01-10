import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function SkeletonTable({ columns = 4, rows = 5 }: { columns?: number; rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array(columns).fill(0).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-[100px]" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(rows).fill(0).map((_, i) => (
          <TableRow key={i}>
            {Array(columns).fill(0).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

