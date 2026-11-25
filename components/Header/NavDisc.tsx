import { Icon, type IconName } from "@/components/Icon/Icon";
import { fillClass, type AccentColor } from "@/components/fills";
import styles from "./NavDisc.module.css";

type NavDiscProps = {
  icon: IconName;
  color: AccentColor;
  size?: "xsmall" | "small" | "medium";
};

export function NavDisc({ icon, color, size = "medium" }: NavDiscProps) {
  const classes = [styles.disc, size !== "medium" && styles[size], fillClass(color)].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <Icon name={icon} size={size === "medium" ? 20 : size === "small" ? 18 : 16} />
    </span>
  );
}
