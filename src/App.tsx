import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "next-themes";
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
