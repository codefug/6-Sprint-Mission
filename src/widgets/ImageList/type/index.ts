import { Dispatch, SetStateAction } from "react";
import { FORM_DATA } from "../../../shared/constants/constants";

export interface ImageListProps {
  onChange: Dispatch<SetStateAction<typeof FORM_DATA>>;
}
