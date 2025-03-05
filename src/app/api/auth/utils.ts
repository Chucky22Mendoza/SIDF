import bcrypt from 'bcrypt';

export const encryptValue = async (toEncrypt: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(toEncrypt, salt);
  return hash.toString();
};

export const compareValues = async (toCompare: string, encrypted: string): Promise<Boolean> => {
  return await bcrypt.compare(toCompare, encrypted);
};
