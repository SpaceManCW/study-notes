import { StringValidator } from "./Validation";

export const numberRegexp = /^[0-9]+$/;
export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s)
    }
}
let z = new ZipCodeValidator()
let res = z.isAcceptable("zhanqiling")
console.log(res);
