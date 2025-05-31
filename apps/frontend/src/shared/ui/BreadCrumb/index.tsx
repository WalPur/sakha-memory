import { ROUTES } from "@/shared/constants";
import ArrowRightIcon from "@/shared/icons/ArrowRightIcon";
import { Space } from "antd";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }: { items: { id: number; title: string }[] }) => {
    return (
        <div>
            <Space
                split={<ArrowRightIcon />}
                align="baseline"
                styles={{
                    item: {
                        color: "#555555",
                        fontSize: "16px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        lineHeight: "20px",
                        margin: "auto",
                        opacity: 0.5,
                    },
                }}
                style={{ height: "20px" }}
            >
                {[...items].reverse().map((item, index) => (
                    <div key={item.id}>
                        {items.length === index + 1 ? (
                            <div
                                style={{
                                    color: "#555",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {item.title}
                            </div>
                        ) : (
                            <div
                                style={{ textOverflow: "ellipsis", maxWidth: "300px", overflow: "hidden" }}
                                title={item.title}
                            >
                                <Link
                                    to={`${ROUTES.PAGE}/${item.id}`}
                                    style={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        maxWidth: 300,
                                        width: "100%",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {item.title}
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </Space>
        </div>
    );
};

export default BreadCrumb;
