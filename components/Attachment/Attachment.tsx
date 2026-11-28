import { buttonClassName } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { formatFileSize } from "@/lib/format";
import styles from "./Attachment.module.css";

type AttachmentProps = {
  title: string;
  description?: string;
  url: string;
  fileType: string;
  sizeInBytes: number | null;
};

export function Attachment({ title, description, url, fileType, sizeInBytes }: AttachmentProps) {
  const fileInfo = `${fileType}, ${formatFileSize(sizeInBytes)}`;
  const meta = description ? `${description} · ${fileInfo}` : fileInfo;
  return (
    <a href={url} download className={styles.attachment}>
      <span className={styles.badge} aria-hidden="true">
        {fileType}
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>{meta}</span>
      </span>
      <span className={buttonClassName("primary", styles.action)}>
        <Icon name="download" size={20} />
        Scarica
      </span>
    </a>
  );
}
