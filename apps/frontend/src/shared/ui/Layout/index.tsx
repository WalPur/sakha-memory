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

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const Navi = ({ tree }: { tree: INavigation }) => {
        return (
            <div style={{ paddingLeft: 10 }}>
                <Link onClick={onClose} to={`${ROUTES.PAGE}/${tree.id}`} style={{ width: "fit-content" }}>
                    {tree.name}
                </Link>
                {tree?.children?.map((child) => {
                    return (
                        <div style={{ paddingLeft: 10, margin: "4px 0" }}>
                            <Navi tree={child} />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div className={styles.header}>
                <div className={styles.content}>
                    <Link to={ROUTES.MAIN}>
                        <img src="/logo.svg" />
                    </Link>
                    <Row>
                        {data?.map((item) => (
                            <Col span={6} key={item.id} className={styles["nav-item"]} onMouseEnter={showDrawer}>
                                <span>
                                    <ArrowDownIcon />
                                </span>
                                {item.name}
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#E0E8F0" }}>
                <Drawer
                    placement="top"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                    height={"500px"}
                    styles={{ body: { background: "#fff", color: "#000", padding: 0 } }}
                >
                    <div
                        style={{
                            background: "#fff",
                            maxWidth: "1400px",
                            margin: "auto",
                        }}
                    >
                        <Row gutter={16}>
                            {data &&
                                data.map((item) => (
                                    <Col span={6} key={item.id}>
                                        {item.children?.map((citem) => (
                                            <Flex vertical gap={4} key={citem.id}>
                                                <Navi tree={citem} />
                                            </Flex>
                                        ))}
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
