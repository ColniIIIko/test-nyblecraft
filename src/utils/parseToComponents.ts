export const parseToComponents = (text: string, regex: RegExp) => {
  regex.lastIndex = 0;
  let currentIndex = 0;
  const components: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    components.push(text.slice(currentIndex, match.index));
    components.push(match[0]);
    currentIndex = (match.index || 0) + match[0].length;
  }

  if (currentIndex !== text.length) {
    components.push(text.slice(currentIndex, text.length));
  }

  return components;
};
