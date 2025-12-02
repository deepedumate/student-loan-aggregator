import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ThemeProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from '@/store';

// Layouts
import { EduLoanGuideLayout } from '@/layouts/EduLoanGuideLayout';
import { AILoanPathLayout } from '@/layouts/AILoanPathLayout';

// Pages
import Home from "./pages/Home";
import LoanAggregator from "./pages/LoanAggregator";
import LoanDetails from "./pages/LoanDetails";
import AILoanPath from "./pages/AILoanPath";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ai-loan-path/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Edu Loan Guide Routes with Header/Footer Layout */}
              <Route element={<EduLoanGuideLayout />}>
                <Route path="/loans" element={<LoanAggregator />} />
                <Route path="/loans/:id" element={<LoanDetails />} />
              </Route>

              {/* AI Loan Path Routes with Minimal Layout */}
              <Route element={<AILoanPathLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/ai-loan-path" element={<AILoanPath />} />
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
