import clsx from "clsx";
import { debounce } from "lodash";
import queryString from "query-string";
import { ChangeEvent, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SearchFile from "src/assets/icons/search.svg";
import { SharedComponentsConstants } from "src/constants/sharedComponents";

import styles from "./searchField.module.scss";
import { Input } from "antd";
import Icon from "../Icon";
import { ICON } from "@/enums/icon.enum";

const { SEARCH_PLACEHOLDER, SEARCH_DEBOUNCE_TIME } = SharedComponentsConstants;

interface SearchComponentProps {
  className?: string;
  searchValue?: string;
  placeholder?: string;
  updateLocationParams?: boolean;
  onSearch?: (searchValue: string) => void;
  setSearchValue?: (searchValue: string) => void;
}

const SearchField = ({
  searchValue,
  placeholder,
  className,
  onSearch,
  updateLocationParams = true
}: SearchComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: once Table will be added
  const handleSearch = useCallback(
    (searchText: string) => {
      onSearch?.(searchText);

      if (updateLocationParams) {
        const parsed = queryString.parse(location.search);
        const newQuery = { ...parsed, search: searchText } as queryString.ParsedQuery;

        // Reset pagination when searching
        if (newQuery.page) newQuery.page = "1";

        navigate({
          pathname: location.pathname,
          hash: location.hash,
          search: queryString.stringify(newQuery)
        });
      }
    },
    [location, navigate, onSearch, updateLocationParams]
  );

  const debounceSearchHandler = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        handleSearch(event.target.value);
      }, SEARCH_DEBOUNCE_TIME),
    [handleSearch]
  );

  return (
    <div className={styles.searchWrapper}>
      <Input
        allowClear={{
          clearIcon: <Icon fill isSymbol name={ICON.CLOSE} className="closeIcon" />
        }}
        defaultValue={searchValue}
        className={clsx(styles.searchComponent, className)}
        placeholder={placeholder ?? SEARCH_PLACEHOLDER}
        onChange={debounceSearchHandler}
        prefix={<img className="mr-2" src={SearchFile} alt="Search Icon" />}
      />
    </div>
  );
};

export default SearchField;
