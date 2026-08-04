interface RegistrationStepConfirmProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
}

export default function RegistrationStepConfirm({
  accepted,
  onChange,
}: RegistrationStepConfirmProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="card border border-border p-5">
        <p className="text-sm leading-relaxed text-text-muted">
          Al aceptar confirmas tu participación en el campeonato. Asegúrate de
          que tus datos sean correctos, ya que la inscripción es única y no
          podrás modificarla después de confirmar.
        </p>
      </div>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-cta"
        />
        <span className="text-sm font-medium text-text-primary">Acepto</span>
      </label>
    </div>
  );
}
