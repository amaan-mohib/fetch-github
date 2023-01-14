import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  @Input() searchError = false;
  @Output() userUpdate = new EventEmitter();
  name = '';
  nameForm = this.formBuilder.group({
    name: ''
  });
  constructor(
    private formBuilder: FormBuilder
  ) { }
  onSubmit() {
    const name = this.nameForm.value.name;
    if (name) {
      this.userUpdate.emit(name);
    }
  }
}
