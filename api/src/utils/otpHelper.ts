const generateOtp6NonZero = (): string => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

export { generateOtp6NonZero };
