import { metadata } from "./Metadata.js";

const indexBy = (array: {[key: string]: any}[], prop: string) => array.reduce((output, item) => {
  output[item[prop]] = item;
  return output;
}, {});

const instructions = indexBy(metadata, "instruction");

export { instructions }