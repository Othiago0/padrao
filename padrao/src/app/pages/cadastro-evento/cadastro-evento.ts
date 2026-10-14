
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';
import {
  validarTitulo,
  validarData,
  validarLocal,
  validarEmail,
  validarVagas
} from '../../models/evento.validacao';

type CampoEvento =
  | 'titulo'
  | 'data'
  | 'local'
  | 'emailResponsavel'
  | 'vagas';

@Component({
  selector: 'app-cadastro-evento',
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css',
})
export class CadastroEvento {
  titulo = '';
  data = '';
  local = '';
  emailResponsavel = '';
  vagas: number | null = null;

  eventos: Evento[] = [];

  camposVisitados: Record<CampoEvento, boolean> = {
    titulo: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false
  };

  erros: Record<CampoEvento, string | null> = {
    titulo: 'O título deve ter entre 5 e 80 caracteres.',
    data: 'A data é obrigatória.',
    local: 'O local não pode ficar em branco.',
    emailResponsavel: 'O e-mail é obrigatório.',
    vagas: 'As vagas devem ser um número inteiro de 1 a 200.'
  };

  validarCampo(campo: CampoEvento): void {
    this.camposVisitados[campo] = true;

    switch (campo) {
      case 'titulo':
        this.erros.titulo = validarTitulo(this.titulo);
        break;

      case 'data':
        this.erros.data = validarData(this.data);
        break;

      case 'local':
        this.erros.local = validarLocal(this.local);
        break;

      case 'emailResponsavel':
        this.erros.emailResponsavel =
          validarEmail(this.emailResponsavel);
        break;

      case 'vagas':
        this.erros.vagas = validarVagas(this.vagas);
        break;
    }
  }

  get formularioValido(): boolean {
    return (
      this.erros.titulo === null &&
      this.erros.data === null &&
      this.erros.local === null &&
      this.erros.emailResponsavel === null &&
      this.erros.vagas === null
    );
  }

  salvar(): void {
    const campos: CampoEvento[] = [
      'titulo',
      'data',
      'local',
      'emailResponsavel',
      'vagas'
    ];

    campos.forEach(campo => this.validarCampo(campo));

    if (!this.formularioValido) {
      return;
    }

    const novoEvento: Evento = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      data: this.data,
      local: this.local,
      emailResponsavel: this.emailResponsavel.trim(),
      vagas: this.vagas
    };

    this.eventos.push(novoEvento);

    this.titulo = '';
    this.data = '';
    this.local = '';
    this.emailResponsavel = '';
    this.vagas = null;

    campos.forEach(campo => {
      this.camposVisitados[campo] = false;
    });

    this.erros = {
      titulo: 'O título deve ter entre 5 e 80 caracteres.',
      data: 'A data é obrigatória.',
      local: 'O local não pode ficar em branco.',
      emailResponsavel: 'O e-mail é obrigatório.',
      vagas: 'As vagas devem ser um número inteiro de 1 a 200.'
    };
  }
}
