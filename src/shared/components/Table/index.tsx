import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table as AntTable, PaginationProps, TablePaginationConfig, TableProps } from "antd";

import NoData from "../NoData";
import { getSortIcon } from "./utils";
import { noData } from "@/constants/noData";
import { parseNumber } from "../../utils/parser";
import { SorterResult, SortOrder } from "antd/lib/table/interface";
import { SharedComponentsConstants } from "src/constants/sharedComponents";

import styles from "./table.module.scss";

interface ITableProps {
  noDataSubHeading?: string;
  isSearch?: boolean;
}

const { DEFAULT_PAGE_SIZE, INITIAL_PAGE_NUMBER } = SharedComponentsConstants;

const Table = <T extends object>({
  scroll,
  loading,
  columns,
  isSearch,
  pagination,
  noDataSubHeading,
  onChange,

  ...props
}: TableProps<T> & ITableProps) => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  const searchQuery = queryString.parse(search);
  const sortColumnKey = searchQuery?.sortColumn;
  const sortOrder = searchQuery?.sortBy as SortOrder;
  const current = parseNumber(searchQuery?.page) || INITIAL_PAGE_NUMBER;
  const [inputPage, setInputPage] = useState<number | string>(current);
  const { total, pageSize: totalPage } = (pagination as TablePaginationConfig) ?? {};

  const pageSize = totalPage ? totalPage : DEFAULT_PAGE_SIZE;
  const totalPages = useMemo(() => (total ? Math.ceil(total / pageSize) : 0), [total, pageSize]);

  const handlePageChange: PaginationProps["onChange"] = (page, pageSize) => {
    const pageChangeParams = { page, pageSize };
    const updatedParams = { ...searchQuery, ...pageChangeParams };

    // To handle event propagation of table onChange as page change event can't be handled
    setTimeout(() => {
      pagination && pagination.onChange?.(page, pageSize);
      navigate({ pathname, hash, search: queryString.stringify(updatedParams) });
    }, 0);
  };

  const handleSortChange: TableProps<T>["onChange"] = (pagination, filters, sorter, extra) => {
    const { columnKey: sortColumn, order: sortBy } = sorter as SorterResult<T>;

    const sortChangeParams = {
      sortBy: sortBy ?? "",
      sortColumn: sortColumn ? String(sortColumn) : ""
    };
    const updatedParams = { ...searchQuery, ...sortChangeParams };

    onChange?.(pagination, filters, sorter, extra);
    navigate({ pathname, hash, search: queryString.stringify(updatedParams) });
  };

  const memorizedPageChangeHandler = useCallback(handlePageChange, [searchQuery, hash]);
  const memorizedSortChangeHandler = useCallback(handleSortChange, [searchQuery, hash]);

  const updatedColumns = useMemo(() => {
    const modifiedCols = columns?.map((column) => ({
      ...column,
      sortIcon: getSortIcon
    }));

    const modifiedSortOrderCols = modifiedCols?.map((column) => ({
      ...column,
      sortOrder: sortColumnKey === column.key ? sortOrder : undefined
    }));

    return sortColumnKey && sortOrder ? modifiedSortOrderCols : modifiedCols;
  }, [columns, sortColumnKey, sortOrder]);

  useEffect(() => setInputPage(current), [current]);

  return (
    <div className={styles.table}>
      <AntTable
        loading={loading}
        columns={updatedColumns}
        scroll={{ y: "calc(100vh - 56rem)", ...scroll }}
        onChange={memorizedSortChangeHandler}
        pagination={
          pagination !== false && {
            current,
            pageSize,
            onChange: memorizedPageChangeHandler,
            showSizeChanger: false,
            showLessItems: true,
            disabled: total === 0,
            ...pagination
          }
        }
        locale={{
          emptyText: !loading ? (
            <div className={styles.noContentWrapper}>
              <NoData
                heading={isSearch ? noData.table.noMatch : noData.table.empty}
                subheading={noDataSubHeading}
              />
            </div>
          ) : (
            <div className={styles.loading} />
          )
        }}
        {...props}
      />
    </div>
  );
};

export default Table;
