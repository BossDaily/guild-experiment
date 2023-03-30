import { Filter, FilterType } from "../../experiment";
const andList = new Intl.ListFormat();
const orList = new Intl.ListFormat("en", { type: "disjunction" });

export function parseFilter(f: Filter) {
  if (f[0] === FilterType.Feature)
    return `Server has feature ${orList.format(f[1][0][1])}`;
  if (f[0] === FilterType.IDRange)
    return `Server ID is in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}`;
  if (f[0] === FilterType.MemberCount)
    return `Server member count is ${f[1][1][1]
        ? `in range ${f[1][0][1] ?? 0} - ${f[1][1][1]}`
        : `${f[1][0][1]}+`
      }`;
  if (f[0] === FilterType.ID)
    return `Server ID is ${orList.format(f[1][0][1])}`;
  if (f[0] === FilterType.HubType)
    return `Server hub type is ${orList.format(
      f[1][0][1].map((t) => hubTypes[t])
    )}`;
  if (f[0] === FilterType.RangeByHash)
    return `${f[1][1][1] / 100}% of servers (hash key ${f[1][0][1]}, target ${f[1][1][1]
      })`;
  return `Unknown filter type ${f[0]}`;
};