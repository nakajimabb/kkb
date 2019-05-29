function str(value, default_str='') {
  return String(value || default_str);
}

module.exports = {
  str: str,
};
