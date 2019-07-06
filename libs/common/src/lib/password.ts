/**
 * Strong Password Regular Expression
 *
 * Strong Password must follow these 5 rules:
 *
 *   - password must contain at least one uppercase, or capital, letter (ex: A, B, etc.)
 *   - password must contain at least one lowercase
 *   - password must contain at least one number digit (ex: 0, 1, 2, 3, etc.)
 *   - password must contain at least one special character (ex: #, ?, !, @, $, %, ^, &, *, -)
 *   - password must contain at least 8 characters
 *
 */
export const strongPasswordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
