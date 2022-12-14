const handleError = (err, req, res, next) => {
  console.log(err);
  const errorTxtFa = err?.text ?? "خطای سرور";
  res.status(err.status ?? 500).json({
    error: {
      message: err.message,
      text: errorTxtFa,
    },
  });
};

module.exports = handleError;
