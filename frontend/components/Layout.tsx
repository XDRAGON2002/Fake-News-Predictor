import NavDrawer from "./NavDrawer";
import Head from "next/head";
const Layout = () => {
    return (
        <>
            <Head>
                <title>
                    Fake News Predictor
                </title>
                <link rel="manifest" href="/manifest.json" />                 
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div data-testid="layout">
                <NavDrawer/>
            </div>
        </>
    );
};

export default Layout;
