export const carouselFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const carousel = {
  initial: (options) =>
    options.usingDot
      ? { opacity: 0 }
      : {
          transform: options.next ? "translateX(100%)" : "translateX(-100%)",
          opacity: 0,
        },
  animate: (options) =>
    options.usingDot
      ? { opacity: 1, transition: { duration: 0.5 } }
      : {
          transform: "translateX(0)",
          opacity: 1,
          transition: { duration: 0.3 },
        },
  exit: (options) =>
    options.usingDot
      ? { opacity: 0, transition: { duration: 0.3 } }
      : {
          transform: options.next ? "translateX(-100%)" : "translateX(100%)",
          opacity: 0,
          transition: { duration: 0.3 },
        },
};

export const imageNext = {
  initial: (options) =>
    options.usingNavigation
      ? { opacity: 0 }
      : {
          transform: options.next ? "translateX(100%)" : "translateX(-100%)",
          opacity: 0,
        },
  animate: (options) =>
    options.usingNavigation
      ? { opacity: 1, transition: { duration: 0.5 } }
      : {
          transform: "translateX(0)",
          opacity: 1,
          transition: { duration: 0.5 },
        },
  exit: (options) =>
    options.usingNavigation
      ? { opacity: 0, transition: { duration: 0.5 } }
      : {
          transform: options.next ? "translateX(-100%)" : "translateX(100%)",
          opacity: 0,
          transition: { duration: 0.5 },
        },
};

export const imagePrevious = {
  initial: {
    transform: "translateX(100%)",
    opacity: 0,
  },
  animate: {
    transform: "translateX(0)",
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
