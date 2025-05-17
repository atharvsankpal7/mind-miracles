'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

interface DataItem {
  id: string;
  firstName: string;
  lastName: string;
  mobileNo: number;
  email: string;
  age: number;
  place: string;
}

export function DataTable({
  data,
  table_name,
}: {
  data: any;
  table_name: string;
}) {
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!data || data.length == 0) {
    return <></>;
  }

  const handleSort = (column: keyof DataItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const renderSortIcon = (column: keyof DataItem) => {
    if (sortColumn !== column)
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <div className="w-full pt-4">
      <h3 className="p-2 text-blue-700 md:text-xl">{table_name}</h3>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableHead key={key} className="bg-blue-100 font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as keyof DataItem)}
                    className="flex items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {renderSortIcon(key as keyof DataItem)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {Object.entries(item).map(([key, value]: any) => (
                  <TableCell key={key}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, sortedData.length)} of{' '}
          {sortedData.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
