import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {

  let loginPageForm : LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder());
    form = loginPageForm.createForm();
  })

  it('should create login', () => {

    expect(form).not.toBeNull();
    expect(form.get('login')).not.toBeNull();
    expect(form.get('login').value).toEqual("");
    expect(form.get('login').valid).toBeFalsy();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password').value).toEqual("");
    expect(form.get('password').valid).toBeFalsy();
  })
})
