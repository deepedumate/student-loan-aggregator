import { useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, DollarSign, Users } from "lucide-react";
import { validateEmail, validatePhone } from "@/lib/helper/studentLoanHelper";
import { StudentProfile } from "@/types/studentLoanType";
import {
  COUNTRIES,
  EDUCATION_LEVELS,
  POPULAR_COURSES,
  POPULAR_UNIVERSITIES,
} from "@/data/mockData";

interface ProfileStageProps {
  onComplete: (profile: StudentProfile) => void;
  initialData?: StudentProfile | null;
}

export function ProfileStage({ onComplete, initialData }: ProfileStageProps) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    educationLevel: (initialData?.educationLevel || "postgraduate") as
      | "undergraduate"
      | "postgraduate"
      | "doctorate",
    targetCountry: initialData?.targetCountry || "",
    course: initialData?.course || "",
    university: initialData?.university || "",
    courseFee: initialData?.courseFee?.toString() || "",
    requestedAmount: initialData?.requestedAmount?.toString() || "",
    coApplicantAvailable: initialData?.coApplicantAvailable || false,
    coApplicantIncome: initialData?.coApplicantIncome?.toString() || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.length < 3 ? "Name must be at least 3 characters" : "";
      case "email":
        return !validateEmail(value) ? "Invalid email address" : "";
      case "phone":
        return !validatePhone(value) ? "Invalid phone number (10 digits)" : "";
      case "dateOfBirth":
        return !value ? "Date of birth is required" : "";
      case "targetCountry":
        return !value ? "Please select a country" : "";
      case "course":
        return value.length < 3 ? "Course name is required" : "";
      case "university":
        return value.length < 3 ? "University name is required" : "";
      case "courseFee":
        return !value || Number(value) < 100000
          ? "Valid course fee is required"
          : "";
      case "requestedAmount":
        return !value || Number(value) < 100000
          ? "Valid loan amount is required"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(
      name,
      formData[name as keyof typeof formData].toString()
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "coApplicantIncome" || formData.coApplicantAvailable) {
        const error = validateField(
          key,
          formData[key as keyof typeof formData].toString()
        );
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      return;
    }

    const profile: StudentProfile = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      educationLevel: formData.educationLevel,
      targetCountry: formData.targetCountry,
      course: formData.course,
      university: formData.university,
      courseFee: Number(formData.courseFee),
      requestedAmount: Number(formData.requestedAmount),
      coApplicantAvailable: formData.coApplicantAvailable,
      coApplicantIncome: formData.coApplicantIncome
        ? Number(formData.coApplicantIncome)
        : undefined,
    };

    onComplete(profile);
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Header */}
      <motion.div
        className="text-left lg:text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {initialData && (
          <motion.div
            className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <span>✏️</span>
            <span className="text-primary">Editing Your Profile</span>
          </motion.div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          {initialData ? "Update Your Information" : "Let's Start Your Journey"}
        </h2>
        <p className="text-muted-foreground">
          {initialData
            ? "Make any changes needed and continue"
            : "Tell us about yourself and your study plans"}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <motion.div
          className="glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <User className="w-5 h-5 text-primary" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <motion.input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={() => handleBlur("fullName")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.fullName && touched.fullName
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="John Doe"
                whileFocus={{ scale: 1.01 }}
              />
              {errors.fullName && touched.fullName && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.email && touched.email
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="john@example.com"
                whileFocus={{ scale: 1.01 }}
              />
              {errors.email && touched.email && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.phone && touched.phone
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="9876543210"
                whileFocus={{ scale: 1.01 }}
              />
              {errors.phone && touched.phone && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date of Birth *
              </label>
              <motion.input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={() => handleBlur("dateOfBirth")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.dateOfBirth && touched.dateOfBirth
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                whileFocus={{ scale: 1.01 }}
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.dateOfBirth}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Education Details */}
        <motion.div
          className="glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <GraduationCap className="w-5 h-5 text-accent" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">
              Education Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Education Level *
              </label>
              <motion.select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                whileFocus={{ scale: 1.01 }}
              >
                {EDUCATION_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </motion.select>
            </div>

            {/* Target Country */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Target Country *
              </label>
              <motion.select
                name="targetCountry"
                value={formData.targetCountry}
                onChange={handleChange}
                onBlur={() => handleBlur("targetCountry")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.targetCountry && touched.targetCountry
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                whileFocus={{ scale: 1.01 }}
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.flag} {country.label}
                  </option>
                ))}
              </motion.select>
              {errors.targetCountry && touched.targetCountry && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.targetCountry}
                </motion.p>
              )}
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Course/Program *
              </label>
              <motion.input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                onBlur={() => handleBlur("course")}
                list="courses"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.course && touched.course
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="e.g., Computer Science"
                whileFocus={{ scale: 1.01 }}
              />
              <datalist id="courses">
                {POPULAR_COURSES.map((course) => (
                  <option key={course} value={course} />
                ))}
              </datalist>
              {errors.course && touched.course && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.course}
                </motion.p>
              )}
            </div>

            {/* University */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                University *
              </label>
              <motion.input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                onBlur={() => handleBlur("university")}
                list="universities"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.university && touched.university
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="e.g., Harvard University"
                whileFocus={{ scale: 1.01 }}
              />
              <datalist id="universities">
                {POPULAR_UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni} />
                ))}
              </datalist>
              {errors.university && touched.university && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.university}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Financial Information */}
        <motion.div
          className="glass-card p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <DollarSign className="w-5 h-5 text-success" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground">
              Financial Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Fee */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Course Fee (₹) *
              </label>
              <motion.input
                type="number"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                onBlur={() => handleBlur("courseFee")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.courseFee && touched.courseFee
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="5000000"
                whileFocus={{ scale: 1.01 }}
              />
              {errors.courseFee && touched.courseFee && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.courseFee}
                </motion.p>
              )}
            </div>

            {/* Requested Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Requested Loan Amount (₹) *
              </label>
              <motion.input
                type="number"
                name="requestedAmount"
                value={formData.requestedAmount}
                onChange={handleChange}
                onBlur={() => handleBlur("requestedAmount")}
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
                  bg-background text-foreground placeholder:text-muted-foreground
                  focus:outline-none focus:ring-4 focus:ring-primary/20
                  ${
                    errors.requestedAmount && touched.requestedAmount
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }
                `}
                placeholder="4000000"
                whileFocus={{ scale: 1.01 }}
              />
              {errors.requestedAmount && touched.requestedAmount && (
                <motion.p
                  className="text-destructive text-xs mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.requestedAmount}
                </motion.p>
              )}
            </div>
          </div>

          {/* Co-Applicant Checkbox */}
          <motion.div className="mt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="coApplicantAvailable"
                checked={formData.coApplicantAvailable}
                onChange={handleChange}
                className="w-5 h-5 text-primary rounded border-border focus:ring-4 focus:ring-primary/20 transition-all"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                I have a co-applicant (parent/guardian) with stable income
              </span>
            </label>
          </motion.div>

          {/* Co-Applicant Income */}
          {formData.coApplicantAvailable && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Co-applicant Annual Income (₹)
              </label>
              <motion.input
                type="number"
                name="coApplicantIncome"
                value={formData.coApplicantIncome}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholder="600000"
                whileFocus={{ scale: 1.01 }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This helps improve your loan eligibility
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.button
            type="submit"
            className="relative px-12 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 overflow-hidden group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">
              {initialData ? "Update & Continue" : "Check My Eligibility"}
            </span>
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}
