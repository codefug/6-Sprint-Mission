interface Props {
  value: string;
  className?: string;
  disabled?: boolean;
}

export function Button({ value, className, disabled }: Props) {
  return (
    <input
      type="submit"
      className={
        "flex items-center justify-center rounded-lg bg-[#3692ff] text-white hover:cursor-pointer hover:bg-[#1967D6] disabled:bg-[#9CA3AF] " +
        className
      }
      disabled={disabled}
      value={value}
    />
  );
}
