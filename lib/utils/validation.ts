// Validation utilities for API requests

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

// Validate required fields
export function validateRequired(data: Record<string, unknown>, fields: string[]): ValidationResult {
  const errors: ValidationError[] = []

  for (const field of fields) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      errors.push({
        field,
        message: `فیلد ${field} الزامی است`,
      })
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Validate string length
export function validateStringLength(
  value: string,
  min: number,
  max: number,
  fieldName: string,
): ValidationError | null {
  if (value.length < min) {
    return { field: fieldName, message: `${fieldName} باید حداقل ${min} کاراکتر باشد` }
  }
  if (value.length > max) {
    return { field: fieldName, message: `${fieldName} باید حداکثر ${max} کاراکتر باشد` }
  }
  return null
}

// Validate email format
export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { field: "email", message: "فرمت ایمیل نامعتبر است" }
  }
  return null
}

// Validate URL format
export function validateUrl(url: string, fieldName: string): ValidationError | null {
  if (!url) return null // URL might be optional
  try {
    new URL(url)
    return null
  } catch {
    return { field: fieldName, message: `فرمت ${fieldName} نامعتبر است` }
  }
}

// Validate number range
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string,
): ValidationError | null {
  if (value < min || value > max) {
    return { field: fieldName, message: `${fieldName} باید بین ${min} و ${max} باشد` }
  }
  return null
}

// Validate array not empty
export function validateArrayNotEmpty(arr: unknown[], fieldName: string): ValidationError | null {
  if (!Array.isArray(arr) || arr.length === 0) {
    return { field: fieldName, message: `${fieldName} نباید خالی باشد` }
  }
  return null
}

// Pagination helper
export interface PaginationParams {
  page: number
  limit: number
  total: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  const end = start + limit
  const data = items.slice(start, end)

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export function getPaginationParams(searchParams: URLSearchParams): { page: number; limit: number } {
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1"))
  const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "10")))
  return { page, limit }
}
