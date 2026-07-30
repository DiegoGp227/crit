export function parseAuthError(err: unknown): string {
  let errorMessage = "Ocurrió un error inesperado. Inténtalo de nuevo.";

  if (err && typeof err === "object" && "response" in err) {
    const error = err as {
      response?: { status?: number; data?: { message?: string } };
      request?: unknown;
    };

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = "Credenciales incorrectas. Inténtalo de nuevo.";
          break;
        case 409:
          errorMessage = "El usuario ya existe.";
          break;
        case 500:
          errorMessage = "Error del servidor. Inténtalo más tarde.";
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = "Error de conexión. Verifica tu conexión a internet.";
    }
  }

  return errorMessage;
}