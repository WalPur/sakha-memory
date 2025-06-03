import { useSearchPagesQuery, type Page } from "@/entities/page";
import { ROUTES } from "@/shared/constants";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState } from "react";
import styles from "./style.module.css";
import { Link, useSearchParams } from "react-router-dom";
import SearchBar from "@/shared/ui/Search";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useSearchPagesQuery({
    search: searchQuery,
    page: currentPage,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current) {
      setCurrentPage(pagination.current);
    }
  };

  const columns: ColumnsType<Page> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (url: string) => <Link to={`${ROUTES.PAGE}/${url}`}>{url}</Link>,
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <main>
      <SearchBar searchItem={searchQuery} />
      <div className={styles["main-content"]}>
        <Table<Page>
          columns={columns}
          dataSource={data?.results || []}
          rowKey="id"
          loading={isFetching}
          pagination={{
            current: currentPage,
            total: data?.count || 0,
            // showTotal: (total) => `Total ${total} items`,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
        />
      </div>
    </main>
  );
};

export default SearchPage;
