// pages/_app.js
import "@/styles/globals.css"; // Import your global CSS file
import React from "react";
import { useRouter } from "next/router";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "@/components/layout";
import useBearStore from "@/store/useBearStore";
import Head from "next/head";
import { Backdrop, CircularProgress } from "@mui/material";
import BackgroundAudio from "@/components/BackgroundAudio"; // Import your BackgroundAudio component

// Create a custom theme with your desired font
const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: 'FC Knomphing, sans-serif', // Use your custom font here
  },
});

export default function App({ Component, pageProps, props }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const setAppName = useBearStore((state) => state.setAppName);
  const pageName = router.pathname;
  React.useEffect(() => {
    console.log("App load", pageName, router.query);
    setLoading(true);
    setAppName("Phi Sadud");
    setLoading(false);
  }, [router, setAppName]);

  return (
    <React.Fragment>
      <Head>
        <title>Application</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppCacheProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <BackgroundAudio /> {/* Include BackgroundAudio for persistent background sound */}
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppCacheProvider>
    </React.Fragment>
  );
}
