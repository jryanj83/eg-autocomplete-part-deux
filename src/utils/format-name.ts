export const formatName = (fullName: string): string => {
  // Split the name into parts
  const parts = fullName.trim().split(' ');
  
  // Check for titles
  const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];
  let title = '';
  if (titles.includes(parts[0])) {
    title = parts.shift() || '';
  }

  // Check for suffixes in any position
  const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
  let suffix = '';
  const suffixIndex = parts.findIndex(part => suffixes.includes(part));
  if (suffixIndex !== -1) {
    suffix = parts[suffixIndex];
    parts.splice(suffixIndex, 1);
  }
  
  // Last remaining part is the surname
  const lastName = parts.pop() || '';
  
  // Everything else is the first name
  const firstName = parts.join(' ');
  
  return `${lastName}${suffix ? ' ' + suffix : ''}, ${firstName}${title ? ` (${title})` : ''}`.trim();
};
