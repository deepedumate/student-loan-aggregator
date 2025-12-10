import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

// Layouts
import { LoanListLayout } from "@/layouts/LoanListLayout";
import { ChatJourneyLayout } from "@/layouts/ChatJourneyLayout";

// Pages
import Home from "./pages/Home";
import LoanList from "./pages/LoanAggregator";
import LoanDetails from "./pages/LoanDetails";
import ChatJourney from "./pages/AILoanPath";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/chat-journey/ThemeProvider";
import { HomeLayout } from "./layouts/HomeLayout";
import Login from "./pages/Login";
import StudentLayout from "./layouts/StudentLayout";
import {
  Applications,
  Compare,
  Dashboard,
  Documents,
  Notifications,
  Profile,
} from "./pages/student";
import AboutPage from "./pages/about";
import FAQPage from "./pages/faq";
import PartnerWithUsPage from "./pages/partnerWithUs";
import ContactUsPage from "./pages/contact";
import ShowcaseInterest from "./pages/showcaseInterest";
import StudentLoan from "./pages/studentLoan";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<HomeLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route
                  path="/partner-with-us"
                  element={<PartnerWithUsPage />}
                />
                <Route
                  path="/showcase-interest"
                  element={<ShowcaseInterest />}
                />
                <Route path="/student-loan" element={<StudentLoan />} />
              </Route>
              {/* Student Portal Routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
                <Route path="compare" element={<Compare />} />
                <Route path="documents" element={<Documents />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />

                {/* Redirect /student to /student/dashboard */}
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
              <Route path="/login" element={<Login />} />
              {/* Edu Loan Guide Routes with Header/Footer Layout */}
              <Route element={<LoanListLayout />}>
                <Route path="/loan-offers" element={<LoanList />} />
                <Route path="/loan-offers/:id" element={<LoanDetails />} />
              </Route>

              {/* AI Loan Path Routes with Minimal Layout */}
              <Route element={<ChatJourneyLayout />}>
                <Route path="/loan-application" element={<ChatJourney />} />
              </Route>

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
