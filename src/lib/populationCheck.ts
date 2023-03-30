import {
  Experiment as Exp,
  Filter,
  FilterType,
  Population,
} from "../../experiment";
const andList = new Intl.ListFormat();
const orList = new Intl.ListFormat("en", { type: "disjunction" });
import { parseFilter } from "./parseFilter";

export function populationCheck(population, data) {
  let popTotal = 0;
  let populationElements = population[0].map((bucket) => ({
    description:
      data.description.find((d) => d.startsWith(`Treatment ${bucket[0]}`)) ??
      "None",
    percentage: (() => {
      const sum = bucket[1].reduce(
        (total, range) => total + range.e - range.s,
        0
      );
      popTotal += sum;
      return (sum / 100).toFixed(2) + "%";
    })(),
    ranges: bucket[1].map((range) => `${range.s} - ${range.e}`).join(", "),
    color: bucket[0] > 0 ? "#46c46e" : "#ed4245",
  }));
  let filter = population[1][0]
    ? andList.format(population[1].map((f) => parseFilter(f)))
    : "";
  let totalPercentage = "";
  if (popTotal < 10_000) {
    totalPercentage = ((10_000 - popTotal) / 100).toFixed(2) + "%";
    populationElements = [
      ...populationElements,
      {
        description: data.description[0],
        percentage: totalPercentage,
        ranges: "",
        color: "#ed4245",
      },
    ];
  }
  console.log(populationElements);
  return {
    filter,
    populationElements,
    totalPercentage,
  };
}