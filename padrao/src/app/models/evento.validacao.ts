
export function validarTitulo(valor: string): string | null {
  if (!valor || valor.trim().length < 5 || valor.trim().length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }

  return null;
}

export function validarData(valor: string): string | null {
  if (!valor) {
    return 'A data é obrigatória.';
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataEvento = new Date(valor + 'T00:00:00');

  if (dataEvento < hoje) {
    return 'A data não pode estar no passado.';
  }

  return null;
}

export function validarLocal(valor: string): string | null {
  if (!valor || !valor.trim()) {
    return 'O local não pode ficar em branco.';
  }

  return null;
}

export function validarEmail(valor: string): string | null {
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor || !valor.trim()) {
    return 'O e-mail é obrigatório.';
  }

  if (!formatoEmail.test(valor)) {
    return 'E-mail em formato inválido.';
  }

  return null;
}

export function validarVagas(valor: number | null): string | null {
  if (
    valor === null ||
    !Number.isInteger(valor) ||
    valor < 1 ||
    valor > 200
  ) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }

  return null;
}
