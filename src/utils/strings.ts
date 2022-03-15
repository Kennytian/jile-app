export const getInstanceName = ({ constructor }: any) => constructor.toString().match(/\w+/g)[1];

export const getMethodName = () => {
  const [, , row3] = new Error().stack?.split('\n') || [];
  const result = /at \w+\.(\w+)/.exec(row3);
  if (Array.isArray(result) && result.length > 1) {
    const [, name] = result;
    return name;
  }
  return '';
};
