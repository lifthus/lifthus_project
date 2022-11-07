export class SBD {
  squat: number;
  benchpress: number;
  deadlift: number;
  total = ():number => (this.squat + this.benchpress + this.deadlift)
}