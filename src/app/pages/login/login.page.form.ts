import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

}
