export const stripFormatting = (text) => {
  if (typeof text !== 'string') return text;
  if (!text) return '';
  return text.replace(/<[^>]*>?/gm, '');
};
