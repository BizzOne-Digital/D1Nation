import Image from "next/image";
import { resolvePublicImageUrl, shouldUnoptimizeImageSrc } from "@/lib/image-url";

type Props = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  onEdit: () => void;
  onDelete: () => void;
};

export function AdminListRow({ title, subtitle, imageUrl, onEdit, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:gap-4 sm:p-4">
      {imageUrl ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/20">
          <Image
            src={resolvePublicImageUrl(imageUrl)}
            alt=""
            fill
            unoptimized={shouldUnoptimizeImageSrc(imageUrl)}
            className="object-cover"
            sizes="56px"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-dashed border-white/15 text-[10px] text-d1-muted">
          No img
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-d1-off-white">{title}</p>
        {subtitle ? <p className="mt-0.5 truncate text-xs text-d1-muted">{subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 gap-2">
        <button type="button" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-d1-orange hover:bg-d1-orange/10" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}
