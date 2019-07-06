const specialCharSet = new Set([
  '#',
  '?',
  '!',
  '@',
  '$',
  '%',
  '^',
  '&',
  '*',
  '-'
]);
const uppercase = /[A-Z]/g;
const lowercase = /[a-z]/g;
const digit = /[0-9]/g;

export function isStrongPassword(password: string) {
  if (password.length < 8 || password.length > 16) return false;

  const record = {
    lowercase: 0,
    uppercase: 0,
    special: 0,
    digits: 0
  };

  for (const char of password) {
    if (uppercase.test(char)) record.uppercase++;
    else if (lowercase.test(char)) record.lowercase++;
    else if (digit.test(char)) record.digits++;
    else if (specialCharSet.has(char)) record.special++;
  }

  return (
    record.lowercase > 2 &&
    record.uppercase > 0 &&
    record.special > 0 &&
    record.digits > 0
  );
}
