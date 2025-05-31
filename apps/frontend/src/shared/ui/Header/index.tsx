import { useGetNavigationQuery } from "@/entities/navigation";

import styles from "./styles.module.css";
import ArrowDownIcon from "@/shared/icons/ArrowDownIcon";
import { Drawer } from "antd";
import { useState } from "react";

const Header = () => {
    const { data } = useGetNavigationQuery();

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div>
                    <img src="./logo.svg" />
                </div>
                {data?.map((item) => (
                    <div key={item.id} className={styles["nav-item"]} onMouseEnter={showDrawer}>
                        <span>
                            <ArrowDownIcon />
                        </span>
                        {item.name}
                    </div>
                ))}
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                >
                    <p>Some contents...</p>
                </Drawer>
                <div></div>
            </div>
        </div>
    );
};

export default Header;
