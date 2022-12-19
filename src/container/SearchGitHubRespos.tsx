import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import Debounce from "../CustomHooks/Debounce";
import { getRepos } from "../helpers/Parsers";
import Loader from "./../components/Loader";
import RepoListing from "./../components/RepoListing";
import "./index.css";
import { Pagination, TextField } from '@mui/material'

const SearchGitHubRespos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = Debounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      handleSearch(debouncedSearchTerm, perPage, currentPage);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchTerm, perPage, currentPage]);

  const getSearchValue = (query: string) => {
    setSearchTerm(query);
  };

  const handleSearch = async (query: any, per_page: number, page: number) => {
    getRepos(query, per_page, page).then((repos) => {
      setResults(repos);
      setLoading(false);
    });
  };

  const changeCurrentPageHandler = (e: any, val: number) => {
    setCurrentPage(val);
  };

  const changePerPageHandler = (e: any ) => {
    setPerPage(e.target.value)
  }

  return (
    <div className="container">
      <h2>GitHub Repository Finder</h2>
      <SearchForm onSearch={getSearchValue} />
      <TextField
        id="per-page"
        className="perpage"
        label="per_page"
        value={perPage}
        onChange={changePerPageHandler}
      />
      {results.length > 0 ? (
        <div>
          <RepoListing listing={results} />
          <Pagination
            className="repolist"
            count={20}
            page={currentPage}
            onChange={changeCurrentPageHandler}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      ) : (
        <div className="repo-text">
          No Repositpory Found
        </div>
      )}
      <Loader loading={loading} />
    </div>
  );
};

export default SearchGitHubRespos;
