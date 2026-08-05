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
          Reconozco que la práctica del ciclismo implica riesgos inherentes, incluyendo, entre otros, caídas, colisiones con otros participantes, vehículos, peatones u objetos, condiciones climáticas adversas, fallas mecánicas y lesiones de diversa gravedad.

          Declaro que me encuentro en condiciones físicas adecuadas para participar y que mi bicicleta cumple con las condiciones mínimas de seguridad.

          Asumo de manera voluntaria todos los riesgos derivados de mi participación y libero al organizador, sus colaboradores, patrocinadores y aliados de cualquier reclamación por lesiones, daños materiales o perjuicios que puedan ocurrir durante el desarrollo del evento.

          Autorizo el uso de fotografías y videos tomados durante el evento para fines promocionales relacionados con la actividad.
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
