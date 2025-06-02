import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer";
import styles from "./styles.module.css";
import { useGetNavigationQuery, type INavigation } from "@/entities/navigation";
import { Col, Drawer, Flex, Row } from "antd";
import { useState } from "react";
import ArrowDownIcon from "@/shared/icons/ArrowDownIcon";
import { ROUTES } from "@/shared/constants";

const Layout = () => {
  const { data } = useGetNavigationQuery();

  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<INavigation | null>(null);

  const onClose = () => {
    setOpen(false);
  };
  const Navi = ({ tree }: { tree: INavigation }) => {
    return (
      <Flex vertical style={{ paddingLeft: 10, minWidth: "200px" }}>
        <Link
          onClick={onClose}
          to={`${ROUTES.PAGE}/${tree.id}`}
          className={styles["nav-link"]}
        >
          {tree.name}
        </Link>
        {tree?.children?.map((child) => {
          return (
            <div style={{ paddingLeft: 10, margin: "4px 0" }}>
              <Navi tree={child} />
            </div>
          );
        })}
      </Flex>
    );
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div className={styles.header}>
        <div className={styles.content}>
          <Link to={ROUTES.MAIN} onClick={() => setOpen(false)}>
            <img src="/logo.svg" />
          </Link>
          <Flex className={styles["nav-list"]} wrap gap={16}>
            {data?.map((item) => (
              <div
                key={item.id}
                className={`${styles["nav-item"]} ${
                  activeSection?.id === item.id && open
                    ? styles["nav-item-active"]
                    : ""
                }`}
                onClick={() => {
                  if (activeSection == item || !open) {
                    setOpen(!open);
                  }
                  setActiveSection(item);
                }}
              >
                <div className={styles["nav-item-content"]}>
                  <span
                    className={`${styles.arrowIcon} ${
                      activeSection?.id === item.id && open
                        ? styles.rotated
                        : ""
                    }`}
                  >
                    <ArrowDownIcon />
                  </span>
                  {item.name}
                </div>
              </div>
            ))}
          </Flex>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          background: "#E0E8F0",
        }}
      >
        <Drawer
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          styles={{
            body: {
              background: "#fff",
              color: "#000",
              padding: 0,
            },
          }}
        >
          <div
            style={{
              background: "#fff",
              maxWidth: "1400px",
              margin: "auto",
            }}
          >
            <Row>
              {activeSection?.children?.map((item) => (
                <Col key={item.id} flex="auto">
                  <Navi tree={item} />
                </Col>
              ))}
            </Row>
          </div>
        </Drawer>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
