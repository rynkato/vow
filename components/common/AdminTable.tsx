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
/* eslint-disable import/named */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, ChevronDown, Send } from "lucide-react";
import { useInView } from "react-intersection-observer";

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
import { AQIELA_MESSAGE, MESSAGE_STATUS, SYED_MESSAGE } from "@/lib/config";
import { encode } from "@/lib/encoding";

export function AdminTable({ data, setData }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { ref, inView } = useInView();

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
        const { id, uuid, phone_number, type, quantity } = row.original;

        const handleSendMessage = async () => {
          try {
            await updateMessageStatus(uuid, MESSAGE_STATUS.SENT);
            setData((prevData: any) =>
              prevData.map((item: any) =>
                item.uuid === uuid
                  ? { ...item, message_status: MESSAGE_STATUS.SENT }
                  : item,
              ),
            );
          } catch (error) {
            // console.error("Failed to update message status:", error);
          }
        };

        return (
          <a
            href={`https://api.whatsapp.com/send?phone=${phone_number}&text=${encodeURIComponent(type === "Aqiela" ? AQIELA_MESSAGE(encode(id), quantity) : SYED_MESSAGE(encode(id)))}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              aria-label="Send"
              variant="outline"
              onClick={handleSendMessage}
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
      <div className="flex flex-col md:flex-row items-center py-4 gap-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter type..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:ml-auto w-full md:w-auto">
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
      <div ref={ref} className="rounded-md border mb-[60px]">
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
      <AnimatePresence>
        {inView && (
          <motion.div
            className="flex items-center justify-end space-x-2 fixed w-full left-0 px-8 py-4 bg-white border-t-2"
            animate={{ bottom: [-70, 0] }}
            exit={{ bottom: [0, -70] }}
          >
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()} pages.
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
