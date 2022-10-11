const socketServices = (globalEmmiter) => {
  globalEmmiter.on("eventaa", () => {
    console.log("an event occurred!");
  });

  return (socket) => {
    console.log(`new user connected to socket`);
  };
};

module.exports = socketServices;
