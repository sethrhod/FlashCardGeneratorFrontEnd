import { IError } from "../lib/apiClient";

type Result<T> = 
  | {success: true; data: T}
  | {success: false; message: string, errors: IError[] | undefined};

export default Result;