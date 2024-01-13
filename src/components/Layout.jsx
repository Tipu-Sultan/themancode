import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Analytics } from '@vercel/analytics/react';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1 }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                    <title>{title}</title>
                </Helmet>
                <Header/>
                <main style={{ minHeight: "70vh",}}>
                    {children}
                    <Analytics />
                </main>

            </div>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Themancode",
    description: "Portfolio and more",
    keywords: "mern,react,node,mongodb",
    author: "Tipu Sultan",
};

export default Layout;