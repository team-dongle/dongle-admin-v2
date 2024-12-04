export const phoneRegexp = new RegExp(
  /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
);

export const urlRegexp = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi,
);
