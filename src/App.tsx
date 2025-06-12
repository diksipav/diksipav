import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import Home from "./pages/Home";
import Photography from "./pages/Photography";
import NotFound from "./pages/NotFound";
import Read from "@/pages/Read";
import BlogPost from "./pages/BlogPost";
import Footer from "./components/Footer";
import BgLayout from "./components/BgLayout";

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <BgLayout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/articles" element={<Read />} />
          <Route path="/articles/:title" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BgLayout>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
