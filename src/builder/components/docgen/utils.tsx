// @ts-nocheck

function normalizeProp([
  name,
  { required, annotatedType, type, tsType, description, defaultValue },
]) {
  const res = {
    name,
    type:
      annotatedType ||
      (type && type.name) ||
      (type && (type.raw || type.name)) ||
      (tsType && (tsType.raw || tsType.name)) ||
      "No type info",
    description,
  };
  if (required) {
    res.required = true;
  }
  if (defaultValue && defaultValue.value) {
    res.defaultValue = defaultValue.value;
  }

  return res;
}

const annotations = [
  {
    regex: /@deprecated/,
    name: "deprecated",
    type: "Boolean",
  },
  {
    regex: /@hide/,
    name: "hide",
    type: "Boolean",
  },
  {
    regex: /@beta/,
    name: "beta",
    type: "Boolean",
  },
  {
    regex: /@propType\s+(.*)/,
    name: "type",
    type: "String",
  },
];

function addAnnotations(prop) {
  if (prop.description) {
    annotations.forEach(({ regex, name }) => {
      const match = prop.description.match(regex);
      if (match) {
        prop.description = prop.description.replace(regex, "").trim();
        if (name) {
          prop[name] = match[2] || match[1] || true;
        }
      }
    });
  }

  return prop;
}

const parseJson = (parsed) => ({
  name: parsed.displayName,
  description: parsed.description || "",
  props: Object.entries(parsed.props || {})
    .map(normalizeProp)
    .map(addAnnotations)
    .filter((prop) => !prop.hide)
    .sort((p1, p2) => p1.name.localeCompare(p2.name)),
});

export { normalizeProp, annotations, addAnnotations, parseJson };
