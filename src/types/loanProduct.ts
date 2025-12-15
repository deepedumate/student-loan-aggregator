export interface HSLender {
  id: number;
  lender_name: string;
  lender_type: string;
}

export interface EligibilityCriteria {
  id: number;
  product_id: number;
  co_applicant_income_criteria: string | null;
  co_applicant_relationship: string | null;
  co_applicant_required: string | null;
  employment_criteria: string | null;
  entrance_exam_required: string | null;
  maximum_age: number | null;
  maximum_family_income: string | null;
  minimum_age: number | null;
  minimum_family_income: string | null;
  minimum_percentage_required: string | null;
  nationality_restrictions: string | null;
  residency_requirements: string | null;
  target_segment: string | null;
  created_at: string;
  updated_at: string;
}

export interface FinancialTerms {
  id: number;
  product_id: number;
  administrative_charges: string | null;
  interest_rate_range_max: string | null;
  interest_rate_range_min: string | null;
  interest_rate_type: string | null;
  legal_charges: string | null;
  loan_to_value_ratio: string | null;
  margin_money_percentage: string | null;
  maximum_loan_amount_secured: string | null;
  maximum_loan_amount_unsecured: string | null;
  minimum_loan_amount_secured: string | null;
  minimum_loan_amount_unsecured: string | null;
  processing_fee_amount: string | null;
  processing_fee_maximum: string | null;
  processing_fee_minimum: string | null;
  processing_fee_percentage: string | null;
  processing_fee_type: string | null;
  rack_rate: string | null;
  valuation_charges: string | null;
  created_at: string;
  updated_at: string;
}

export interface CollateralSecurity {
  id: number;
  product_id: number;
  collateral_margin: string | null;
  collateral_required: string | null;
  collateral_threshold_amount: string | null;
  collateral_types_accepted: string | null;
  guarantor_required: string | null;
  insurance_coverage_percentage: string | null;
  insurance_required: string | null;
  third_party_guarantee_accepted: string | null;
  created_at: string;
  updated_at: string;
}

