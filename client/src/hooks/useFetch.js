import { useEffect, useState } from "react";
import axiosClient from "@config/axios";

// Ant Design
import { message } from "antd";

const useFetch = ({ url, skipFetch = false, initialPageSize = 10 }) => {
  /*************** States ***************/
  // Response
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Pagination
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Errors
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /*************** Functions ***************/
  const onChangePagination = (page, pageSize) => {
    if (page) {
      setCurrentPage(page);
    }
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const fetchData = async () => {
    if (skipFetch) return;
    try {
      setIsFetching(true);
      const response = await axiosClient.get(
        `${url}?page=${currentPage}&limit=${pageSize}`
      );
      const { count, totalPages, results } = response.data;

      if (count && totalPages) {
        setData(results);
        setCount(count);
      }

      setData(results);
    } catch (error) {
      setHasError(true);
      if (!error.response) {
        setErrorMessage("Ocurrió un error durante la solicitud");
      } else {
        setErrorMessage(
          `Error: ${error.response.status} ${error.response.statusText}`
        );
      }
    } finally {
      setIsFetching(false);
    }
  };

  /*************** Lifecycle ***************/
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  useEffect(() => {
    hasError && message.error(errorMessage);
    // eslint-disable-next-line
  }, [errorMessage]);

  return {
    fetchData,
    data,
    isFetching,
    count,
    pageSize,
    onChangePagination,
    hasError,
    errorMessage,
  };
};

export default useFetch;
