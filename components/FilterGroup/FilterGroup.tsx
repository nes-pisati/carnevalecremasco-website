import type { Ref } from "react";
import { Icon } from "@/components/Icon/Icon";
import styles from "./FilterGroup.module.css";

export type FilterOption<Value extends string> = {
  value: Value;
  label: string;
};

type FilterGroupProps<Value extends string> = {
  label: string;
  options: readonly FilterOption<Value>[];
  selected: Value;
  onSelect: (value: Value) => void;
  selectedRef?: Ref<HTMLButtonElement>;
  className?: string;
};

export function FilterGroup<Value extends string>({
  label,
  options,
  selected,
  onSelect,
  selectedRef,
  className,
}: FilterGroupProps<Value>) {
  return (
    <div role="group" aria-label={label} className={[styles.filters, className].filter(Boolean).join(" ")}>
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <button
            key={option.value}
            ref={isSelected ? selectedRef : undefined}
            type="button"
            className={isSelected ? `${styles.filter} ${styles.selected}` : styles.filter}
            aria-pressed={isSelected}
            onClick={() => onSelect(option.value)}
          >
            {isSelected && <Icon name="check" size={18} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
