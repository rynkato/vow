import * as React from "react";

/* eslint-disable import/named */
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
/* eslint-enable import/named */
import { ArrowUpDown, ChevronDown, Send } from "lucide-react";

import { updateMessageStatus } from "@/api/updateMessageStatus";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MESSAGE_STATUS } from "@/lib/config";

export function AdminTable({ data, setData }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<{
    uuid: string;
    name: string;
    phone_number: string;
    quantity: number;
    quantity_confirmed: number;
    response: string;
    message_status: string;
    type: string;
  }>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("phone_number")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "quantity_confirmed",
      header: "Quantity Confirmed",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("quantity_confirmed")}</div>
      ),
    },
    {
      accessorKey: "response",
      header: "Response",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("response")}</div>
      ),
    },
    {
      accessorKey: "message_status",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => (
        <div className="capitalize px-4">{row.getValue("message_status")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      id: "send_message",
      cell: ({ row }: any) => {
        const { uuid, phone_number } = row.original;

        return (
          <a
            href={`https://web.whatsapp.com/${phone_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              aria-label="Send"
              variant="outline"
              onClick={() => {
                updateMessageStatus(uuid, MESSAGE_STATUS.SENT);
                setData((prevData: any) =>
                  prevData.map((item: any) =>
                    item.uuid === uuid
                      ? { ...item, message_status: MESSAGE_STATUS.SENT }
                      : item,
                  ),
                );
              }}
            >
              <Send />
            </Button>
          </a>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id
                      .split("_")
                      .map(
                        (word: any) =>
                          word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
