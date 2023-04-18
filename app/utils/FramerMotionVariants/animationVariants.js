export const carouselFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const carouselNext = {
  initial: (nextItem) => ({
    transform: nextItem ? "translateX(100%)" : "translateX(-100%)",
    opacity: 0,
  }),
  animate: {
    transform: "translateX(0)",
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (nextItem) => ({
    transform: nextItem ? "translateX(-100%)" : "translateX(100%)",
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export const imageNext = {
  initial: (nextImage) => ({
    transform: nextImage ? "translateX(100%)" : "translateX(-100%)",
    opacity: 0,
  }),
  animate: {
    transform: "translateX(0)",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: (nextImage) => ({
    transform: nextImage ? "translateX(-100%)" : "translateX(100%)",
    opacity: 0,
    transition: { duration: 0.5 },
  }),
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
