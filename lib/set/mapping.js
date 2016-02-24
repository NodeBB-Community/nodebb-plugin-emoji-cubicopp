"use strict";

module.exports = {
  separationLeading: {
    confused: /:[-=]?\?/,
    crying: /:[-=]?[\*']\(/i,
    expressionless: /:[-=]?\|/,
    happy: /:[-=\^]?\)/,
    sad: /:[-=]?\(/,
    sunglasses: /[8b][-=]?[\|\)]/i,
    upset: [/\|[-=]?\(/],
    warning: /!!!/
  },
  separationWrapped: {
    angry: /&gt;[\|\(]/,
    big_mouth: /:[-=]?o/i,
    cheeky: /&gt;D/,
    confused: /o_O|O_o/,
    lol: /[x:][-=]?d/i,
    surprised: /O_O|o_o/,
    tongue_out: /:[-=]?p/i
  }
};
