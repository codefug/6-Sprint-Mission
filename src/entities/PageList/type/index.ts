export interface PageListProps {
  callback: (value: number | ((prev: number) => number)) => void;
  page: number;
}
