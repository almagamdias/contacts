import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      login: ['123', [Validators.required]],
      password: ['123', [Validators.required]]
    });
  }

}
