import type { ReactNode } from "react";
import { Attachment } from "@/components/Attachment/Attachment";
import { CaptionedPhoto } from "@/components/CaptionedPhoto/CaptionedPhoto";
import { Container } from "@/components/Container/Container";
import { Quote } from "@/components/Quote/Quote";
import type { ArticleBlock } from "@/lib/wp/types";
import { EditionGalleryBlock, FloatRankingBlock } from "./EditionBlocks";
import { ArticleGallery } from "./ArticleGallery";
import styles from "./ArticleBody.module.css";

type WideBlock = Extract<ArticleBlock, { type: "floatRanking" | "editionGallery" }>;
type ProseBlock = Exclude<ArticleBlock, WideBlock>;

type Segment = { kind: "prose"; blocks: ProseBlock[] } | { kind: "wide"; block: WideBlock };

const PROSE_PHOTO_SIZES = "(min-width: 901px) 760px, 100vw";

function isWideBlock(block: ArticleBlock): block is WideBlock {
  return block.type === "floatRanking" || block.type === "editionGallery";
}

function toSegments(blocks: ArticleBlock[]): Segment[] {
  const segments: Segment[] = [];
  for (const block of blocks) {
    const last = segments.at(-1);
    if (isWideBlock(block)) {
      segments.push({ kind: "wide", block });
    } else if (last?.kind === "prose") {
      last.blocks.push(block);
    } else {
      segments.push({ kind: "prose", blocks: [block] });
    }
  }
  if (!segments.some((segment) => segment.kind === "prose")) {
    segments.unshift({ kind: "prose", blocks: [] });
  }
  return segments;
}

function photoCaption(caption: string | null, credit: string | null): string | undefined {
  const parts = [caption, credit && `Foto di ${credit}`].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

function ProseBlockView({ block, isIntro }: { block: ProseBlock; isIntro: boolean }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div
          className={isIntro ? `${styles.paragraph} ${styles.intro}` : styles.paragraph}
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "heading":
      return <h2 className={styles.heading}>{block.text}</h2>;
    case "quote":
      return <Quote text={block.text} citation={block.citation} />;
    case "attachment":
      return (
        <Attachment
          title={block.title}
          url={block.url}
          fileType={block.fileType}
          sizeInBytes={block.sizeInBytes}
        />
      );
    case "gallery":
      return (
        <ArticleGallery
          title={block.title}
          credit={block.credit}
          photos={block.photos}
          headingClassName={styles.heading}
        />
      );
    case "image":
      return (
        <CaptionedPhoto
          photo={block.photo}
          caption={photoCaption(block.caption, block.credit)}
          placeholderColor="sky"
          sizes={PROSE_PHOTO_SIZES}
        />
      );
  }
}

function WideBlockView({ block }: { block: WideBlock }) {
  switch (block.type) {
    case "floatRanking":
      return <FloatRankingBlock editionYear={block.editionYear} />;
    case "editionGallery":
      return <EditionGalleryBlock editionYear={block.editionYear} />;
  }
}

type ArticleBodyProps = {
  blocks: ArticleBlock[];
  share: ReactNode;
};

export function ArticleBody({ blocks, share }: ArticleBodyProps) {
  const segments = toSegments(blocks);
  const firstProseIndex = segments.findIndex((segment) => segment.kind === "prose");
  const introBlock = blocks[0]?.type === "paragraph" ? blocks[0] : null;

  return segments.map((segment, segmentIndex) => {
    if (segment.kind === "wide") {
      return <WideBlockView key={segmentIndex} block={segment.block} />;
    }
    return (
      <Container key={segmentIndex}>
        <div className={styles.columns}>
          {segmentIndex === firstProseIndex && share}
          <div className={styles.prose}>
            {segment.blocks.map((block, blockIndex) => (
              <ProseBlockView key={blockIndex} block={block} isIntro={block === introBlock} />
            ))}
          </div>
        </div>
      </Container>
    );
  });
}
