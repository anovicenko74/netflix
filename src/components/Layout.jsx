import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
    return (

        <div style={
            {
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: '100%',
            }
        }>
            <Header></Header>
            <main style={{
                flex: '1 1 auto', //background: theme.palette.primary.main 
            }}>
                <Outlet />
            </main>
            <Footer
                style={{
                    flex: '1 1 auto'
                }}
            ></Footer>
        </div>
    )
}

export default Layout