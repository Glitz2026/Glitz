import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import PrivateEvents from "@/pages/PrivateEvents";
import Account from "@/pages/Account";
import Login from "@/pages/Login";
import AdminLayout from "@/components/AdminLayout";
import AuthCallback from "@/pages/AuthCallback";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContactProvider } from "@/context/ContactContext";
import CartDrawer from "@/components/CartDrawer";

function AppRouter() {
    const location = useLocation();
    // CRITICAL: Detect OAuth callback synchronously during render (not in useEffect).
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    if (location.hash?.includes("session_id=")) {
        return <AuthCallback />;
    }
    return (
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
            <Route path="/prenota-evento" element={<Layout><PrivateEvents /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/shop/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/payment/success" element={<Layout><PaymentSuccess /></Layout>} />
            <Route path="/payment/cancel" element={<Layout><PaymentCancel /></Layout>} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/accedi" element={<Layout><Login /></Layout>} />
            <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="*" element={<Layout><div className="max-w-4xl mx-auto px-4 py-32 text-center"><h1 className="text-5xl font-black">404</h1><p className="text-white/60 mt-4">Pagina non trovata</p></div></Layout>} />
        </Routes>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <ContactProvider>
                        <LanguageProvider>
                            <CartProvider>
                                <Toaster theme="dark" richColors position="top-right" />
                                <AppRouter />
                                <CartDrawer />
                            </CartProvider>
                        </LanguageProvider>
                    </ContactProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
