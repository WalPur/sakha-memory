import styles from "./styles.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <div style={{ fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    Скачать PDF версию каталога
                    <span style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M4.66667 6.66667L8 10M8 10L11.3333 6.66667M8 10V2"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </div>
                <div style={{ fontSize: "12px" }}>2025 Сводный каталог якутской книги</div>
            </div>
        </div>
    );
};

export default Footer;
