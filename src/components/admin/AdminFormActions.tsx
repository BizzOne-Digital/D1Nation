type Props = {
  isEdit: boolean;
  saving?: boolean;
  onSave: () => void;
  onCancel?: () => void;
  saveLabel?: string;
};

export function AdminFormActions({ isEdit, saving, onSave, onCancel, saveLabel }: Props) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button
        type="button"
        disabled={saving}
        onClick={onSave}
        className="rounded-full bg-d1-orange px-6 py-2 text-sm font-semibold text-d1-charcoal disabled:opacity-60"
      >
        {saving ? "Saving…" : saveLabel || (isEdit ? "Save changes" : "Add new")}
      </button>
      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/20 px-6 py-2 text-sm text-d1-off-white hover:bg-white/5"
        >
          Cancel
        </button>
      ) : null}
    </div>
  );
}
