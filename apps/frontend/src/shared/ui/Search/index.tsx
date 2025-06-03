import styles from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ searchItem }: { searchItem: string }) => {
  const [searchTerm, setSearchTerm] = useState(searchItem);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={styles["search-section"]}>
      <Input
        className={styles["search-input"]}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Найти в каталоге"
        prefix={
          <SearchOutlined
            className={styles["search-icon"]}
            onClick={handleSearch}
          />
        }
      />
    </div>
  );
};

export default SearchBar;