export interface RepaymentTerms {
  id: number;
  product_id: number;
  bounce_charges: string | null;
  foreclosure_charges: string | null;
  late_payment_charges: string | null;
  moratorium_period: number | null;
  moratorium_type: string | null;
  part_payment_allowed: string | null;
  part_payment_minimum: string | null;
  prepayment_allowed: string | null;
  prepayment_charges: string | null;
  prepayment_lock_in_period: number | null;
  repayment_frequency: string | null;
  repayment_period_maximum: number | null;
  repayment_period_minimum: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProcessingDetails {
  id: number;
  product_id: number;
  application_mode: string | null;
  disbursement_process: string | null;
  disbursement_timeline: string | null;
  documentation_list: string | null;
  mandatory_documents: string | null;
  optional_documents: string | null;
  created_at: string;
  updated_at: string;
}

export interface GeographicCoverage {
  id: number;
  product_id: number;
  course_duration_maximum: number | null;
  course_duration_minimum: number | null;
  course_restrictions: string | null;
  not_supported_universities: string | null;
  restricted_countries: string | null;
  supported_course_types: string | null;
  created_at: string;
  updated_at: string;
}

export interface SpecialFeatures {
  id: number;
  product_id: number;
  customer_support_features: string | null;
  digital_features: string | null;
  flexible_repayment_options: string | null;
  forex_tax_benefits: string | null;
  grace_period_benefits: string | null;
  loyalty_benefits: string | null;
  tax_benefits_available: string | null;
  created_at: string;
  updated_at: string;
}

export interface PerformanceMetrics {
  id: number;
  product_id: number;
  application_volume_monthly: number | null;
  application_volume_quarterly: number | null;
  application_volume_yearly: number | null;
  approval_rate: string | null;
  average_loan_amount: string | null;
  average_processing_days: number | null;
  customer_satisfaction_rating: string | null;
  product_popularity_score: string | null;
  created_at: string;
  updated_at: string;
}

export interface SystemIntegration {
  id: number;
  product_id: number;
  api_availability: string | null;
  data_format: string | null;
  integration_complexity: string | null;
  sandbox_environment: string | null;
  technical_documentation_url: string | null;
  webhook_support: string | null;
  created_at: string;
  updated_at: string;
}

export interface CompetitiveAnalysis {
  id: number;
  product_id: number;
  market_positioning: string | null;
  pricing_strategy: string | null;
  created_at: string;
  updated_at: string;
}

export interface SystemTracking {
  id: number;
  product_id: number;
  change_log: string | null;
  created_by_user: string | null;
  created_by: string | null;
  created_date: string | null;
  last_modified_by: string | null;
  last_modified_date: string | null;
  next_review_date: string | null;
  notes: string | null;
  product_record_status: string | null;
  review_frequency: string | null;
  version_number: string | null;
  created_at: string;
  updated_at: string;
}

// Main Loan Product interface matching API response
export interface LoanProduct {
  id: number;
  lender_id: number | null;
  hs_lender_id: string | null;
  lender_name: string | null;
  partner_name: string | null;
  product_name: string | null;
  product_display_name: string | null;
  product_description: string | null;
  product_type: string | null;
  product_category: string | null;
  product_status: string | null;
  last_updated_date: string | null;
  hs_created_by_user_id: number | null;
  hs_createdate: string | null;
  hs_lastmodifieddate: string | null;
  hs_merged_object_ids: string | null;
  hs_object_id: string | null;
  hs_object_source_detail_1: string | null;
  hs_object_source_detail_2: string | null;
  hs_object_source_detail_3: string | null;
  hs_object_source_label: string | null;
  hs_shared_team_ids: string | null;
  hs_shared_user_ids: string | null;
  hs_updated_by_user_id: number | null;
  hubspot_owner_assigneddate: string | null;
  hubspot_owner_id: string | null;
  hubspot_team_id: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string | null;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  deleted_by: string | null;
  deleted_on: string | null;
  source: string | null;
  key_features: string[];
  lender: HSLender | null;
  eligibility_criteria: EligibilityCriteria | null;
  financial_terms: FinancialTerms | null;
  collateral_security: CollateralSecurity | null;
  repayment_terms: RepaymentTerms | null;
  processing_details: ProcessingDetails | null;
  geographic_coverage: GeographicCoverage | null;
  special_features: SpecialFeatures | null;
  performance_metrics: PerformanceMetrics | null;
  system_integration: SystemIntegration | null;
  loan_product_competitive_analysis: CompetitiveAnalysis | null;
  system_tracking: SystemTracking | null;
}

// Filter types for API requests
export interface LoanProductFilters {
  // Basic filters
  lender_name?: string;
  product_type?: string;
  product_category?: string;
  product_status?: string;
  partner_name?: string;
  supported_countries?: string;
  loan_type?: string;

  // Financial filters
  interest_rate_min?: number;
  interest_rate_max?: number;
  loan_amount_min?: number;
  loan_amount_max?: number;
  processing_fee_max?: number;

  // Eligibility filters
  study_level?: string;
  target_segment?: string;
  minimum_age?: number;
  maximum_age?: number;
  nationality_restrictions?: string;

  // Geographic filters
  supported_course_types?: string;
  restricted_countries?: string;
  course_duration_min?: number;
  course_duration_max?: number;
  school_name?: string;
  program_name?: string;

  // Intake period
  intake_month?: string;
  intake_year?: number;

  // Application filters
  total_tuition_fee?: number;
  cost_of_living?: number;

  // Collateral filters
  collateral_required?: string;
  guarantor_required?: string;

  // Repayment filters
  repayment_period_min?: number;
  repayment_period_max?: number;
  moratorium_available?: boolean;

  // Special features
  tax_benefits_available?: string;
  digital_features?: string;
}

// Sort options
export type SortKey =
  | "interest_rate"
  | "max_loan_amount"
  | "processing_fee"
  | "rating"
  | "lender_name"
  | "product_name"
  | "created_at";

export type SortDir = "asc" | "desc";

// API response structure
export interface LoanProductsResponse {
  success: boolean;
  message: string;
  data: {
    data: LoanProduct[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };
}

// Filter options for dropdowns
export interface FilterOptions {
  lenders: string[];
  productTypes: string[];
  productCategories: string[];
  productStatuses: string[];
  partners: string[];
  courseTypes: string[];
  targetSegments: string[];
}
