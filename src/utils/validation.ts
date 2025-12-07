/**
 * Input Validation Utilities
 * Provides comprehensive validation for common form fields
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidationOptions {
  isArabic?: boolean;
}

// Email validation using RFC 5322 simplified pattern
export const validateEmail = (email: string, options: ValidationOptions = {}): ValidationResult => {
  const { isArabic } = options;

  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: isArabic ? 'البريد الإلكتروني مطلوب' : 'Email is required',
    };
  }

  // RFC 5322 simplified pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      error: isArabic ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format',
    };
  }

  return { isValid: true };
};

// Password validation with strength requirements
export interface PasswordValidationOptions extends ValidationOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
}

export const validatePassword = (
  password: string,
  options: PasswordValidationOptions = {}
): ValidationResult => {
  const {
    isArabic,
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = false,
  } = options;

  if (!password) {
    return {
      isValid: false,
      error: isArabic ? 'كلمة المرور مطلوبة' : 'Password is required',
    };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: isArabic
        ? `يجب أن تكون كلمة المرور ${minLength} أحرف على الأقل`
        : `Password must be at least ${minLength} characters`,
    };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: isArabic
        ? 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل'
        : 'Password must contain at least one uppercase letter',
    };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: isArabic
        ? 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل'
        : 'Password must contain at least one lowercase letter',
    };
  }

  if (requireNumber && !/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: isArabic
        ? 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل'
        : 'Password must contain at least one number',
    };
  }

  if (requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      isValid: false,
      error: isArabic
        ? 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل'
        : 'Password must contain at least one special character',
    };
  }

  return { isValid: true };
};

// Password confirmation validation
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
  options: ValidationOptions = {}
): ValidationResult => {
  const { isArabic } = options;

  if (!confirmPassword) {
    return {
      isValid: false,
      error: isArabic ? 'تأكيد كلمة المرور مطلوب' : 'Please confirm your password',
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: isArabic ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
    };
  }

  return { isValid: true };
};

// Name validation (prevents XSS and validates format)
export const validateName = (
  name: string,
  options: ValidationOptions & { minLength?: number; maxLength?: number } = {}
): ValidationResult => {
  const { isArabic, minLength = 2, maxLength = 100 } = options;

  if (!name || name.trim() === '') {
    return {
      isValid: false,
      error: isArabic ? 'الاسم مطلوب' : 'Name is required',
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < minLength) {
    return {
      isValid: false,
      error: isArabic
        ? `يجب أن يكون الاسم ${minLength} أحرف على الأقل`
        : `Name must be at least ${minLength} characters`,
    };
  }

  if (trimmedName.length > maxLength) {
    return {
      isValid: false,
      error: isArabic
        ? `يجب أن لا يتجاوز الاسم ${maxLength} حرف`
        : `Name must not exceed ${maxLength} characters`,
    };
  }

  // Check for potentially dangerous characters (XSS prevention)
  const dangerousPattern = /<script|javascript:|on\w+=/i;
  if (dangerousPattern.test(trimmedName)) {
    return {
      isValid: false,
      error: isArabic ? 'الاسم يحتوي على أحرف غير مسموح بها' : 'Name contains invalid characters',
    };
  }

  return { isValid: true };
};

// Phone number validation
export const validatePhone = (
  phone: string,
  options: ValidationOptions & { required?: boolean } = {}
): ValidationResult => {
  const { isArabic, required = false } = options;

  if (!phone || phone.trim() === '') {
    if (required) {
      return {
        isValid: false,
        error: isArabic ? 'رقم الهاتف مطلوب' : 'Phone number is required',
      };
    }
    return { isValid: true }; // Optional field, empty is valid
  }

  // Remove common phone formatting characters for validation
  const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');

  // Check if it's all digits
  if (!/^\d+$/.test(cleanPhone)) {
    return {
      isValid: false,
      error: isArabic ? 'رقم الهاتف غير صحيح' : 'Invalid phone number format',
    };
  }

  // Check reasonable length (7-15 digits)
  if (cleanPhone.length < 7 || cleanPhone.length > 15) {
    return {
      isValid: false,
      error: isArabic ? 'رقم الهاتف غير صحيح' : 'Invalid phone number length',
    };
  }

  return { isValid: true };
};

// Generic required field validation
export const validateRequired = (
  value: string | number | boolean | null | undefined,
  fieldName: string,
  options: ValidationOptions = {}
): ValidationResult => {
  const { isArabic } = options;

  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
    return {
      isValid: false,
      error: isArabic ? `${fieldName} مطلوب` : `${fieldName} is required`,
    };
  }

  return { isValid: true };
};

// Sanitize input to prevent XSS (basic HTML entity encoding)
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate user form (combines multiple validations)
export interface UserFormData {
  email: string;
  full_name: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  company?: string;
  role?: string;
}

export interface UserFormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof UserFormData, string>>;
}

export const validateUserForm = (
  data: UserFormData,
  options: ValidationOptions & { isNewUser?: boolean } = {}
): UserFormValidationResult => {
  const { isArabic, isNewUser = false } = options;
  const errors: Partial<Record<keyof UserFormData, string>> = {};

  // Email validation
  const emailResult = validateEmail(data.email, { isArabic });
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }

  // Name validation
  const nameResult = validateName(data.full_name, { isArabic });
  if (!nameResult.isValid) {
    errors.full_name = nameResult.error;
  }

  // Password validation (only for new users or if password provided)
  if (isNewUser || data.password) {
    const passwordResult = validatePassword(data.password || '', { isArabic });
    if (!passwordResult.isValid) {
      errors.password = passwordResult.error;
    }

    // Confirm password
    if (data.confirmPassword !== undefined) {
      const confirmResult = validatePasswordMatch(data.password || '', data.confirmPassword, { isArabic });
      if (!confirmResult.isValid) {
        errors.confirmPassword = confirmResult.error;
      }
    }
  }

  // Phone validation (optional)
  if (data.phone) {
    const phoneResult = validatePhone(data.phone, { isArabic });
    if (!phoneResult.isValid) {
      errors.phone = phoneResult.error;
    }
  }

  // Role validation
  if (isNewUser && !data.role) {
    errors.role = isArabic ? 'الدور مطلوب' : 'Role is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const validation = {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateName,
  validatePhone,
  validateRequired,
  sanitizeInput,
  validateUserForm,
};

export default validation;
