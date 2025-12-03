import logo from "@/assets/edumate-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-6",
  md: "h-8",
  lg: "h-12",
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Edumate Global"
      className={`${sizeMap[size]} w-auto ${className}`}
    />
  );
}
