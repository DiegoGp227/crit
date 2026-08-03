export function parseProfileError(err: unknown): string {
  let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

  if (err && typeof err === "object" && "response" in err) {
    const error = err as {
      response?: {
        status?: number;
        data?: { message?: string; details?: Record<string, string> };
      };
      request?: unknown;
    };

    if (error.response) {
      const { status, data } = error.response;
      const firstFieldError = data?.details ? Object.values(data.details)[0] : undefined;

      switch (status) {
        case 400:
          errorMessage = data?.message || "Datos inválidos. Revisa el formulario.";
          break;
        case 409:
          errorMessage = data?.message || "El dorsal ya está en uso.";
          break;
        case 422:
          errorMessage = firstFieldError || data?.message || "Datos inválidos. Revisa el formulario.";
          break;
        case 500:
          errorMessage = "Error del servidor. Inténtalo más tarde.";
          break;
        default:
          errorMessage = data?.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = "Error de conexión. Verifica tu conexión a internet.";
    }
  }

  return errorMessage;
}
