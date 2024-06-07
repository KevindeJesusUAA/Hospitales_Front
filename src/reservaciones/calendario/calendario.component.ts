import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})

export class CalendarioComponent implements OnInit, OnChanges {
  @Input() borrarEnfoque: boolean = false;
  @Output() propagarFecha = new EventEmitter < number[] > ();
  fechaActual: Date = new Date();
  color: string = 'gray';
  restarMes: boolean = false;
  estadoSeleccion: boolean = false;

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthNames: any = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre ",
    "Diciembre"
  ];

  monthSelect: any = [];
  daySelect: any;
  fechaSeleccionada: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.estadoSeleccion && this.borrarEnfoque) {
      this.monthSelect[this.fechaSeleccionada.dia - 1].class = '';
    }
  }

  ngOnInit(): void {
    this.getDaysFromDate(this.fechaActual.getMonth() + 1, this.fechaActual.getFullYear());
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    this.daySelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);

    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      let clase: string = '';
      const dayObject = moment(`${year}-${month}-${a}`);
      if (dayObject.year() == this.fechaActual.getFullYear() && dayObject.month() == this.fechaActual.getMonth() &&
        a <= this.fechaActual.getDate()) { // Dia pasado 
        clase = 'dia-pasado';
      }
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        class: clase
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.daySelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
      if (this.daySelect.year() == this.fechaActual.getFullYear() && this.daySelect.month() == this.fechaActual.getMonth()) {
        this.restarMes = false;
      }
    } else {
      const nextDate = this.daySelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
      this.restarMes = true;
    }
  }

  clickDay(day: any) {
    if (!(this.daySelect.year() == this.fechaActual.getFullYear() && this.daySelect.month() == this.fechaActual.getMonth() && day.value <= this.fechaActual.getDate())) {
      if (!this.estadoSeleccion) {
        this.estadoSeleccion = true;
      } else {
        this.monthSelect[this.fechaSeleccionada.dia - 1].class = '';
      }
      day.class = 'dia-seleccionado';
      const dia = moment(`${this.daySelect.year()}-${this.daySelect.month()+1}-${day.value}`);
      let fecha = {
        dia: day.value,
        mes: this.daySelect.month(),
        year: this.daySelect.year(),
        diaNombre: this.week[dia.isoWeekday() - 1],
        mesNombre: this.monthNames[dia.month()]
      };
      this.fechaSeleccionada = fecha;
      this.onPropagar();
    }
  }

  onPropagar() {
    this.propagarFecha.emit(this.fechaSeleccionada);
  }

}
