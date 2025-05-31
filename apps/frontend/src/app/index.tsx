import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { ConfigProvider, theme, type ThemeConfig } from "antd";
import ru_RU from "antd/locale/ru_RU";
import router from "./router";

function App() {
    const mytheme: ThemeConfig = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorBgContainer: "#1D232C",
            colorTextBase: "#FFF",
            colorPrimary: "#5865F2",
        },
    };
    return (
        <Provider store={setupStore}>
            <ConfigProvider locale={ru_RU} theme={mytheme}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </Provider>
    );
}

export default App;
