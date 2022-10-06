const doRequest = async (options, cb) => {
  try {
    const response = await axios(options);
    cb(response);
  } catch ({
    response: {
      status,
      data: {
        error: { text },
      },
    },
  }) {
    Swal.fire({
      html: `<b style='color: red'>${status}</b> ${text}`,
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      icon: "error",
      position: "top-end",
      toast: true,
    });
  }
};
