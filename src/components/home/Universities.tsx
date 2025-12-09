import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Globe } from "lucide-react";
import axios from "axios";

// Type definitions
interface School {
  school_id: number;
  university: string;
  school_name: string;
  logo_url: string;
  short_name?: string;
  currency?: string;
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  internal_name?: string;
  bsf_tier?: string;
}

interface LocalSchool {
  school_id: number;
  university: string;
  school_name: string;
  logo_file_name: string;
  short_name?: string;
  currency?: string;
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  internal_name?: string;
  bsf_tier?: string;
}

interface ApiSchool extends Omit<School, 'logo_url'> {
  school_logo: string;
  is_a_school: string;
}

interface ApiResponse {
  schools: ApiSchool[];
}

// Utility function to decode HTML entities
const decodeHTMLEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

const UniversityLogosSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [schoolLogos, setSchoolLogos] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isApiDataLoaded, setIsApiDataLoaded] = useState<boolean>(false);

  // Transform local data to unified format
  const transformLocalData = (localSchools: LocalSchool[]): School[] => {
    return localSchools.map((school) => ({
      school_id: school.school_id,
      university: school.university,
      school_name: school.school_name,
      logo_url: school.logo_file_name,
      short_name: school.short_name,
      currency: school.currency,
      city: school.city,
      state: school.state,
      country: school.country,
      region: school.region,
      internal_name: school.internal_name,
      bsf_tier: school.bsf_tier,
    }));
  };

  // Transform API data to unified format
  const transformApiData = (apiSchools: ApiSchool[]): School[] => {
    return apiSchools
      .filter((school) => school.is_a_school === "Yes")
      .map((school) => ({
        school_id: school.school_id,
        university: school.university,
        school_name: school.school_name,
        logo_url: school.school_logo,
        short_name: school.short_name,
        currency: school.currency,
        city: school.city,
        state: school.state,
        country: school.country,
        region: school.region,
        internal_name: school.internal_name,
        bsf_tier: school.bsf_tier,
      }));
  };

  useEffect(() => {
    // Initialize with local data immediately (if you have universityDetails imported)
    // const localData = transformLocalData(universityDetails as LocalSchool[]);
    // setSchoolLogos(localData);

    const fetchSchoolLogos = async () => {
      setLoading(true);

      try {
        const response = await axios.get<ApiResponse>(
          "https://seedglobaleducation.com/api/get/edumate-schools.php",
          {
            headers: {
              Authorization: "Bearer seEd@2024_GLOBAL_token#A1b2C3",
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );

        if (
          response.data &&
          response.data.schools &&
          Array.isArray(response.data.schools)
        ) {
          const transformedData = transformApiData(response.data.schools);

          if (transformedData.length > 0) {
            setSchoolLogos(transformedData);
            setIsApiDataLoaded(true);
            console.log(
              "Schools fetched from API successfully:",
              transformedData.length
            );
          } else {
            console.warn("API returned empty schools array, using local data");
          }
        }
      } catch (error) {
        console.error(
          "Error fetching schools from API, using local fallback data:",
          error
        );

        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error(
              "Server Error:",
              error.response.status,
              error.response.data
            );
          } else if (error.request) {
            console.error("Network Error: No response received");
          } else {
            console.error("Request Error:", error.message);
          }
        }

        setIsApiDataLoaded(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolLogos();
  }, []);

  const displaySchools = showAll ? schoolLogos : schoolLogos.slice(0, 10);
  const hasMoreSchools = schoolLogos.length > 10;

  return (
    <>
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-primary/5 border border-primary/20 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-primary">Partner Universities</span>
              {!isApiDataLoaded && !loading && (
                <span className="text-xs opacity-70">(Offline Mode)</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Trusted by Students at{" "}
              <span className="text-primary">3000+ Universities</span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Apply for education loans while applying to these institutions or any others globally
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && schoolLogos.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-muted-foreground font-medium">Loading universities...</span>
          </div>
        ) : (
          <>
            {/* Universities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-8">
              {displaySchools.map((school, index) => (
                <motion.div
                  key={`${school.school_id}_${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  {/* Logo Card */}
                  <div className="backdrop-blur-xl bg-card/40 border border-border/50 rounded-xl p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative w-full aspect-[3/2] mb-3">
                      <img
                        src={school.logo_url}
                        alt={`${school.university} logo`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-logo.png";
                        }}
                      />
                    </div>

                    {/* University Name */}
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors text-center line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                      {decodeHTMLEntities(school.university)}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            {hasMoreSchools && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-3 backdrop-blur-xl bg-card/40 border border-border/50 text-foreground font-semibold rounded-full hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
                >
                  {showAll
                    ? "Show Less"
                    : `View All ${schoolLogos.length} Universities`}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UniversityLogosSection;