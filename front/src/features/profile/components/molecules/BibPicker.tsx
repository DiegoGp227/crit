import Label from "@/src/shared/components/ui/Label";
import { cn } from "@/src/shared/utils/cn";
import { pad2, padBib } from "@/src/shared/utils/format";

const BIB_NUMBERS = Array.from({ length: 100 }, (_, index) => index);

interface BibPickerProps {
  bibAssigned: boolean;
  bibNumber?: number | null;
  used: number[];
  selected: number | null;
  onSelect: (bibNumber: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function BibPicker({
  bibAssigned,
  bibNumber,
  used,
  selected,
  onSelect,
  isLoading = false,
  error = null,
}: BibPickerProps) {
  if (bibAssigned) {
    return (
      <div className="flex flex-col gap-2">
        <Label>Dorsal</Label>
        <input
          value={padBib(bibNumber ?? 0)}
          disabled
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-border-yellow"
        />
        <span className="text-xs text-text-dim">
          El dorsal ya está asignado y no se puede cambiar
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label optional={false}>Dorsal</Label>
      {isLoading ? (
        <p className="text-sm text-text-muted">Cargando dorsales disponibles...</p>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {BIB_NUMBERS.map((bibNumberOption) => {
              const taken = used.includes(bibNumberOption);
              const isSelected = selected === bibNumberOption;
              return (
                <button
                  key={bibNumberOption}
                  type="button"
                  disabled={taken}
                  onClick={() => onSelect(bibNumberOption)}
                  className={cn(
                    "h-9 rounded-lg text-sm font-semibold transition-colors",
                    taken &&
                      "cursor-not-allowed bg-surface text-text-dim opacity-60 line-through",
                    isSelected && "bg-cta text-cta-ink",
                    !taken &&
                      !isSelected &&
                      "cursor-pointer bg-surface-raised text-text-primary hover:bg-bg-yellow-tint hover:text-text-secondary",
                  )}
                >
                  {pad2(bibNumberOption)}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-text-dim">
            Los dorsales tachados ya están asignados.
          </span>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </>
      )}
    </div>
  );
}
