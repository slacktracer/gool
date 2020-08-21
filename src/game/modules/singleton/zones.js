export const zones = [
  {
    name: "goolZone",
    length: 45,
    backgroundColour: "hsla(190, 50%, 30%, 0.2)",
    dotColour: function dotColour(glimmer) {
      return "hsla(190, 50%, 50%, " + glimmer + ")";
    },
  },
  {
    name: "safeZone",
    length: 105,
    backgroundColour: "hsla(130, 50%, 30%, 0.2)",
    dotColour: function dotColour(glimmer) {
      return "hsla(130, 50%, 50%, " + glimmer + ")";
    },
  },
  {
    name: "dangerZone",
    length: 135,
    backgroundColour: "hsla(0, 50%, 30%, 0.2)",
    dotColour: function dotColour(glimmer) {
      return "hsla(360, 50%, 50%, " + glimmer + ")";
    },
  },
  {
    name: "outerZone",
    length: 250,
    backgroundColour: "hsla(0, 50%, 30%, 0.2)",
    dotColour: function dotColour(glimmer) {
      return "hsla(360, 50%, 50%, " + glimmer + ")";
    },
  },
];
zones.limbo = {
  name: "limbo",
  backgroundColour: "hsla(360, 100%, 100%, 1)",
};
zones.getByPosition = function getByPosition(positionLength) {
  var i, length;
  for (i = 0, length = this.length; i < length; i += 1) {
    if (positionLength < this[i].length) {
      return this[i];
    }
  }
  return this.limbo;
}.bind(zones);
zones.getByName = function getByName(zoneName) {
  var i, length;
  for (i = 0, length = this.length; i < length; i += 1) {
    if (zoneName === this[i].name) {
      return this[i];
    }
  }
  return this.limbo;
}.bind(zones);
