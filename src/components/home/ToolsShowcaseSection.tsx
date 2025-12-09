// ToolsShowcaseSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Calculator, Sparkles, ArrowRight, Check } from "lucide-react";

/**
 * Neo-Fintech Tools showcase.
 * Uses card-premium / glass-card aesthetics to match hero.
 */

type Tool = {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  href: string;
  ctaText: string;
  variant: "primary" | "accent";
};

const ToolCard: React.FC<{ tool: Tool; index: number }> = ({ tool, index }) => {
  const isPrimary = tool.variant === "primary";

  return (
    <motion.a
      href={tool.href}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.42 }}
      className="group block transform"
    >
      <div
        className={`h-full p-6 rounded-2xl border border-border transition-shadow duration-300 ${isPrimary ? "card-premium" : "card-featured"} hover:shadow-strong`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${isPrimary ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
            {tool.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">{tool.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{tool.description}</p>

            <ul className="mt-4 space-y-2">
              {tool.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className={`inline-flex items-center gap-2 text-sm font-medium ${isPrimary ? "text-primary" : "text-accent"}`}>
                {tool.ctaText}
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs text-muted-foreground">Free to use</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const ToolsShowcaseSection: React.FC = () => {
  const tools: Tool[] = [
    {
      title: "AI Eligibility Checker",
      description: "Instant AI assessment — find your eligibility before applying. No credit impact.",
      features: ["Instant results", "Personalized suggestions", "No credit hit", "Secure & private"],
      icon: <Sparkles className="w-6 h-6" />,
      href: "/resources/tools/ai-loan-eligibility-checker",
      ctaText: "Check Eligibility",
      variant: "primary",
    },
    {
      title: "EMI Calculator",
      description: "Compare repayment plans and optimize for interest savings with multiple scenarios.",
      features: ["Real-time EMI", "Multiple scenarios", "Amortization table", "Export schedule"],
      icon: <Calculator className="w-6 h-6" />,
      href: "/resources/tools/loan-emi-calculator",
      ctaText: "Calculate EMI",
      variant: "accent",
    },
  ];

  return (
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Free Tools</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Smart tools for better decisions</h2>
          <p className="text-lg text-muted-foreground">Use our AI-powered tools to check eligibility and plan repayments with confidence.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <ToolCard key={i} tool={t} index={i} />
          ))}
        </div>
      </div>
  );
};

export default ToolsShowcaseSection;
