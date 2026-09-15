import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import PastEvents from "@/pages/PastEvents";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Toaster theme="dark" richColors position="top-right" />
                <Routes>
                    <Route path="/" element={<Layout><Home /></Layout>} />
                    <Route path="/eventi" element={<Layout><Events /></Layout>} />
                    <Route path="/eventi/passati" element={<Layout><PastEvents /></Layout>} />
                    <Route path="/eventi/:id" element={<Layout><EventDetail /></Layout>} />
                    <Route path="/news" element={<Layout><Blog /></Layout>} />
                    <Route path="/news/:slug" element={<Layout><BlogDetail /></Layout>} />
                    <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
                    <Route path="/il-club" element={<Layout><About /></Layout>} />
                    <Route path="/contatti" element={<Layout><Contact /></Layout>} />
                    <Route path="/shop" element={<Layout><Shop /></Layout>} />
                    <Route path="/shop/:id" element={<Layout><ProductDetail /></Layout>} />
                    <Route path="/payment/success" element={<Layout><PaymentSuccess /></Layout>} />
                    <Route path="/payment/cancel" element={<Layout><PaymentCancel /></Layout>} />
                    <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
                    <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
                    <Route path="*" element={<Layout><div className="max-w-4xl mx-auto px-4 py-32 text-center"><h1 className="text-5xl font-black">404</h1><p className="text-white/60 mt-4">Pagina non trovata</p></div></Layout>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
