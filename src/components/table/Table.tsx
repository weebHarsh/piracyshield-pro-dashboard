'use client';

import { useState, useMemo, useEffect, useRef } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'number' | 'text';
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onRowSelect?: (selectedIds: Set<string>) => void;
  getRowId: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  pageSize?: number;
  'aria-label'?: string;
}

export function Table<T extends object>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search...',
  selectable = false,
  onRowSelect,
  getRowId,
  onRowClick,
  emptyMessage = 'No data available',
  pageSize = 15,
  'aria-label': ariaLabel,
}: TableProps<T>) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 300);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [searchInput]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortKey];
      const bValue = (b as Record<string, unknown>)[sortKey];
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortKey, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === sortedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.(new Set());
    } else {
      const allIds = new Set(sortedData.map(getRowId));
      setSelectedRows(allIds);
      onRowSelect?.(allIds);
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: T) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRowClick?.(item);
    }
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-3">
          <div className="relative">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={searchPlaceholder}
              className={[
                'w-full px-3 py-1.5 pl-9',
                'bg-[var(--surface-2)] border border-[var(--border)]',
                'rounded-lg text-sm text-[var(--text)]',
                'placeholder:text-[var(--text-subtle)]',
                'focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]',
                'transition-colors duration-[var(--dur-ui-fast)]',
              ].join(' ')}
              aria-label="Search table"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-subtle)]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
        <table className="w-full" role="grid" aria-label={ariaLabel || 'Data table'}>
          <thead className="border-b border-[var(--border)] bg-[var(--surface-2)]">
            <tr>
              {selectable && (
                <th className="px-3 py-2 w-10" scope="col">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedData.length && sortedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-3.5 h-3.5 rounded border-[var(--border)] accent-[var(--brand)]"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={[
                    'px-3 py-2 text-xs font-medium uppercase tracking-wide',
                    'text-[var(--text-subtle)]',
                    column.sortable ? 'cursor-pointer select-none hover:text-[var(--text-muted)]' : '',
                    column.width ?? '',
                  ].join(' ')}
                  style={{ textAlign: column.align ?? 'left' }}
                  scope="col"
                  aria-sort={
                    sortKey === String(column.key)
                      ? sortOrder === 'asc' ? 'ascending' : 'descending'
                      : 'none'
                  }
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="inline-flex items-center gap-1.5"
                      aria-label={`Sort by ${column.header}`}
                    >
                      {column.header}
                      <span className="text-[var(--text-subtle)]">
                        {sortKey === String(column.key) ? (
                          sortOrder === 'asc' ? (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )
                        ) : (
                          <svg className="w-3 h-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-[var(--surface)] divide-y divide-[var(--border)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-10 text-center text-sm text-[var(--text-subtle)]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const rowId = getRowId(item);
                const isSelected = selectedRows.has(rowId);

                return (
                  <tr
                    key={rowId}
                    onClick={() => onRowClick?.(item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    className={[
                      'transition-colors duration-[var(--dur-ui-fast)]',
                      onRowClick ? 'cursor-pointer hover:bg-[var(--surface-2)]' : '',
                      isSelected ? 'bg-[var(--brand-dim)]' : '',
                    ].join(' ')}
                    role="row"
                    tabIndex={onRowClick ? 0 : undefined}
                    aria-selected={isSelected}
                  >
                    {selectable && (
                      <td className="px-3 py-1.5 w-10">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-3.5 h-3.5 rounded border-[var(--border)] accent-[var(--brand)]"
                          aria-label={`Select row ${rowId}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className={[
                          'px-3 py-1.5 text-sm text-[var(--text)]',
                          column.type === 'number' ? 'tabular' : '',
                        ].join(' ')}
                        style={{ textAlign: column.align ?? 'left' }}
                      >
                        {column.accessor
                          ? column.accessor(item)
                          : String((item as Record<string, unknown>)[String(column.key)] ?? '')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3">
          <p className="tabular text-xs text-[var(--text-subtle)]">
            {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}
          </p>
          <nav className="flex items-center gap-1" aria-label="Table pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={[
                'px-2.5 py-1 rounded-md border border-[var(--border)] text-xs',
                'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'transition-colors duration-[var(--dur-ui-fast)]',
              ].join(' ')}
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="tabular px-2 py-1 text-xs text-[var(--text-subtle)]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={[
                'px-2.5 py-1 rounded-md border border-[var(--border)] text-xs',
                'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'transition-colors duration-[var(--dur-ui-fast)]',
              ].join(' ')}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
