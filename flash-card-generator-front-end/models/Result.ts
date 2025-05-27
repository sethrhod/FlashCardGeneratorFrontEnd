import { IError } from "./apiClient";

type Result<T> = 
  | {success: true; data: T}
  | {success: false; message: string, errors: IError[] | undefined};

export default Result;