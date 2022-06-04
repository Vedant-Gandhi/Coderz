export const routes = {
  primary: "/",
  subrouter: {
    AUTH: {
      primary: "/auth/",
      subrouter: {
        SIGNUP: {
          primary: "/auth/signup/",
          subrouter: {
            REDIRECT_TO_SIGNUP: {
              primary: "/auth/signup/redirect/",
              subrouter: {},
            },
          },
        },

        LOGIN: {
          primary: "/auth/login/*",
          subrouter: {
            REDIRECT_TO_LOGIN: {
              primary: "/auth/login/redirect/",
              subrouter: {},
            },
          },
        },
      },
    },

    EDITOR: {
      primary: "/editor/*",
      subrouter: {},
    },
  },
};
